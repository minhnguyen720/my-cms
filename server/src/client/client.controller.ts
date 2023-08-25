import { Controller, Get, Param } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':key/:id')
  async findPageById(@Param('key') key: string, @Param('id') id: string) {
    return await this.clientService.findPageById(key, id);
  }
}
