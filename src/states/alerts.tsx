import { atom } from "recoil"

import { IAlert } from "src/types/alerts"

export const alertsState = atom<IAlert[]>({
  key: "alerts",
  default: [],
})
