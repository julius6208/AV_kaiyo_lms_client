import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { CSVLink } from "react-csv"

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
import { getOptimizedStudentListFilters } from "src/modules/filters"
import { IStudentListFilters, IStudentSorts, Student } from "src/types/student"
import { useGetStudentList } from "src/queries/student"
import { useSession } from "src/modules/sessionProvider"

const fields: FieldDefinition<Student>[] = [
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
    width: 70,
  },
  {
    attribute: "fullNameKana",
    sort_field: "full_name_katakana",
    label: "mypage.furigana",
    sort: true,
    width: 100,
  },
  {
    attribute: "birthday",
    sort_field: "birthday",
    label: "user_list.birth",
    width: 90,
    sort: true,
  },
  {
    attribute: "phone",
    label: "mypage.phone",
    width: 80,
  },
  {
    attribute: "postCode",
    sort_field: "post_code",
    label: "mypage.postal_code",
    width: 70,
    sort: true,
  },
  {
    attribute: "address",
    label: "mypage.address",
    width: 120,
  },
  {
    attribute: "grade",
    sort_field: "grade",
    label: "user_list.grade",
    width: 40,
    sort: true,
  },
  {
    attribute: "learningG",
    sort_field: "learning_g",
    label: "user_list.class",
    width: 45,
    sort: true,
  },
  {
    attribute: "attendanceNumber",
    sort_field: "attendance_number",
    label: "user_list.attend_bumber",
    width: 80,
    sort: true,
  },
  {
    attribute: "dormitory",
    sort_field: "dormitory",
    label: "user_list.house",
    sort: true,
    width: 50,
  },
  {
    attribute: "club_name",
    sort_field: "club_id",
    label: "user_list.extra_activity",
    width: 80,
    sort: true,
  },
  {
    attribute: "curriculum",
    label: "user_list.curriculum",
    width: 100,
  },
  {
    attribute: "enrolledSiblings",
    label: "user_list.enrolled_sibling",
    width: 80,
  },
  {
    attribute: "parent_name",
    label: "application.parent",
    width: 80,
  },
  {
    attribute: "parent_phone",
    label: "user_list.parent_phone",
    width: 80,
  },
]

export const StudentList: React.FC = () => {
  const { t } = useTranslation()
  const session = useSession()

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
  const birthday = searchParams.get("birthday") || ""
  const grades = searchParams.get("grades") || ""
  const learningG = searchParams.get("learningG") || ""
  const dormitory = searchParams.get("dormitory") || ""
  const club_id = searchParams.get("club_id") || ""
  const curriculum = searchParams.get("curriculum") || ""
  const enrolledSibling = searchParams.get("enrolledSibling") || ""

  const {
    data: studentData,
    isLoading,
    error,
  } = useGetStudentList(
    page,
    displayCount,
    session?.value.tokenInfo.id_token || "",
    sort,
    ids,
    fullName,
    fullNameKana,
    birthday,
    grades,
    learningG,
    dormitory,
    club_id,
    curriculum,
    enrolledSibling
  )

  const handleSearchParams = (
    sortBy: string,
    sortOrder: string,
    ids: string,
    fullName: string,
    fullNameKana: string,
    birthday: string,
    grades: string,
    learningG: string,
    dormitory: string,
    club_id: string,
    curriculum: string,
    enrolledSibling: string
  ) => {
    const newSearchParam: Partial<IStudentSorts> = {}
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
    if (birthday) {
      newSearchParam.birthday = birthday
    }
    if (grades) {
      newSearchParam.grade = grades
    }
    if (learningG) {
      newSearchParam.learningG = learningG
    }
    if (dormitory) {
      newSearchParam.dormitory = dormitory
    }
    if (club_id) {
      newSearchParam.club_id = club_id
    }
    if (curriculum) {
      newSearchParam.curriculum = curriculum
    }
    if (enrolledSibling) {
      newSearchParam.enrolledSibling = enrolledSibling
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
    handleSearchParams(
      fieldName,
      newSortOrder,
      ids,
      fullName,
      fullNameKana,
      birthday,
      grades,
      learningG,
      dormitory,
      club_id,
      curriculum,
      enrolledSibling
    )
  }

  const handleFilterChange = (data: IStudentListFilters) => {
    const newSearchParam = getOptimizedStudentListFilters(data)
    setSearchParams(
      Object.keys(newSearchParam).reduce(
        (prev, curr) => ({
          ...prev,
          [curr]: newSearchParam[curr as keyof IStudentListFilters]?.toString(),
        }),
        {}
      ),
      { replace: true }
    )
  }

  useEffect(() => {
    if (studentData) {
      setTotalPages(Math.ceil(studentData.data.total / displayCount))
    }
  }, [displayCount, studentData])

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
          width: "auto",
          height: "100%",
          overflowX: "auto",
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
                birthday,
                grades,
                learningG,
                dormitory,
                club_id,
                curriculum,
                enrolledSibling,
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
                !studentData?.data.students.length ? 0 : displayCount * (page - 1) + 1
              }~${!studentData?.data.students.length ? 0 : studentData?.data.students.length} / ${
                !studentData?.data.total ? 0 : studentData?.data.total
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
          <CSVLink data={studentData?.data.students || ""} filename="student.csv">
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
        <UserTable<Student>
          fields={fields}
          content={studentData?.data.students || []}
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
