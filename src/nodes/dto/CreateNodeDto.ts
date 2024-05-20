export class CreateNodeDto {
  label: string;
  modelId: number;
  metanodeId: number;
  attributes: { id: number }[];
}
