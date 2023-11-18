import { Body, Controller, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetCurrentUserId } from 'src/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Put('update/:option')
  async updateUserName(
    @Param('option') option: string,
    @GetCurrentUserId() userId: string,
    @Body() body: any,
  ) {
    switch (option) {
      case 'name':
        return await this.userService.updateUserName(userId, body);
      case 'password':
        return await this.userService.updateUserPassword(userId, body);
      case 'email':
        return await this.userService.updateUserEmail(userId, body);
      default:
        return {
          isSuccess: false,
          message: 'Not a valid option',
        };
    }
  }
}
