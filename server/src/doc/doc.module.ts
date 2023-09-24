import { Module } from '@nestjs/common';
import { DocService } from './doc.service';
import { DocController } from './doc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Doc, DocSchema } from 'src/schemas/doc.schema';
import { Field, FieldSchema } from 'src/schemas/field.schema';
import { Page, PageSchema } from 'src/schemas/page.schema';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { Folder, FolderSchema } from 'src/schemas/folder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doc.name, schema: DocSchema },
      {
        name: Field.name,
        schema: FieldSchema,
      },
      { name: Page.name, schema: PageSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Folder.name, schema: FolderSchema },
    ]),
  ],
  controllers: [DocController],
  providers: [DocService],
})
export class DocModule {}
