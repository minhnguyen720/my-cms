import { Module, forwardRef } from '@nestjs/common';
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
    forwardRef(() => FieldsModule),
  ],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
