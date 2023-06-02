import React from "react"
import { useTranslation } from "react-i18next"

import { Box, TableCell, TableHead, TableRow, Typography } from "src/UILibrary"

// interface ApplicationTableHeaderProps {
//   sortBy?: string
//   sortOrder?: string
// }

export const ApplicationTableHeader: React.FC = () => {
  const { t } = useTranslation()
  return (
    <TableHead>
      <TableRow
        sx={{
          "&>th": {
            textAlign: "center",
            color: "background.paper",
            fontWeight: 500,
            lineHeight: "1.5rem",
            borderWidth: "0 2px 0 0",
            borderStyle: "solid",
            bgcolor: "text.secondary",
            px: 0,
            py: "0.75rem",
            "&:first-of-type": {
              borderRadius: "9px 0 0 0",
            },
            "&:last-of-type": {
              borderRadius: "0 9px 0 0",
            },
          },
          overflow: "scroll",
        }}
      >
        <TableCell sx={{ position: "relative" }}>
          <Box sx={{ cursor: "pointer" }}>
            <Typography.Detail>{t("application.registration_number")}</Typography.Detail>
            {/* <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <SortIcon fieldName="id" sortBy={sortBy} sortOrder={sortOrder} />
            </Box> */}
          </Box>
        </TableCell>
        <TableCell sx={{ position: "relative" }}>
          <Box sx={{ cursor: "pointer" }}>
            <Typography.Detail>{t("application.student")}</Typography.Detail>
            {/* <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <SortIcon fieldName="student" sortBy={sortBy} sortOrder={sortOrder} />
            </Box> */}
          </Box>
        </TableCell>
        <TableCell sx={{ position: "relative" }}>
          <Box sx={{ cursor: "pointer" }}>
            <Typography.Detail>{t("application.application_time")}</Typography.Detail>
            {/* <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <SortIcon fieldName="applicationtime" sortBy={sortBy} sortOrder={sortOrder} />
            </Box> */}
          </Box>
        </TableCell>
        <TableCell sx={{ position: "relative" }}>
          <Typography.Detail>{t("application.approval_status")}</Typography.Detail>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
