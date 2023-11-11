import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Confirmation } from 'src/schemas/confirmation.schema';
import * as dayjs from 'dayjs';

@Injectable()
export class ConfirmationService {
  constructor(
    @InjectModel(Confirmation.name) private confirmModel: Model<Confirmation>,
  ) {}

  async createNewRecord(code: string, email: string) {
    await this.confirmModel.create({
      code,
      email,
      createdDate: dayjs().toDate(),
    });
  }

  async compareCode(code: string, email: string) {
    const result = await this.confirmModel
      .find({
        email,
      })
      .sort({ createdDate: -1 })
      .limit(1);

    if (result.length > 0) {
      if (result[0].code === code.trim()) {
        await this.confirmModel.deleteMany({
          email,
        });
        return true;
      }
    }
    return false;
  }
}
