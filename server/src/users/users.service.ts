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

  async createNewUser(authDto: AuthenticateDto) {
    try {
      const isDuplicateUserName = await this.usersModel.exists({
        username: authDto.username,
      });
      if (isDuplicateUserName !== null) throw 'This username already exist';

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(authDto.password, salt);

      const newUser = await this.usersModel.create({
        id: `USR${uuidv4()}`,
        username: authDto.username,
        password: hash,
        role: 'admin',
        createdDate: dayjs().toDate(),
        updatedDate: dayjs().toDate(),
      });
      this.logger.log(`New user created: ${newUser}`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
