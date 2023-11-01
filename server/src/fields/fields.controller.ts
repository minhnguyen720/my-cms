import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { UpdateConfigDto } from './dto/update-config.dto';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Get(':detailId')
  async getFieldDataByDetailId(@Param('detailId') detailId: string) {
    return await this.fieldsService.getFieldDataByDetailId(detailId);
  }

  @Post('new')
  async createNewFields(@Body() body) {
    return await this.fieldsService.createNewFields(body);
  }

  @Put('update-config')
  async updateFieldConfig(@Body() body: UpdateConfigDto) {
    return await this.fieldsService.updateFieldConfig(body);
  }
}
