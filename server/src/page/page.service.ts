import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from 'src/schemas/page.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PageService {
  constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {}

  async create(createPageDto: CreatePageDto) {
    await this.pageModel.create(createPageDto);
    return 0;
  }

  findAll() {
    return `This action returns all page`;
  }

  findOne(id: number) {
    return `This action returns a #${id} page`;
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return `This action updates a #${id} page`;
  }

  remove(id: number) {
    return `This action removes a #${id} page`;
  }
}
