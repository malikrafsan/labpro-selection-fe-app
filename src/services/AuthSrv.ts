import { setCookie, getCookie } from '../utils';

class AuthSrv {
  constructor() {}

  public setIsAdmin(is_admin: boolean) {
    localStorage.setItem('is_admin', is_admin ? 'true' : 'false');
  }

  public setToken(token: string) {
    setCookie('token', token, 1);
  }

  public getToken() {
    return getCookie('token');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public isAdmin(): boolean {
    return localStorage.getItem('is_admin') === 'true';
  }
}

export default new AuthSrv();
