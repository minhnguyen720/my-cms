import { StandardDto } from 'src/dto/standard.dto';

export class CreatePageDto extends StandardDto {
  projectId: string;
  docs: any[];
  docSchema?: any;
  pageName: string;
}
