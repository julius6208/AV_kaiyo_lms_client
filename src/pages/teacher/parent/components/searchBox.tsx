import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import {
  Box,
  Button,
  ExpandLessIcon,
  ExpandMoreIcon,
  Popover,
  TextField,
  Typography,
} from "src/UILibrary"

import { IParentListFilters } from "src/types/parent"

interface SearchBoxProps {
  initialData: IParentListFilters
  // eslint-disable-next-line no-unused-vars
  handleFilterChange: (data: IParentListFilters) => void
}

export const SearchBox: React.FC<SearchBoxProps> = ({ initialData, handleFilterChange }) => {
  const { t } = useTranslation()
  const [anchorE0, setAnchorE0] = React.useState<HTMLButtonElement | null>(null)

  const [sort] = useState<string>(initialData.sort)
  const [firstId, setFirstId] = useState<string>(initialData.ids.split(",")[0])
  const [secondId, setSecondId] = useState<string>(initialData.ids.split(",")[1])
  const [fullName, setFullName] = useState<string>(initialData.fullName)
  const [fullNameKana, setFullNameKana] = useState<string>(initialData.fullNameKana)
  const [address, setAddress] = useState<string>(initialData.address)

  const handleClick0 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE0(event.currentTarget)
  }

  const handleClick = () => {
    handleFilterChange({
      sort,
      ids:
        firstId && secondId
          ? firstId + "," + secondId
          : firstId && !secondId
          ? firstId
          : !firstId && secondId
          ? "," + secondId
          : "",
      fullName,
      fullNameKana,
      address,
    })
    setAnchorE0(null)
  }

  const handleClose = () => {
    setAnchorE0(null)
  }

  const open = Boolean(anchorE0)
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleClick0}
        sx={{ bgcolor: "text.secondary", borderRadius: 0 }}
      >
        <Typography.Title sx={{ mr: "5rem", fontWeight: 500, color: "background.paper" }}>
          {t("application.filter_condition")}
        </Typography.Title>
        {open ? (
          <ExpandLessIcon sx={{ width: "16px", height: "16px" }} />
        ) : (
          <ExpandMoreIcon sx={{ width: "16px", height: "16px" }} />
        )}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorE0}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            boxShadow: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            p: "16px 20px 20px 20px",
            bgcolor: "info.dark",
            border: "1px solid",
            borderColor: "primary.contrastText",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box>
            <Typography.Action>{t("user_list.id_range")}</Typography.Action>
            <Box display="flex" alignItems="center">
              <TextField
                sx={{ width: "100px" }}
                value={firstId}
                onChange={(e) => setFirstId(e.target.value)}
              />
              <Typography.Description sx={{ mx: 1 }}>~</Typography.Description>
              <TextField
                sx={{ width: "100px" }}
                value={secondId}
                onChange={(e) => setSecondId(e.target.value)}
              />
            </Box>
          </Box>
          <Box>
            <Typography.Action>{t("user_list.name_match")}</Typography.Action>
            <TextField
              sx={{ width: "100px" }}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Box>
          <Box>
            <Typography.Action>{t("user_list.hiragana_match")}</Typography.Action>
            <TextField
              sx={{ width: "100px" }}
              value={fullNameKana}
              onChange={(e) => setFullNameKana(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography.Action>{t("user_list.address_match")}</Typography.Action>
              <TextField
                sx={{ width: "220px" }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "secondary.dark",
                borderRadius: "0.1875rem",
                mt: "auto",
                ml: "6.25rem",
              }}
              onClick={handleClick}
            >
              <Typography.Detail>{t("application.search_condition")}</Typography.Detail>
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}
