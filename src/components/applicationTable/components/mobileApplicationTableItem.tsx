import React from "react"
import { useNavigate } from "react-router-dom"

import { Box, TableCell, TableRow, Typography } from "src/UILibrary"

import { Application } from "src/types/application"
import { useSession } from "src/modules/sessionProvider"
import { formattedDate } from "src/modules/date"
import { useTranslation } from "react-i18next"

interface ApplicationTableProps {
  keyValue: number
  content: Application
  onEdit?: Function
  handleChecked: Function
}

export const ApplicationTableItem: React.FC<ApplicationTableProps> = ({
  keyValue,
  content,
  onEdit,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const session = useSession()

  const handleApplication = () => {
    session?.value.user.role !== "teacher" &&
      navigate(`/application/${content.id}`, { state: content })
    onEdit && onEdit(content)
  }

  return (
    <TableRow
      onClick={handleApplication}
      key={keyValue}
      sx={{
        cursor: "pointer",
        "&>td": {
          px: 0,
          py: "0.625rem",
          textAlign: "center",
          bgcolor: "background.paper",
          color: "text.secondary",
          "&:first-of-type": {
            color: "secondary.dark",
          },
          borderWidth: "0 2px 2px 2px",
          borderStyle: "solid",
          borderColor: "info.light",
        },
      }}
    >
      <TableCell>
        <Typography.Action>{content.student_id}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action>{content.student_name}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action>{formattedDate(content?.created_at as string) || ""}</Typography.Action>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography.Action>{`${
            content.status === "APPROVED"
              ? t("approve_type.approve")
              : content.status === "REJECTED"
              ? t("approve_type.deny")
              : t("approve_type.un_approve")
          }`}</Typography.Action>
        </Box>
      </TableCell>
    </TableRow>
  )
}
