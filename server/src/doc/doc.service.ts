import { Injectable } from '@nestjs/common';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Doc } from 'src/schemas/doc.schema';
@Injectable()
export class DocService {
  constructor(@InjectModel(Doc.name) private docModel: Model<Doc>) {}

  async findByKey(key: string) {
    if (key !== 'a321a0cc-eac3-4ec4-a1e9-4c8648229248') return [];
    return await this.docModel
      .findById({ _id: '64e043c9476e09720111aaeb' })
      .populate('data')
      .exec();
  }

  create(createDocDto: CreateDocDto) {
    return 'This action adds a new doc';
  }

  findAll() {
    return `This action returns all doc`;
  }

  findOne(id: string) {
    return `This action returns a #${id} doc`;
  }

  update(id: number, updateDocDto: UpdateDocDto) {
    return `This action updates a #${id} doc`;
  }

  remove(id: number) {
    return `This action removes a #${id} doc`;
  }
}
