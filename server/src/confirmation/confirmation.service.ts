import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Confirmation } from 'src/schemas/confirmation.schema';

@Injectable()
export class ConfirmationService {
  constructor(
    @InjectModel(Confirmation.name) private confirmModel: Model<Confirmation>,
  ) {}

  async createNewRecord(code: string, email: string) {
    await this.confirmModel.create({
      code,
      email,
    });
  }

  async compareCode(code: string, email: string) {
    const result = await this.confirmModel.find({
      code,
      email,
    });
    if (result.length > 0) {
      await this.confirmModel.findOneAndDelete({
        code,
        email,
      });
      await this.confirmModel.deleteMany({
        email,
      });
    }
    return result.length > 0;
  }
}
