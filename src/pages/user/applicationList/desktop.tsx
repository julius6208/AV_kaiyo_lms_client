import React, { useState } from "react"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"

import { Box, Button, MenuItem, Select, SelectChangeEvent, Typography } from "src/UILibrary"
import { ApplicationListTable } from "src/components/applicationTable"

import { PAGE_SIZE } from "src/constants/common"
import { Application } from "src/types/application"
import { MOCK_APPLICATION_DATA } from "src/pages/teacher/applicationList/mockdata"
import { StudentSearchBox } from "./components/searchBox"

const applicationData: Application[] = MOCK_APPLICATION_DATA

export const UserApplication: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [displayCount, setDisplayCount] = useState<number>(PAGE_SIZE[0])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "1098px",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "1.125rem",
            pl: "1.25rem",
            py: "1.5rem",
            borderRadius: "9px 9px 0px 0px",
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography.Title sx={{ fontWeight: 500, fontSize: "24px", lineHeight: "1.5rem" }}>
            {t("application.past_application_list")}
          </Typography.Title>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "0.6875rem",
            width: "100%",
          }}
        >
          <Box>
            <StudentSearchBox />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: "0.9375rem",
                ml: "1.25rem",
                gap: "1.125rem",
              }}
            >
              <Typography.Detail>1~50/500</Typography.Detail>
              <Typography.Detail>{t("application.display_count")}</Typography.Detail>
              <Select
                value={displayCount}
                sx={{
                  height: "24px",
                  "& .MuiSelect-select": {
                    py: 0,
                    bgcolor: "background.paper",
                    borderWidth: 0,
                  },
                }}
                onChange={(e: SelectChangeEvent<unknown>) =>
                  setDisplayCount(e.target.value as number)
                }
              >
                {PAGE_SIZE.map((item, index) => (
                  <MenuItem key={index} value={item}>{`${item}件`}</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "error.main",
              borderRadius: "0.1875rem",
              p: "0.5625rem 3.1875rem",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
              mb: "3rem",
            }}
            onClick={() => {
              navigate(`/application/new`)
            }}
          >
            <Typography.Detail sx={{ textAlign: "center" }}>
              {t("application.new_apply")}
            </Typography.Detail>
          </Button>
        </Box>
        <ApplicationListTable
          applicationData={applicationData}
          pagination={{ count: 10, currentPage: 1 }}
          sortBy=""
          sortOrder=""
        />
      </Box>
    </Box>
  )
}
