import React from "react"

import { Box, Pagination, Table, TableBody, TableContainer } from "src/UILibrary"
import { ApplicationTableHeader as MobileApplicationTableHeader } from "./components/mobileApplicationTableHeader"
import { ApplicationTableHeader as DesktopApplicationTableHeader } from "./components/desktopApplicationTableHeader"
import { ApplicationTableItem as MobileApplicationTableItem } from "./components/mobileApplicationTableItem"
import { ApplicationTableItem as DesktopApplicationTableItem } from "./components/desktopApplicationTableItem"

import { Application } from "src/types/application"
import { ResponsiveUI } from "src/modules/responsiveUI"

interface ApplicationTableProps {
  applicationData: Application[]
  onEdit?: Function
  setApplications?: Function
  pagination?: {
    count: number
    currentPage: number
  }
}

export const ApplicationListTable: React.FC<ApplicationTableProps> = ({
  applicationData,
  onEdit,
  setApplications,
  pagination,
}) => {
  const handleChecked = (id: number, value: boolean) => {
    setApplications &&
      setApplications(
        applicationData.map(
          (application: Application) => application.id === id && { ...application, checked: value }
        )
      )
  }

  return (
    <TableContainer sx={{ mt: "1.0625rem" }}>
      <ResponsiveUI
        mobile={
          <>
            <Table size="small" sx={{ tableLayout: "fixed" }}>
              <MobileApplicationTableHeader />
              <TableBody>
                {applicationData.map((row) => (
                  <MobileApplicationTableItem
                    key={row.id}
                    keyValue={row.id}
                    content={row}
                    onEdit={onEdit}
                    handleChecked={handleChecked}
                  />
                ))}
              </TableBody>
            </Table>
          </>
        }
        laptop={
          <>
            <Table size="small" sx={{ tableLayout: "fixed" }}>
              <DesktopApplicationTableHeader />
              <TableBody>
                {applicationData.map((row) => (
                  <DesktopApplicationTableItem
                    key={row.id}
                    keyValue={row.id}
                    content={row}
                    onEdit={onEdit}
                    handleChecked={handleChecked}
                  />
                ))}
              </TableBody>
            </Table>
          </>
        }
      />

      {pagination && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "0.375rem" }}>
          <Pagination count={pagination.count} page={pagination.currentPage} color="primary" />
        </Box>
      )}
    </TableContainer>
  )
}
