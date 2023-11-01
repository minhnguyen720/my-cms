export class UpdateConfigDto {
  fieldId: string;
  config: {
    active: boolean;
    required: boolean;
  };
  doc: string;
}
