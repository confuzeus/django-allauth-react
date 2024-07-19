interface GetSessionMeta {
  is_authenticated: boolean;
}
interface BaseGetSessionResponse {
  meta: GetSessionMeta;
}

interface GetSessionSuccessResponseUser {
  id: number | string;
  display: string;
  has_usable_password: boolean;
  email: string;
  username: string;
}

interface GetSessionSuccessResponseMethod {
  method: "password" | "socialaccount" | "mfa";
  at: number;
  email?: string;
  username?: string;
  reauthenticated?: boolean;
  provider?: string;
  uid?: string;
  type?: "recovery_codes" | "totp";
}

interface GetSessionSuccessResponseData {
  user: GetSessionSuccessResponseUser;
  methods: GetSessionSuccessResponseMethod[];
}

export interface GetSessionSuccessResponse extends BaseGetSessionResponse {
  status: 200;
  data: GetSessionSuccessResponseData;
}

interface AuthenticationProvider {
  id: string;
  name: string;
  client_id: string;
  flows: Array<"provider_redirect" | "provider_token">;
}

interface AuthenticationFlow {
  id:
    | "verify_email"
    | "login"
    | "signup"
    | "provider_redirect"
    | "provider_signup"
    | "provider_token"
    | "mfa_authenticate"
    | "reauthenticate"
    | "mfa_reauthenticate";
  provider: AuthenticationProvider;
  is_pending: boolean;
}

interface GetSessionNotAuthenticatedResponseData {
  flows: AuthenticationFlow[];
}

export interface GetSessionNotAuthenticatedResponse
  extends BaseGetSessionResponse {
  status: 401;
  data: GetSessionNotAuthenticatedResponseData;
}

export interface GetSessionInvalidSessionResponse
  extends BaseGetSessionResponse {
  status: 410;
  data: GetSessionNotAuthenticatedResponseData;
}
