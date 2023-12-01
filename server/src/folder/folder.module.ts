import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from 'src/schemas/folder.schema';
import { Page, PageSchema } from 'src/schemas/page.schema';
import { Doc, DocSchema } from 'src/schemas/doc.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Folder.name,
        schema: FolderSchema,
      },
      {
        name: Page.name,
        schema: PageSchema,
      },
      {
        name: Doc.name,
        schema: DocSchema,
      },
    ]),
  ],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
