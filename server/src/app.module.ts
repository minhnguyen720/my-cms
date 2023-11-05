import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PageModule } from './page/page.module';
import { DocModule } from './doc/doc.module';
import { ClientModule } from './client/client.module';
import { FolderModule } from './folder/folder.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TrashbinCronService } from './cron/trashBinCron/trashbin.cron.service';
import { TrashModule } from './trash/trash.module';
import { FieldsModule } from './fields/fields.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ProjectModule,
    // MongooseModule.forRoot(
    //   'mongodb+srv://willie:williedaspidie@cluster0.guq9sem.mongodb.net/my_cms_prototype?retryWrites=true&w=majority',
    // ),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'myCMSPrototype',
    }),
    PageModule,
    DocModule,
    ClientModule,
    FolderModule,
    TrashModule,
    FieldsModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
