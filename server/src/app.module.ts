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
import { TrashModule } from './trash/trash.module';
import { FieldsModule } from './fields/fields.module';
import { StorageModule } from './storage/storage.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { MailModule } from './mail/mail.module';
import { ConfirmationModule } from './confirmation/confirmation.module';
import { DataModule } from './data/data.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ProjectModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'myCMSPrototype',
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PageModule,
    DocModule,
    ClientModule,
    FolderModule,
    TrashModule,
    FieldsModule,
    StorageModule,
    AuthModule,
    UsersModule,
    MailModule,
    ConfirmationModule,
    DataModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
