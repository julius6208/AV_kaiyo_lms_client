import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import {
  Box,
  Button,
  DownloadIcon,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "src/UILibrary"
import { UserTable, FieldDefinition } from "src/components/userTable"

import { Parent } from "src/types/parent"
import { PAGE_SIZE } from "src/constants/common"
import { MOCK_PARENT_DATA } from "./mockparent"
import { SearchBox } from "./components/searchBox"

const parentData: Parent[] = MOCK_PARENT_DATA

const fields: FieldDefinition<Parent>[] = [
  {
    attribute: "id",
    label: "login.id",
    width: 50,
    sort: true,
  },
  {
    attribute: "name",
    label: "mypage.name",
    width: 90,
  },
  {
    attribute: "hiragana",
    label: "mypage.furigana",
    width: 100,
    sort: true,
  },
  {
    attribute: "phone1",
    label: "mypage.phone1",
    width: 90,
  },
  {
    attribute: "phone2",
    label: "mypage.phone2",
    width: 90,
  },
  {
    attribute: "enrolled_sibling",
    label: "user_list.enrolled_sibling",
    width: 90,
  },
  {
    attribute: "post_number",
    label: "mypage.postal_code",
    width: 90,
    sort: true,
  },
  {
    attribute: "address",
    label: "mypage.address",
    width: 200,
  },
]

export const ParentList: React.FC = () => {
  const { t } = useTranslation()
  const [displayCount, setDisplayCount] = useState<number>(PAGE_SIZE[0])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            justifyContent: "space-between",
            mt: "1rem",
            width: "100%",
          }}
        >
          <Box>
            <SearchBox />
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
              backgroundColor: "info.contrastText",
              borderRadius: "0.1875rem",
              mt: "3.125rem",
              p: "0.5625rem 2rem",
            }}
          >
            <Typography.Title
              sx={{
                fontWeight: 500,
                fontSize: "14px",
                textAlign: "center",
                lineHeight: "0.875rem",
                mr: "1rem",
              }}
            >
              {t("user_list.csv_download")}
            </Typography.Title>
            <DownloadIcon sx={{ width: "20px", height: "20px" }} />
          </Button>
        </Box>
        <UserTable
          fields={fields}
          content={parentData}
          pagination={{ count: 10, currentPage: 1 }}
        />
      </Box>
    </Box>
  )
}
