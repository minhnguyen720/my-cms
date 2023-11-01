import { Body, Controller, Post } from '@nestjs/common';
import { FieldsService } from './fields.service';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Post('new')
  async createNewFields(@Body() body) {
    return await this.fieldsService.createNewFields(body);
  }
}
