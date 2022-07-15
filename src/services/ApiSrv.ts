import axios from 'axios';
import { IParamsAPI } from '../interfaces';

class APIBoundary {
  private readonly API_URL = 'http://localhost:3000';

  async get(token: string, path: string) {
    const url = `${this.API_URL}/${path}`;

    try {
      const res = await axios.get(url, {
        headers: this.generateHeader(token),
        responseType: 'json',
      });
      return { res, err: null };
    } catch (err) {
      return { res: null, err };
    }
  }
  async post(token: string, path: string, payload: Object) {
    const url = `${this.API_URL}/${path}`;

    try {
      const res = await axios({
        method: 'POST',
        url,
        headers: this.generateHeader(token),
        responseType: 'json',
        data: payload,
      });

      return { res, err: null };
    } catch (err) {
      return { res: null, err };
    }
  }

  async put(token: string, path: string, payload: Object) {
    const url = `${this.API_URL}/${path}`;

    try {
      const res = await axios({
        method: 'PUT',
        url,
        headers: this.generateHeader(token),
        responseType: 'json',
        data: payload,
      });
      return { res, err: null };
    } catch (err) {
      return { res: null, err };
    }
  }

  async delete(token: string, path: string) {
    const url = `${this.API_URL}/${path}`;

    try {
      const res = await axios({
        method: 'DELETE',
        url,
        headers: this.generateHeader(token),
        responseType: 'json',
      });
      return { res, err: null };
    } catch (err) {
      return { res: null, err };
    }
  }

  private generateHeader(token: string) {
    const auth = token ? `Bearer ${token}` : '';

    return {
      'Content-Type': 'application/json',
      Authorization: auth,
      'Access-Control-Allow-Origin': '*',
    };
  }
}

class ApiSrv {
  private static readonly apiBoundary: APIBoundary =
    new APIBoundary();
  private static instance: ApiSrv;
  private defaultOnError: ({
    header,
    content,
  }: {
    header: string;
    content: string;
  }) => void;

  private constructor() {
    this.defaultOnError = ({
      header,
      content,
    }: {
      header: string;
      content: string;
    }) => {
      alert(`${header}\n${content}`);
    };
  }

  public setDefaultOnError(onError: ({ header, content }: { header: string; content: string; }) => void) {
    this.defaultOnError = onError;
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ApiSrv();
    }
    return this.instance;
  }

  private errorHandler(
    err: any,
    withoutNotif?: boolean,
    onError?: (props: any) => void,
  ): null {
    if (withoutNotif) {
      return null;
    }

    if (onError) {
      onError(err);
      return null;
    }

    this.defaultOnError({
      header: 'Error',
      content: JSON.stringify(err),
    });
    return null;
  }

  private successHandler(
    data: any,
    onSuccess?: (props: any) => void,
  ) {
    if (onSuccess) {
      onSuccess(data);
    }
    return data;
  }

  private async mockHandler(
    mock: { err: any; data: any },
    withoutNotif?: boolean,
    onError?: (props: any) => void,
    onSuccess?: (props: any) => void,
  ): Promise<any> {
    const promise = new Promise<{
      data: any;
      err: any;
    }>((resolve, reject) => {
      if (mock.err) {
        resolve({ data: null, err: mock.err });
      } else {
        resolve({ data: mock.data, err: null });
      }
    });
    promise.then((res) => {
      if (res.err) {
        return this.errorHandler(res.err, withoutNotif, onError);
      } else {
        return this.successHandler(res.data, onSuccess);
      }
    });
  }

  private validateRes(
    res: any,
    withoutNotif?: boolean,
    onError?: (props: any) => void,
  ): boolean {
    if (res?.status === 200) {
      return true;
    }

    this.errorHandler("Failed to fetch", withoutNotif, onError);
    return false;
  }

  async get(props: IParamsAPI) {
    const {
      params,
      url,
      withoutCredentials,
      mock,
      withoutNotif,
      onError,
      onSuccess,
    } = props;

    if (mock) {
      return this.mockHandler(mock, withoutNotif, onError, onSuccess);
    }

    const token = withoutCredentials ? null : this.getToken();

    const urlParams = params
      ? `${url}?${Object.keys(params)
        .map(
          (key) => `${key}=${params[key as keyof typeof params]}`,
        )
        .join('&')}`
      : url;
    const { res, err } = await ApiSrv.apiBoundary.get(
      token ? token : '',
      urlParams,
    );

    if (!this.validateRes(res, withoutNotif, onError)) {
      return null;
    }

    if (err) {
      return this.errorHandler(err, withoutNotif, onError);
    }

    if (res) {
      return this.successHandler(res.data, onSuccess);
    }
  }

  public async post(props: IParamsAPI) {
    const {
      params,
      url,
      withoutCredentials,
      mock,
      withoutNotif,
      onError,
      onSuccess,
    } = props;

    if (mock) {
      return this.mockHandler(mock, withoutNotif, onError, onSuccess);
    }

    const token = withoutCredentials ? null : this.getToken();

    const { res, err } = await ApiSrv.apiBoundary.post(
      token ? token : '',
      url,
      params ? params : {},
    );

    if (!this.validateRes(res, withoutNotif, onError)) {
      return null;
    }

    if (err) {
      return this.errorHandler(err, withoutNotif, onError);
    }

    if (res) {
      return this.successHandler(res.data, onSuccess);
    }
  }

  public async put(props: IParamsAPI) {
    const {
      params,
      url,
      withoutCredentials,
      mock,
      withoutNotif,
      onError,
      onSuccess,
    } = props;

    if (mock) {
      return this.mockHandler(mock, withoutNotif, onError, onSuccess);
    }

    const token = withoutCredentials ? null : this.getToken();

    const { res, err } = await ApiSrv.apiBoundary.put(
      token ? token : '',
      url,
      params ? params : {},
    );

    if (!this.validateRes(res, withoutNotif, onError)) {
      return null;
    }

    if (err) {
      return this.errorHandler(err, withoutNotif, onError);
    }

    if (res) {
      return this.successHandler(res.data, onSuccess);
    }
  }

  public async delete(props: IParamsAPI) {
    const {
      url,
      withoutCredentials,
      mock,
      withoutNotif,
      onError,
      onSuccess,
    } = props;

    if (mock) {
      return this.mockHandler(mock, withoutNotif, onError, onSuccess);
    }

    const token = withoutCredentials ? null : this.getToken();

    const { res, err } = await ApiSrv.apiBoundary.delete(
      token ? token : '',
      url,
    );

    if (!this.validateRes(res, withoutNotif, onError)) {
      return null;
    }

    if (err) {
      return this.errorHandler(err, withoutNotif, onError);
    }

    if (res) {
      return this.successHandler(res.data, onSuccess);
    }
  }

  private getToken() {
    return localStorage.getItem('token');
  }
  public setToken(token: string) {
    localStorage.setItem('token', token);
  }
}

export default ApiSrv;
