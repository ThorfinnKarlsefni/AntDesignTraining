interface InvoicesItem {
  shipperName: string;
  shipperPhone: string;
  consigneeName: string;
  consigneePhone: string;
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
  agencyFee?: number;
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

export interface InvoicesProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export interface invoicesFeeParams {
  name: string;
  label: string;
  rules?: [
    {
      required: boolean;
      message: string;
    },
  ];
  style?: ReactNode;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
}

export interface UserInfoFormProps {
  form: FormInstance;
}
