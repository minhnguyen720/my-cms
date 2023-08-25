import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from 'src/schemas/page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
