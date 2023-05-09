import { useSetRecoilState } from "recoil"

import { alertsState } from "src/states/alerts"
import { IAlert } from "src/types/alerts"

export const usePushAlerts = () => {
  const setAlerts = useSetRecoilState(alertsState)

  // eslint-disable-next-line no-unused-vars
  const pushAlert: (alert: IAlert) => void = (alert: IAlert) => {
    setAlerts((alerts) => [...alerts, alert])
  }

  return pushAlert
}
