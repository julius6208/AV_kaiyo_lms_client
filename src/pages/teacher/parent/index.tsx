import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
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
import { SearchBox } from "./components/searchBox"

import { PAGE_SIZE } from "src/constants/common"
import { IParentListFilters, IParentSorts, Parent } from "src/types/parent"
import { getOptimizedParentListFilters } from "src/modules/filters"
import { useGetExportParentList, useGetParentList } from "src/queries/parent"
import { CSVLink } from "react-csv"

const fields: FieldDefinition<Parent>[] = [
  {
    attribute: "user_id",
    sort_field: "user_id",
    label: "login.id",
    width: 50,
    sort: true,
  },
  {
    attribute: "fullName",
    label: "mypage.name",
    width: 90,
  },
  {
    attribute: "fullNameKana",
    sort_field: "full_name_katakana",
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
    attribute: "enrolledStudents",
    label: "user_list.enrolled_student",
    width: 90,
  },
  {
    attribute: "postCode",
    sort_field: "post_code",
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
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [displayCount, setDisplayCount] = useState<number>(PAGE_SIZE[0])
  const [searchParams, setSearchParams] = useSearchParams()

  const sort = searchParams.get("sort") || ""
  const sortBy = sort.split(",")[0]
  const sortOrder = sort.split(",")[1]
  const ids = searchParams.get("ids") || ""
  const fullName = searchParams.get("fullName") || ""
  const fullNameKana = searchParams.get("fullNameKana") || ""
  const address = searchParams.get("address") || ""

  const {
    data: parentData,
    isLoading,
    error,
  } = useGetParentList(page, displayCount, "", sort, ids, fullName, fullNameKana, address)

  const { data: parentExportData } = useGetExportParentList("")

  const handleSearchParams = (
    sortBy: string,
    sortOrder: string,
    ids: string,
    fullName: string,
    fullNameKana: string,
    address: string
  ) => {
    const newSearchParam: Partial<IParentSorts> = {}
    newSearchParam.sort = sortBy + "," + sortOrder
    if (ids) {
      newSearchParam.ids = ids
    }
    if (fullName) {
      newSearchParam.fullName = fullName
    }
    if (fullNameKana) {
      newSearchParam.fullNameKana = fullNameKana
    }
    if (address) {
      newSearchParam.address = address
    }
    setSearchParams(newSearchParam, { replace: true })
  }

  const handleSort = (fieldName: string) => {
    const newSortOrder =
      fieldName === sortBy
        ? sortOrder === "asc"
          ? "desc"
          : "asc"
        : fieldName === ""
        ? "desc"
        : "asc"
    handleSearchParams(fieldName, newSortOrder, ids, fullName, fullNameKana, address)
  }

  const handleFilterChange = (data: IParentListFilters) => {
    const newSearchParam = getOptimizedParentListFilters(data)
    setSearchParams(
      Object.keys(newSearchParam).reduce(
        (prev, curr) => ({
          ...prev,
          [curr]: newSearchParam[curr as keyof IParentListFilters]?.toString(),
        }),
        {}
      ),
      { replace: true }
    )
  }

  useEffect(() => {
    if (parentData) {
      setTotalPages(Math.ceil(parentData.data.total / displayCount))
    }
  }, [displayCount, parentData])

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
            <SearchBox
              initialData={{
                sort,
                ids,
                fullName,
                fullNameKana,
                address,
              }}
              handleFilterChange={handleFilterChange}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: "0.9375rem",
                ml: "1.25rem",
                gap: "1.125rem",
              }}
            >
              <Typography.Detail>{`${
                !parentData?.data.parents.length ? 0 : displayCount * (page - 1) + 1
              }~${!parentData?.data.parents.length ? 0 : parentData?.data.parents.length} / ${
                !parentData?.data.total ? 0 : parentData?.data.total
              }`}</Typography.Detail>
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
          <CSVLink data={parentExportData?.data || ""} filename="parent.csv">
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
          </CSVLink>
        </Box>
        <UserTable
          fields={fields}
          content={parentData?.data.parents || []}
          onPageNumChange={setPage}
          pagination={{ count: totalPages, currentPage: page }}
          isLoading={isLoading}
          error={error?.message}
          sortBy={sortBy}
          sortOrder={sortOrder}
          handleSort={handleSort}
        />
      </Box>
    </Box>
  )
}
