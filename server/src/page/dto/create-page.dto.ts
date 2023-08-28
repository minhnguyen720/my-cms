import { StandardDto } from 'src/dto/standard.dto';

export class CreatePageDto extends StandardDto {
  project: string;
  docs: any[];
  docSchema?: any;
  pageName: string;
}
