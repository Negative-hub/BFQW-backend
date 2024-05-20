export class UpdateNodeDto {
  id: number;
  label: string;
  modelId: number;
  metanodeId?: number;
  attributes?: { id: number }[];
}
