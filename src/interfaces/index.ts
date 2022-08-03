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
  amount: number;
  currency: string;
  id_req_saldo_change: number;
  id_user: number;
  verification_status: VerificationStatusType;
}

export interface ISaldoChangeWithUser extends ISaldoChange {
  user: IUser;
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

export interface ITransferWithUser extends ITransfer {
  user_dest: IUser;
  user_src: IUser;
}

export interface ITransferHistoryWithUser {
  transfer_history_dest: ITransferWithUser[];
  transfer_history_src: ITransferWithUser[];
}

export interface ITransferWithUserAdapted extends ITransfer {
  user_dest: string;
  user_src: string;
}

export interface ITransferHistoryWithUserAdapted {
  transfer_history_dest: ITransferWithUserAdapted[];
  transfer_history_src: ITransferWithUserAdapted[];
}

export interface ITopbarOption {
  label: string;
  href: string;
  icon: string;
  iconActive: string;
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

export interface IVerifyTableProps {
  title: string;
  fields: {
    [key: string]: {
      label: string;
      data: JSX.Element[];
    };
  };
  keyFieldQuery?: string[];
  onVerify: (idx: number) => void;
  onReject: (idx: number) => void;
}

export interface IPagedTableProps {
  title: string;
  columns: {
    label: string;
    key: string;
  }[];
  data: {
    elmts: JSX.Element[];
    querySearch?: string;
  }[];
  useSearch: boolean;
}
