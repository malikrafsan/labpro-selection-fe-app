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