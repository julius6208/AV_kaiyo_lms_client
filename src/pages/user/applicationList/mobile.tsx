import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useSearchParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "src/UILibrary"
import { ApplicationListTable } from "src/components/applicationTable"
import { StudentSearchBox } from "./components/searchBox"

import { PAGE_SIZE } from "src/constants/common"
import { useGetApplicationList } from "src/queries/application"
import { IApplicationListFilters, IApplicationSorts } from "src/types/application"
import { getOptimizedApplicationListFilters } from "src/modules/filters"

export const UserApplication: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [displayCount, setDisplayCount] = useState<number>(PAGE_SIZE[0])
  const [searchParams, setSearchParams] = useSearchParams()

  const sort = searchParams.get("sort") || ""
  const sortBy = sort.split(",")[0]
  const sortOrder = sort.split(",")[1]
  const student_name = searchParams.get("student_name") || ""
  const category = searchParams.get("category") || ""
  const status = searchParams.get("status") || ""
  const created_at = searchParams.get("created_at") || ""
  const departure_date = searchParams.get("departure_date") || ""
  const arrival_date = searchParams.get("arrival_date") || ""

  const {
    data: applicationData,
    isLoading,
    error,
  } = useGetApplicationList(
    page,
    displayCount,
    "",
    sort,
    student_name,
    category,
    status,
    created_at,
    departure_date,
    arrival_date
  )

  const handleSearchParams = (
    sortBy: string,
    sortOrder: string,
    created_at: string,
    departure_date: string,
    arrival_date: string
  ) => {
    const newSearchParam: Partial<IApplicationSorts> = {}
    newSearchParam.sort = sortBy + "," + sortOrder
    if (created_at) {
      newSearchParam.created_at = created_at
    }
    if (departure_date) {
      newSearchParam.arrival_datetime = departure_date
    }
    if (arrival_date) {
      newSearchParam.arrival_datetime = arrival_date
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
    handleSearchParams(fieldName, newSortOrder, created_at, departure_date, arrival_date)
  }

  const handleFilterChange = (data: IApplicationListFilters) => {
    const newSearchParam = getOptimizedApplicationListFilters(data)
    setSearchParams(
      Object.keys(newSearchParam).reduce(
        (prev, curr) => ({
          ...prev,
          [curr]: newSearchParam[curr as keyof IApplicationListFilters]?.toString(),
        }),
        {}
      ),
      { replace: true }
    )
  }

  useEffect(() => {
    if (applicationData) {
      setTotalPages(Math.ceil(applicationData.data.total / displayCount))
    }
  }, [displayCount, applicationData])

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
          }}
        >
          <Box sx={{ flex: 1 }}></Box>
          <Typography.Title
            sx={{
              fontWeight: 500,
              fontSize: "24px",
              lineHeight: "1.5rem",
              textAlign: "center",
              flex: 3,
            }}
          >
            {t("application.past_application_list")}
          </Typography.Title>
          <Box display="flex" justifyContent="right" sx={{ flex: 1 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "error.main",
                borderRadius: "0.1875rem",
                p: "0.5625rem",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => {
                navigate(`/application/new`)
              }}
            >
              <Typography.Detail sx={{ textAlign: "center", fontSize: { md: "14px", xs: "10px" } }}>
                {t("application.new_apply")}
              </Typography.Detail>
            </Button>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "text.primary", width: "100%", mt: "1rem" }} />
        <Box
          sx={{
            flexDirection: "column",
            mt: "0.6875rem",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <StudentSearchBox
              initialData={{
                sort,
                student_name,
                category,
                status,
                created_at,
                departure_date,
                arrival_date,
              }}
              handleFilterChange={handleFilterChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: "0.9375rem",
              gap: "1.125rem",
            }}
          >
            <Typography.Detail>{`${
              !applicationData?.data.applications.length ? 0 : displayCount * (page - 1) + 1
            }~${
              !applicationData?.data.applications.length
                ? 0
                : applicationData?.data.applications.length
            } / ${
              !applicationData?.data.total ? 0 : applicationData?.data.total
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
        <ApplicationListTable
          applicationData={applicationData?.data.applications || []}
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
