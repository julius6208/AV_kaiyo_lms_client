export interface ISession {
  id: string
}

export interface ISessionState {
  value: ISession
  setValue: Function
}
