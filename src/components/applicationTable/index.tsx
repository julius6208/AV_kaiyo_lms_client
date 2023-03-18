import React from "react"

import { Box, Pagination, Table, TableBody, TableContainer } from "src/UILibrary"
import { ApplicationTableHeader } from "./components/applicationTableHeader"
import { ApplicationTableItem } from "./components/applicationTableItem"

import { Application } from "src/types/application"

interface ApplicationTableProps {
  applicationData: Application[]
  onEdit: Function
  setApplications: Function
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
    setApplications(
      applicationData.map(
        (application: Application) => application.id === id && { ...application, checked: value }
      )
    )
  }

  return (
    <TableContainer sx={{ mt: "1.0625rem" }}>
      <Table size="small" sx={{ tableLayout: "fixed" }}>
        <ApplicationTableHeader />
        <TableBody>
          {applicationData.map((row) => (
            <ApplicationTableItem
              key={row.id}
              keyValue={row.id}
              content={row}
              onEdit={onEdit}
              handleChecked={handleChecked}
            />
          ))}
        </TableBody>
      </Table>
      {pagination && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "0.375rem" }}>
          <Pagination count={pagination.count} page={pagination.currentPage} color="primary" />
        </Box>
      )}
    </TableContainer>
  )
}
