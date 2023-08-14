import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PageModule } from './page/page.module';
import { DocModule } from './doc/doc.module';

@Module({
  imports: [
    ProjectModule,
    MongooseModule.forRoot('mongodb://localhost:27017/my_cms_prototype'),
    PageModule,
    DocModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
