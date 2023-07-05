export interface ReqDto {
  email: string;
  password: string;
  username?: string;
  phone?: string;
}

export class AccessTokenDto {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface ResDto {
  readonly statusCode: number;
  readonly message: string;
  readonly data: object;
}
