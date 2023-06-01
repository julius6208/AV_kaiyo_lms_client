// export interface ISession {
//   id: string
// }
export interface ISession {
  user: UserInfo
  tokenInfo: TokenInfo
}

export interface ISessionState {
  value: ISession
  setValue: Function
}

export interface UserInfo {
  id: number
  email: string
  fullName: string
  fullNameKana: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  role: string
}

export interface TokenInfo {
  role: string
  token_type: string
  scope: string
  expires_in: number
  ext_expires_in: number
  access_token: string
  refresh_token: string
  id_token: string
}

export interface LoginLink {
  loginLink: string
}
