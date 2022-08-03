class AuthSrv {
  constructor() {}

  public setIsAdmin(is_admin: boolean) {
    localStorage.setItem('is_admin', is_admin ? 'true' : 'false');
  }

  public setToken(token: string) {
    this._setCookie('token', token, 1);
  }

  public getToken() {
    return this._getCookie('token');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public isAdmin(): boolean {
    return localStorage.getItem('is_admin') === 'true';
  }

  public deleteAuthInfo() {
    localStorage.removeItem('is_admin');
    this.setToken('');
  }

  private _setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie =
      cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  private _getCookie(cname: string) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }
}

export default new AuthSrv();
