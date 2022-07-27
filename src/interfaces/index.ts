export interface IParamsAPI {
  params?: Object;
  url: string;
  withoutCredentials?: boolean;
  mock?: {
    err: any;
    data: any;
  };
  withoutNotif?: boolean;
  onError?: (props: any) => void;
  onSuccess?: (props: any) => void;
}

export interface IAuthFormProps {
  title: string;
  fields: {
    [key: string]: {
      label: string;
      type: string;
      value?: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      accept?: string;
      file?: File;
    };
  };
  onSubmit: () => void;
}

export const VerificationStatus = {
  DRAFT: 'DRAFT',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
};

export type VerificationStatusType = keyof typeof VerificationStatus;

export interface IUser {
  fotoKTP: string;
  id_user: number;
  is_admin: boolean;
  linkKTP: string;
  name: string;
  password: string;
  saldo: number;
  username: string;
  verification_status: VerificationStatusType;
}

export interface ISaldoChange {
  amount_source: number;
  amount_target: number;
  currency: string;
  id_req_saldo_change: number;
  id_user: number;
  verification_status: VerificationStatusType;
}

export interface ITransfer {
  amount: number;
  currency: string;
  id_req_transfer: number;
  id_user_dest: number;
  id_user_src: number;
}

export interface ITransferHistory {
  transfer_history_dest: ITransfer[];
  transfer_history_src: ITransfer[];
}

export interface ITopbarOption {
  label: string;
  href: string;
}

export interface ICreateFormProps {
  title: string;
  fields: {
    [key: string]: {
      label: string;
      type: string;
      value?: string;
      onChange: (val: any) => void;
      options?: {
        label: string;
        value: string;
      }[];
    };
  };
  onSubmit: () => void;
}
