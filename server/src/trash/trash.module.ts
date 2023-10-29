import { Module } from '@nestjs/common';
import { TrashService } from './trash.service';
import { TrashController } from './trash.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from 'src/schemas/folder.schema';
import { Page, PageSchema } from 'src/schemas/page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Folder.name, schema: FolderSchema },
      { name: Page.name, schema: PageSchema },
    ]),
  ],
  controllers: [TrashController],
  providers: [TrashService],
})
export class TrashModule {}
