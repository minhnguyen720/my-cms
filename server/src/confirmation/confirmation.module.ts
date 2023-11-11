import { Module } from '@nestjs/common';
import { ConfirmationService } from './confirmation.service';
import {
  Confirmation,
  ConfirmationSchema,
} from 'src/schemas/confirmation.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Confirmation.name,
        schema: ConfirmationSchema,
      },
    ]),
  ],
  providers: [ConfirmationService],
  exports: [ConfirmationService],
})
export class ConfirmationModule {}
