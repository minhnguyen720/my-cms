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

  @Get('use-filter/:fieldId')
  async getDataByFilter(@Param('fieldId') fieldId: string, filter: any) {
    return await this.fieldsService.getDataByFilter(fieldId, filter);
  }

  @Post('new')
  async createNewFields(@Body() body) {
    return await this.fieldsService.createNewFields(body);
  }

  @Put('update-config')
  async updateFieldConfig(@Body() body: UpdateConfigDto) {
    return await this.fieldsService.updateFieldConfig(body);
  }

  @Put('update-field/:fieldId')
  async updateFieldById(@Param('fieldId') fieldId: string, @Body() body) {
    return await this.fieldsService.updateFieldByFieldId(fieldId, body);
  }

  @Put('bydoc/:docId')
  async updateFieldsByDocId(@Param('docId') docId: string, @Body() body: any) {
    return await this.fieldsService.updateFieldsByDocId(docId, body);
  }
}
