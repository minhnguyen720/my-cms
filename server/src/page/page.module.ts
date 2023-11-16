import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { Doc, DocSchema } from 'src/schemas/doc.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from 'src/schemas/project.schema';
import { Page, PageSchema } from 'src/schemas/page.schema';
import { Users, UsersSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doc.name, schema: DocSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Page.name, schema: PageSchema },
      { name: Users.name, schema: UsersSchema },
    ]),
  ],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
