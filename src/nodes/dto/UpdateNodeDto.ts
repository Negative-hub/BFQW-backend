export class UpdateNodeDto {
  id: number;
  label: string;
  modelId: number;
  metanodeId: number | null;
  attributeIds: number[];
}
