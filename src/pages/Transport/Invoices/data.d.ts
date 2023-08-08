interface TableListItem {
  //   id: number;
  waybillId?: string;
  toStation: string;
  transitStation: string;
  cargoName: string;
  cargoId: string;
  quantity: number;
  dimension: string;
  //   cash on delivery collection
  codcFee: number;
  freightFee: number;
  backFreightFee: number;
  deliveryFee: number;
  refundFee: number;
  infoFee: number;
  shipperName: string;
  shipperPhone: string;
  deliveryName: string;
  deliverPhone: string;
  remark: string;
}
