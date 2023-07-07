import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Checkbox, MenuItem, Select, TextField, Typography } from "src/UILibrary"
import { USER_STATE } from "src/constants/userState"

import { UserState } from "src/types/user"

export const EditFolderList = () => {
  const { t } = useTranslation()

  const [userState, setUserState] = useState<UserState>("teacher")

  return (
    <Box sx={{ display: "flex", mt: "1.5rem" }}>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Checkbox
          sx={{
            p: 0,
            mr: "1.25rem",
            mt: "0.35rem",
            "& .MuiSvgIcon-root": { fontSize: "1.5rem" },
          }}
        />
        <Typography.Heading
          sx={{ display: "flex", textAlign: "center", fontWeight: 400, mt: "0.25rem" }}
        >
          2022/10/10
        </Typography.Heading>
      </Box>
      <Box>
        <TextField
          sx={{ width: "32.125rem", bgcolor: "background.paper" }}
          placeholder="新しいフォルダネーム"
        />
        <Select
          sx={{
            mt: "0.625rem",
            "& .MuiSelect-select": {
              width: "130px",
              bgcolor: "background.paper",
            },
          }}
          value={userState}
          onChange={(e) => setUserState(e.target.value as UserState)}
        >
          {USER_STATE.map(
            (user) =>
              user.key !== "meal-maker" && (
                <MenuItem key={user.key} value={user.key}>
                  {t(user.label)}
                </MenuItem>
              )
          )}
        </Select>
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Button
          sx={{
            fontWeight: "500",
            lineHeight: "0.875rem",
            bgcolor: "secondary.dark",
            p: "0.625rem 1rem",
          }}
          variant="contained"
        >
          {t("create_folder.save")}
        </Button>
      </Box>
    </Box>
  )
}
