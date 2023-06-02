import React from "react"
import { useTranslation } from "react-i18next"

import {
  Box,
  CircularProgress,
  Pagination,
  Typography,
  Table,
  TableBody,
  TableContainer,
} from "src/UILibrary"
import { ApplicationTableHeader as MobileApplicationTableHeader } from "./components/mobileApplicationTableHeader"
import { ApplicationTableHeader as DesktopApplicationTableHeader } from "./components/desktopApplicationTableHeader"
import { ApplicationTableItem as MobileApplicationTableItem } from "./components/mobileApplicationTableItem"
import { ApplicationTableItem as DesktopApplicationTableItem } from "./components/desktopApplicationTableItem"

import { Application } from "src/types/application"
import { ResponsiveUI } from "src/modules/responsiveUI"

interface ApplicationTableProps {
  applicationData: Application[]
  onEdit?: Function
  checkedApplicationIds?: number[]
  setApproveApplicationIds?: Function
  variant?: "pagination" | "next-previous"
  pagination?: {
    count: number
    currentPage: number
  }
  // eslint-disable-next-line no-unused-vars
  onPageNumChange?: (value: number) => void
  isLoading?: boolean
  error?: string
  sortBy?: string
  sortOrder?: string
  handleSort?: Function
}

export const ApplicationListTable: React.FC<ApplicationTableProps> = ({
  applicationData,
  onEdit,
  checkedApplicationIds,
  setApproveApplicationIds,
  variant = "pagination",
  pagination,
  onPageNumChange,
  isLoading = false,
  error,
  sortBy,
  sortOrder,
  handleSort,
}) => {
  const { t } = useTranslation()

  const handleChecked = (id: number, value: boolean) => {
    setApproveApplicationIds &&
      checkedApplicationIds &&
      applicationData.map(() =>
        !!value && value === true
          ? setApproveApplicationIds([...checkedApplicationIds, id])
          : setApproveApplicationIds(checkedApplicationIds.filter((key) => key !== id))
      )
  }
  const handleAllChecked = (value: boolean) => {
    if (setApproveApplicationIds && checkedApplicationIds && value === true) {
      setApproveApplicationIds([])
      setApproveApplicationIds(applicationData.map((application) => application.id))
    } else if (setApproveApplicationIds && checkedApplicationIds && value === false) {
      setApproveApplicationIds([])
    }
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
              <DesktopApplicationTableHeader
                sortBy={sortBy}
                sortOrder={sortOrder}
                handleSort={handleSort}
                applicationData={applicationData}
                handleAllChecked={handleAllChecked}
              />
              <TableBody>
                {applicationData.map((row) => (
                  <DesktopApplicationTableItem
                    key={row.id}
                    keyValue={row.id}
                    content={row}
                    onEdit={onEdit}
                    checkedApplicationIds={checkedApplicationIds}
                    handleChecked={handleChecked}
                  />
                ))}
              </TableBody>
            </Table>
          </>
        }
      />

      {!!error && (
        <Typography.Description color="error" sx={{ textAlign: "center", py: 3 }}>
          {error}
        </Typography.Description>
      )}
      {!error && applicationData.length === 0 && !isLoading && (
        <Typography.Description color="error" sx={{ textAlign: "center", py: 3 }}>
          {t("user_list.no_data")}
        </Typography.Description>
      )}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress color="primary" />
        </Box>
      )}
      {variant === "pagination" && pagination && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "0.375rem" }}>
          <Pagination
            color="primary"
            count={pagination.count}
            page={pagination.currentPage}
            onChange={(_, value) => !!onPageNumChange && onPageNumChange(value)}
          />
        </Box>
      )}
    </TableContainer>
  )
}
