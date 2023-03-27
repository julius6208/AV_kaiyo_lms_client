import React from "react"

import { UserApplication as DesktopUserApplication } from "./desktop"
import { UserApplication as MobileUserApplication } from "./mobile"
import { ResponsiveUI } from "src/modules/responsiveUI"

export const UserApplication = () => {
  return <ResponsiveUI mobile={<MobileUserApplication />} laptop={<DesktopUserApplication />} />
}
