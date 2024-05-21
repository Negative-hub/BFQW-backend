export interface Option {
  id: number;
  name: string;
}

export interface AttributeOption {
  id: number;
  label: string;
  nodeId: string | null;
  metanodeId: number | null;
}

export interface MetagraphNode {
  id: string;
  label: string;
  data: { metanode: string | 0 };
}

export interface MetagraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}
