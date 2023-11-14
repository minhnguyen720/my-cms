import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from 'src/schemas/page.schema';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { Doc, DocSchema } from 'src/schemas/doc.schema';
import { Field, FieldSchema } from 'src/schemas/field.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Page.name, schema: PageSchema },
      { name: Doc.name, schema: DocSchema },
      { name: Field.name, schema: FieldSchema },
    ]),
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
