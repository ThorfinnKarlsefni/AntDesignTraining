export interface TableListItem {
  waybillId: string;
  shipperName: string;
  shipperPhone: string;
  consingeeName: string;
  consingeePhone: string;
  toStation: number;
  transitStation?: number;
  address: string;
  //cargo
  cargoName: string;
  cargoId?: string;
  quantity: number;
  volume?: number;
  weight?: number;
  packing?: number;
  cargoValue?: number;
  insuranceFee?: number;
  //fee
  freightFee: number;
  codcFee?: number;
  backFreightFee?: number;
  deliveryFee?: number;
  notificationFee: number;
  //other
  remarks: string;
  bankName: string;
  creatorId: string;
  bargainerId: string;
  createdAt: Date;
}

export interface InvoiceItem {
  shipperName: string;
  shipperPhone: string;
  consingeeName: string;
  consingeePhone: string;
  toStation: number;
  transitStation?: number;
  address: string;
  //cargo
  cargoName: string;
  cargoId?: string;
  quantity: number;
  volume?: number;
  weight?: number;
  packing?: number;
  cargoValue?: number;
  insuranceFee?: number;
  //fee
  freightFee: number;
  codcFee?: number;
  backFreightFee?: number;
  deliveryFee?: number;
  notificationFee: number;
  //other
  remarks: string;
  bankName: string;
  creatorId: string;
  bargainerId: string;
  createdAt: Date;
}
