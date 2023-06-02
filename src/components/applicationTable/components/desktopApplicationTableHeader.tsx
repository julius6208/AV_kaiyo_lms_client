import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, TableCell, TableHead, TableRow, Typography } from "src/UILibrary"
import { SortIcon } from "./sortIcon"

import { useSession } from "src/modules/sessionProvider"
import { Application } from "src/types/application"

interface ApplicationTableHeaderProps {
  applicationData: Application[]
  sortBy?: string
  sortOrder?: string
  handleSort?: Function
  handleAllChecked: Function
}

export const ApplicationTableHeader: React.FC<ApplicationTableHeaderProps> = ({
  sortBy,
  sortOrder,
  handleSort,
  applicationData,
  handleAllChecked,
}) => {
  const { t } = useTranslation()
  const session = useSession()

  const isAvailable = useMemo(() => !!applicationData.length, [applicationData])

  return (
    <TableHead>
      <TableRow
        sx={{
          "&>th": {
            textAlign: "center",
            color: "background.paper",
            fontWeight: 500,
            fontSize: "1.25rem",
            lineHeight: "1.5rem",
            p: 0,
            borderWidth: "0 2px 0 0",
            borderStyle: "solid",
            "&:not(:last-of-type)": {
              bgcolor: "text.secondary",
            },
            "&:first-of-type": {
              borderRadius: "9px 0 0 0",
            },
            "&:nth-of-type(7)": {
              borderRadius: "0 9px 0 0",
            },
          },
          overflow: "scroll",
        }}
      >
        <TableCell
          rowSpan={2}
          sx={{ width: "100px", position: "relative" }}
          onClick={() => isAvailable && handleSort && handleSort("id")}
        >
          <Box sx={{ cursor: "pointer" }}>
            <Typography.Title sx={{ fontWeight: 500, lineHeight: "1.5rem" }}>
              {t("application.registration_number")}
            </Typography.Title>
            <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <SortIcon fieldName="id" sortBy={sortBy} sortOrder={sortOrder} />
            </Box>
          </Box>
        </TableCell>
        <TableCell
          rowSpan={2}
          sx={{ width: "100px", position: "relative" }}
          onClick={() => isAvailable && handleSort && handleSort("student")}
        >
          <Box sx={{ cursor: "pointer" }}>
            <Typography.Title sx={{ fontWeight: 500, lineHeight: "1.5rem" }}>
              {t("application.student")}
            </Typography.Title>
            <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <SortIcon fieldName="student" sortBy={sortBy} sortOrder={sortOrder} />
            </Box>
          </Box>
        </TableCell>
        <TableCell
          rowSpan={2}
          sx={{ width: "100px", position: "relative" }}
          onClick={() => isAvailable && handleSort && handleSort("hm")}
        >
          <Box sx={{ cursor: "pointer" }}>
            <Typography.Title sx={{ fontWeight: 500, lineHeight: "1.5rem" }}>
              {t("application.charge")}
            </Typography.Title>
            <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <SortIcon fieldName="hm" sortBy={sortBy} sortOrder={sortOrder} />
            </Box>
          </Box>
        </TableCell>
        <TableCell colSpan={3} sx={{ width: "304px", py: "10px !important" }}>
          {t("application.time")}
        </TableCell>
        <TableCell
          rowSpan={2}
          sx={{ width: "175px", position: "relative" }}
          onClick={() => isAvailable && handleSort && handleSort("category")}
        >
          <Box sx={{ cursor: "pointer" }}>
            <Typography.Title sx={{ fontWeight: 500, lineHeight: "1.5rem" }}>
              {t("application.category")}
            </Typography.Title>
            <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <SortIcon fieldName="category" sortBy={sortBy} sortOrder={sortOrder} />
            </Box>
          </Box>
        </TableCell>
        <TableCell rowSpan={2} sx={{ width: "175px" }}>
          {t("application.reason")}
        </TableCell>
        <TableCell rowSpan={2} sx={{ width: "100px" }}>
          {t("application.approval_status")}
        </TableCell>
        {session?.value.user.role === "teacher" ? (
          <TableCell rowSpan={2}>
            <Button
              variant="outlined"
              sx={{
                p: 0,
                minWidth: "inherit",
                borderRadius: "0.3rem",
                color: "secondary.dark",
              }}
              onClick={() => handleAllChecked(true)}
            >
              <Typography.Action
                sx={{
                  fontSize: "8px",
                  textAlign: "center",
                }}
              >
                {t("application.select_all")}
              </Typography.Action>
            </Button>
            <Button
              variant="outlined"
              sx={{
                p: 0,
                mt: "1rem",
                minWidth: "inherit",
                borderRadius: "0.3rem",
                color: "secondary.dark",
              }}
              onClick={() => handleAllChecked(false)}
            >
              <Typography.Action
                sx={{
                  fontSize: "8px",
                  textAlign: "center",
                }}
              >
                {t("application.no_select_all")}
              </Typography.Action>
            </Button>
          </TableCell>
        ) : (
          <TableCell rowSpan={2} sx={{ display: "none" }}>
            <Button
              variant="outlined"
              sx={{
                p: 0,
                minWidth: "inherit",
                borderRadius: "0.3rem",
                color: "secondary.dark",
              }}
            >
              <Typography.Action
                sx={{
                  fontSize: "8px",
                  textAlign: "center",
                }}
              >
                {t("application.select_all")}
              </Typography.Action>
            </Button>
            <Button
              variant="outlined"
              sx={{
                p: 0,
                mt: "1rem",
                minWidth: "inherit",
                borderRadius: "0.3rem",
                color: "secondary.dark",
              }}
            >
              <Typography.Action
                sx={{
                  fontSize: "8px",
                  textAlign: "center",
                }}
              >
                {t("application.no_select_all")}
              </Typography.Action>
            </Button>
          </TableCell>
        )}
      </TableRow>
      <TableRow
        sx={{
          "&>th": {
            textAlign: "center",
            color: "background.paper",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "1.5rem",
            py: "0.625rem",
            width: "100%",
            borderWidth: "2px 2px 0 0",
            borderStyle: "solid",
            bgcolor: "text.secondary",
          },
          overflow: "scroll",
        }}
      >
        <TableCell
          rowSpan={2}
          sx={{ width: "100px", position: "relative" }}
          onClick={() => isAvailable && handleSort && handleSort("created_at")}
        >
          <Box sx={{ cursor: "pointer" }}>
            <Typography.Detail sx={{ fontSize: "16px", lineHeight: "1.5rem" }}>
              {t("application.application_time")}
            </Typography.Detail>
            <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <SortIcon fieldName="created_at" sortBy={sortBy} sortOrder={sortOrder} />
            </Box>
          </Box>
        </TableCell>
        <TableCell
          rowSpan={2}
          sx={{ width: "100px", position: "relative" }}
          onClick={() => isAvailable && handleSort && handleSort("departure_datetime")}
        >
          <Box sx={{ cursor: "pointer" }}>
            <Typography.Detail sx={{ fontSize: "16px", lineHeight: "1.5rem" }}>
              {t("application.departure_time")}
            </Typography.Detail>
            <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <SortIcon fieldName="departure_datetime" sortBy={sortBy} sortOrder={sortOrder} />
            </Box>
          </Box>
        </TableCell>
        <TableCell
          rowSpan={2}
          sx={{ width: "100px", position: "relative" }}
          onClick={() => isAvailable && handleSort && handleSort("arrival_datetime")}
        >
          <Box sx={{ cursor: "pointer" }}>
            <Typography.Detail sx={{ fontSize: "16px", lineHeight: "1.5rem" }}>
              {t("application.return_time")}
            </Typography.Detail>
            <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <SortIcon fieldName="arrival_datetime" sortBy={sortBy} sortOrder={sortOrder} />
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
