import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from 'src/schemas/folder.schema';
import { Page, PageSchema } from 'src/schemas/page.schema';

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
    ]),
  ],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
