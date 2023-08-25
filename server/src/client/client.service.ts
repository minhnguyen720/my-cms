import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from 'src/schemas/page.schema';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Page.name) private pageModel: Model<Page>) {}

  async findPageById(key: string, id: string) {
    if (key !== 'a321a0cc-eac3-4ec4-a1e9-4c8648229248')
      return { message: 'Unauthorized' };

    return await this.pageModel
      .find({ id: id }, '-_id')
      .populate({
        path: 'docs',
        select: '-_id -active -assignedUsers',
        populate: {
          path: 'fields',
          select: '-active -placeholder -required -isUseEditor -doc',
        },
      })
      .exec();
  }
}
