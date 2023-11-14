export class CreateDocDto {
  name: string;
  description: string;
  id: string;
  pageId: string;
  projectId: string;
  parent: string;
  active: boolean;
  isRemove: boolean;
}
