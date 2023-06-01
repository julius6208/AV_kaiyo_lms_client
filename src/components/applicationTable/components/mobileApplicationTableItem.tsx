import React from "react"
import { useNavigate } from "react-router-dom"

import { Box, TableCell, TableRow, Typography } from "src/UILibrary"

import { Application } from "src/types/application"
import { useSession } from "src/modules/sessionProvider"

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
  const navigate = useNavigate()
  const session = useSession()

  const handleApplication = () => {
    session?.value.user.role !== "teacher" && navigate(`/application/${content.id}`)
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
        <Typography.Action>{content.id}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action>{content.student}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action>{content.applicationtime}</Typography.Action>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography.Action>{content.approval}</Typography.Action>
        </Box>
      </TableCell>
    </TableRow>
  )
}
