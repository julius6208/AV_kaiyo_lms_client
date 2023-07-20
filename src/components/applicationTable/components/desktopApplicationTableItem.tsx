import React from "react"
import { useTranslation } from "react-i18next"

import {
  Box,
  Checkbox,
  TableCell,
  TableRow,
  Typography,
  RadioButtonUncheckedIcon,
  CircleIcon,
} from "src/UILibrary"

import { Application } from "src/types/application"
import { useSession } from "src/modules/sessionProvider"
import { useNavigate } from "react-router-dom"
import { formattedDate } from "src/modules/date"

interface ApplicationTableProps {
  keyValue: number
  content: Application
  onEdit?: Function
  handleChecked: Function
  checkedApplicationIds?: number[]
}

export const ApplicationTableItem: React.FC<ApplicationTableProps> = ({
  keyValue,
  content,
  onEdit,
  handleChecked,
  checkedApplicationIds,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const session = useSession()
  const handleApplication = () => {
    session?.value.user.role !== "teacher" && navigate(`/application/${content.id}`)
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
          px: "0.3rem",
          textAlign: "center",
          fontSize: "16px",
          bgcolor: "background.paper",
          color: "text.secondary",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "hidden",
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
        <Typography.Action sx={{ fontSize: "16px" }}>{content.student_name}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>{content.hm}</Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>
          {formattedDate(content?.created_at as string) || ""}
        </Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>
          {formattedDate(content?.departure_datetime as string) || ""}
        </Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>
          {formattedDate(content?.arrival_datetime as string) || ""}
        </Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>
          {t(`category.${content.category}`)}
        </Typography.Action>
      </TableCell>
      <TableCell>
        <Typography.Action sx={{ fontSize: "16px" }}>{content.rejected_reason}</Typography.Action>
      </TableCell>
      {session?.value.user.role === "teacher" ? (
        <TableCell>
          <Box>
            <Box sx={{ display: "flex" }}>
              <Checkbox
                sx={{
                  p: 0,
                  "& .MuiSvgIcon-root": {
                    fontSize: "12px",
                  },
                }}
                readOnly
                checked={content.status === "REQUESTED" && true}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CircleIcon />}
              />
              <Typography.Action>{t("application.no_approve")}</Typography.Action>
              <Checkbox
                sx={{
                  p: 0,
                  "& .MuiSvgIcon-root": {
                    fontSize: "12px",
                  },
                }}
                readOnly
                checked={content.status === "APPROVED" && true}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CircleIcon />}
              />
              <Typography.Action>{t("application.approve")}</Typography.Action>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Checkbox
                sx={{
                  p: 0,
                  "& .MuiSvgIcon-root": {
                    fontSize: "12px",
                  },
                }}
                readOnly
                checked={content.status === "REJECTED" && true}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CircleIcon />}
              />
              <Typography.Action>{t("application.deny")}</Typography.Action>
            </Box>
          </Box>
        </TableCell>
      ) : (
        <TableCell>
          <Typography.Action sx={{ fontSize: "16px" }}>{`${
            content.status === "APPROVED"
              ? t("approve_type.approve")
              : content.status === "REJECTED"
              ? t("approve_type.deny")
              : t("approve_type.un_approve")
          }`}</Typography.Action>
        </TableCell>
      )}
      {session?.value.user.role === "teacher" && (
        <TableCell onClick={handleCheckboxClick}>
          <Checkbox
            sx={{ p: 0, m: 0, "& .MuiSvgIcon-root": { fontSize: "1.25rem" } }}
            checked={!!checkedApplicationIds?.length && checkedApplicationIds.includes(content.id)}
            onClick={handleCheckboxClick}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChecked(content.id, e.target.checked)
            }
          />
        </TableCell>
      )}
    </TableRow>
  )
}
