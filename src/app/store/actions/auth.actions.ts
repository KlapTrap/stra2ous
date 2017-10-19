import { Action } from '@ngrx/store';
import { ApiActionTypes, APIAction } from './api.actions';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login success';
export const LOGIN_FAILED = '[Auth] Login failed';

export const LOGOUT = '[Auth] Logout';
export const LOGOUT_SUCCESS = '[Auth] Logout success';
export const LOGOUT_FAILED = '[Auth] Logout failed';

export const VERIFY_SESSION = '[Auth] Verify session';
export const SESSION_VERIFIED = '[Auth] Session verified';
export const SESSION_INVALID = '[Auth] Session invalid';

export const GET_INFO = '[Auth] Get session info';

export const RESET_AUTH = '[Auth] Reset auth data';

export interface SessionData {
  endpoints?: {
    [type: string]: {
      [guid: string]: {
        [key: string]: any
      }
    }
  };
  user?: {
    admin: boolean,
    guid: string,
    name: string
  };
  version?: {
    proxy_version: string,
    database_version: number;
  };
  valid: boolean;
  uaaError?: boolean;
  sessionExpiresOn: number;
}

export class Login implements Action {
  constructor(public username: string, public password: string) { }
  type = LOGIN;
}

export class LoginSuccess implements Action {
  type = LOGIN_SUCCESS;
}

export class LoginFailed implements Action {
  constructor(public message: string) { }
  type = LOGIN_FAILED;
}

export class VerifySession implements Action {
  constructor(public login = true, public updateCNSIs = true) { }
  type = VERIFY_SESSION;
}

export class VerifiedSession implements Action {
  constructor(private sessionData: SessionData, public updateCNSIs = true) { }
  type = SESSION_VERIFIED;
}

export class InvalidSession implements Action {
  constructor(public uaaError: boolean = false) { }
  type = SESSION_INVALID;
}

export class ResetAuth implements Action {
  type = RESET_AUTH;
}

export class GetInfo implements Action {
  type = GET_INFO;
}

export class Logout implements Action {
  type = LOGOUT;
}

export class LogoutSuccess implements Action {
  type = LOGOUT_SUCCESS;
}

export class LogoutFailed implements Action {
  constructor(public error: any) { }
  type = LOGOUT_FAILED;
}
