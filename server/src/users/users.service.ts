import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthenticateDto } from 'src/auth/dto/authenticate.dto';
import { Users } from 'src/schemas/users.schema';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  private readonly logger = new Logger(UsersService.name);

  async updateUserName(
    userId: string,
    body: {
      name: string;
      password: string;
    },
  ) {
    try {
      const user = await this.usersModel.findOne({
        id: userId,
      });
      if (user) {
        if (!bcrypt.compareSync(body.password, user.password))
          throw 'Wrong password';

        await user.updateOne({
          name: body.name,
          updatedDate: dayjs().toDate(),
        });

        this.logger.log(`Update name for user ${userId} success`);
        return {
          isSuccess: true,
          message: '',
        };
      } else {
        this.logger.error('User is undefined');
        return {
          isSuccess: false,
        };
      }
    } catch (error) {
      this.logger.error(`Update name for user ${userId} fail`);
      return {
        isSuccess: false,
        message: error,
      };
    }
  }

  async updateUserPassword(
    userId: string,
    body: {
      currentPassword: string;
      newPassword: string;
    },
  ) {
    try {
      const user = await this.usersModel.findOne({
        id: userId,
      });

      if (!bcrypt.compareSync(body.currentPassword, user.password))
        throw 'Wrong password';

      const hash = this.hashData(body.newPassword);
      await this.usersModel.updateOne({
        password: hash,
        updatedDate: dayjs().toDate(),
      });

      this.logger.log(`Update password for user ${userId} success`);
      return {
        isSuccess: true,
        message: '',
      };
    } catch (error) {
      this.logger.error(`Update password for user ${userId} fail`);
      return {
        isSuccess: false,
        message: error,
      };
    }
  }

  async updateUserEmail(
    userId: string,
    body: {
      currentEmail: string;
      newEmail: string;
      password: string;
    },
  ) {
    try {
      const user = await this.usersModel.findOne({
        id: userId,
      });

      if (!bcrypt.compareSync(body.password, user.password))
        throw 'Wrong password';
      else if (user.email !== body.currentEmail) throw 'Wrong email';

      await user.updateOne({
        email: body.newEmail,
        updatedDate: dayjs().toDate(),
      });

      this.logger.log(`Update email for user ${userId} success`);
      return {
        isSuccess: true,
        message: '',
      };
    } catch (error) {
      this.logger.error(`Update email for user ${userId} fail`);
      this.logger.error(error);
      return {
        isSuccess: false,
        message: error,
      };
    }
  }

  async updateUserAvatar(userId, path) {
    await this.usersModel.findOneAndUpdate(
      {
        id: userId,
      },
      { avatar: path },
    );
  }

  async findUserByKey(key) {
    try {
      const user = await this.usersModel.findOne({
        apikey: key,
      });
      if (user === null || user === undefined) throw 'User not found';
      else {
        this.logger.log(`Found user ${user.id}`);
      }
      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async removeRtHash(userId: string) {
    try {
      await this.usersModel.updateOne(
        {
          id: userId,
          hashedRefreshToken: { $ne: null },
        },
        {
          hashedRefreshToken: null,
        },
      );
      this.logger.log(`User ${userId} signout`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async initUserAtom(userId: string): Promise<Users> {
    try {
      this.logger.log('Init user atom...');
      const user = await this.usersModel
        .findOne({
          id: userId,
        })
        .select(
          '_id userId username email name role createdDate updatedDate avatar',
        );
      if (user === null || user === undefined) throw 'User not found';
      else {
        this.logger.log(`Found user ${userId}`);
      }
      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findUserById(userId: string): Promise<Users> {
    try {
      this.logger.log('Finding user by user id...');
      const user = await this.usersModel.findOne({
        id: userId,
      });
      if (user === null || user === undefined) throw 'User not found';
      else {
        this.logger.log(`Found user ${userId}`);
      }
      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findOneByEmail(email) {
    try {
      this.logger.log('Finding user by email...');
      const user = await this.usersModel.findOne({
        email: email,
      });
      if (user === null || user === undefined) throw 'User not found';
      else {
        this.logger.log(`Found user ${user.id}`);
      }
      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findOne(username: string): Promise<Users | undefined> {
    try {
      this.logger.log('Finding user by username...');
      const user = await this.usersModel.findOne({ username: username });
      if (user === null || user === undefined) throw 'User not found';
      else {
        this.logger.log(`Found user ${user.id}`);
      }
      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateEmailStatus(userId: string) {
    await this.usersModel.findOneAndUpdate(
      {
        id: userId,
      },
      {
        emailConfirm: true,
      },
    );
  }

  async createNewUser(
    authDto: AuthenticateDto,
  ): Promise<{ isSuccess: boolean; user: Users; message: string }> {
    try {
      const isDuplicateUserName = await this.usersModel.exists({
        username: authDto.username,
      });
      if (isDuplicateUserName !== null) throw 'This username already exist';

      const hash = this.hashData(authDto.password);
      const userId = `USR${uuidv4()}`;
      const apikey = this.hashData(authDto.username + userId);

      const newUser = await this.usersModel.create({
        id: userId,
        apikey,
        username: authDto.username,
        password: hash,
        role: 'admin',
        createdDate: dayjs().toDate(),
        updatedDate: dayjs().toDate(),
        gender: authDto.gender,
        email: authDto.email,
        name: authDto.name,
        avatar: '',
      });

      return {
        isSuccess: true,
        user: newUser,
        message: '',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        user: undefined,
        isSuccess: false,
        message: error,
      };
    }
  }

  // Utilities
  hashData(data: string) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(data.toString(), salt);

    return hash;
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = this.hashData(rt);
    await this.usersModel.findOneAndUpdate(
      {
        id: userId,
      },
      {
        hashedRefreshToken: hash,
      },
      {
        new: true,
      },
    );
  }

  async isUserExist(body: { username: string; email: string }) {
    const [usernameCheck, emailCheck] = await Promise.all([
      this.usersModel.exists({
        username: body.username,
      }),
      this.usersModel.exists({
        email: body.email,
      }),
    ]);

    if (usernameCheck !== null && emailCheck !== null) {
      return {
        isSuccess: false,
        message: 'This username and email are already used',
      };
    } else if (usernameCheck !== null) {
      return {
        isSuccess: false,
        message: 'This username is already used',
      };
    } else if (emailCheck !== null) {
      return {
        isSuccess: false,
        message: 'This email is already used',
      };
    } else {
      return {
        isSuccess: true,
        message: '',
      };
    }
  }
}
