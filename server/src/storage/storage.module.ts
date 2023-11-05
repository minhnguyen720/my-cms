import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Files, FilesSchema } from 'src/schemas/files.schema';
import { FieldsModule } from 'src/fields/fields.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Files.name,
        schema: FilesSchema,
      },
    ]),
    FieldsModule,
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
