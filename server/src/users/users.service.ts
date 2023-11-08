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

  async findOne(username: string): Promise<Users | undefined> {
    try {
      const user = await this.usersModel.findOne({ username: username });
      if (user === null || user === undefined) throw 'User not found';
      else {
        this.logger.log(`Found user ${user.username}`);
      }
      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async createNewUser(authDto: AuthenticateDto): Promise<Users> {
    try {
      const isDuplicateUserName = await this.usersModel.exists({
        username: authDto.username,
      });
      if (isDuplicateUserName !== null) throw 'This username already exist';

      const hash = this.hashData(authDto.password);

      const newUser = await this.usersModel.create({
        id: `USR${uuidv4()}`,
        username: authDto.username,
        password: hash,
        role: 'admin',
        createdDate: dayjs().toDate(),
        updatedDate: dayjs().toDate(),
      });

      return newUser;
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

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
}
