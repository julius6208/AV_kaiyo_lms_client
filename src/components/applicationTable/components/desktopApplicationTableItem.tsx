import React from "react"
import { useTranslation } from "react-i18next"

import { Box, Checkbox, TableCell, TableRow, Radio, Typography } from "src/UILibrary"

import { Application } from "src/types/application"
import { useSession } from "src/modules/sessionProvider"
import { useNavigate } from "react-router-dom"

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
  handleChecked,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const session = useSession()

  const handleApplication = () => {
    session?.value.id !== "teacher" && navigate(`/application/${content.id}`)
    onEdit && onEdit(content)
  }

  const handleCheckboxClick = (event: any) => {
    event.stopPropagation()
  }

  return (
    <TableRow
      onClick={handleApplication}
      key={keyValue}
      sx={{
        cursor: "pointer",
        "&>td": {
          p: 0,
          textAlign: "center",
          fontSize: "16px",
          bgcolor: "background.paper",
          color: "text.secondary",
          "&:first-of-type": {
            color: "secondary.dark",
          },
          "&:not(:last-of-type)": {
            borderWidth: "0 2px 2px 2px",
            borderStyle: "solid",
            borderColor: "info.light",
            borderCollapse: "collapse",
          },
        },
      }}
    >
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>{content.id}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>{content.student}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>{content.hm}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>{content.applicationtime}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>{content.leavetime}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>{content.returntime}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>{content.category}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>{content.reason}</Typography.Action>
      </TableCell>
      <TableCell>
        {/* <Typography.Action>{content.approval}</Typography.Action> */}
        <Box>
          <Box sx={{ display: "flex" }}>
            <Radio
              sx={{
                p: 0,
                "& .MuiSvgIcon-root": {
                  fontSize: "12px",
                },
              }}
            />
            <Typography.Action>{t("application.no_approve")}</Typography.Action>
            <Radio
              sx={{
                p: 0,
                "& .MuiSvgIcon-root": {
                  fontSize: "12px",
                },
              }}
            />
            <Typography.Action>{t("application.approve")}</Typography.Action>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Radio
              sx={{
                p: 0,
                "& .MuiSvgIcon-root": {
                  fontSize: "12px",
                },
              }}
            />
            <Typography.Action>{t("application.deny")}</Typography.Action>
          </Box>
        </Box>
      </TableCell>
      {session?.value.id === "teacher" && (
        <TableCell sx={{ display: "flex", justifyContent: "center" }}>
          <Checkbox
            sx={{ p: 0, m: 0, "& .MuiSvgIcon-root": { fontSize: "1.25rem" } }}
            checked={content.checked}
            onClick={handleCheckboxClick}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              handleChecked(content.id, evt.target.checked)
            }
          />
        </TableCell>
      )}
    </TableRow>
  )
}
