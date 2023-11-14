import { Module } from '@nestjs/common';
import { TrashService } from './trash.service';
import { TrashController } from './trash.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from 'src/schemas/folder.schema';
import { Page, PageSchema } from 'src/schemas/page.schema';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { Doc, DocSchema } from 'src/schemas/doc.schema';
import { Field, FieldSchema } from 'src/schemas/field.schema';
import { StorageModule } from 'src/storage/storage.module';
import { DocModule } from 'src/doc/doc.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Folder.name, schema: FolderSchema },
      { name: Page.name, schema: PageSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Doc.name, schema: DocSchema },
      { name: Field.name, schema: FieldSchema },
    ]),
    StorageModule,
    DocModule,
  ],
  controllers: [TrashController],
  providers: [TrashService],
  exports: [TrashService],
})
export class TrashModule {}
