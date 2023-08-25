import { Module } from '@nestjs/common';
import { DocService } from './doc.service';
import { DocController } from './doc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Doc, DocSchema } from 'src/schemas/doc.schema';
import { Field, FieldSchema } from 'src/schemas/field.schema';
import { Page, PageSchema } from 'src/schemas/page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doc.name, schema: DocSchema },
      {
        name: Field.name,
        schema: FieldSchema,
      },
      { name: Page.name, schema: PageSchema },
    ]),
  ],
  controllers: [DocController],
  providers: [DocService],
})
export class DocModule {}
