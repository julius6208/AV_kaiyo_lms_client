import React from "react"
import { useRecoilState } from "recoil"

import { Snackbar, Alert } from "src/UILibrary"

import { alertsState } from "src/states/alerts"

export const AlertLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [alerts, setAlerts] = useRecoilState(alertsState)

  return (
    <>
      {children}
      {!!alerts.length && (
        <Snackbar
          open={!!alerts.length}
          autoHideDuration={3000}
          onClose={() => setAlerts(alerts.slice(1))}
        >
          <Alert
            onClose={() => setAlerts(alerts.slice(1))}
            severity={alerts[0].color}
            sx={{ width: "100%" }}
          >
            {alerts[0].message}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}
