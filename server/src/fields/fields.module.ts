import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from 'src/schemas/field.schema';
import { Doc, DocSchema } from 'src/schemas/doc.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Field.name, schema: FieldSchema },
      { name: Doc.name, schema: DocSchema },
    ]),
  ],
  controllers: [FieldsController],
  providers: [FieldsService],
})
export class FieldsModule {}
