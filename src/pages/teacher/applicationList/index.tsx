import React, { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, MenuItem, Select, SelectChangeEvent, Typography } from "src/UILibrary"
import { ApplicationListTable } from "src/components/applicationTable"
import { ApproveModal } from "./components/modal/approveModal"
import { ApplicationModal } from "./components/modal/applicationModal"
import { ProxyModal } from "./components/modal/proxyModal"
import { DenyModal } from "./components/modal/denyModal"
import { SearchBox } from "./components/searchBox"

import { PAGE_SIZE } from "src/constants/common"
import { Application } from "src/types/application"
import { MOCK_APPLICATION_DATA } from "./mockdata"

const applicationData: Application[] = MOCK_APPLICATION_DATA

export const TeacherApplication: React.FC = () => {
  const { t } = useTranslation()
  const [displayCount, setDisplayCount] = useState<number>(PAGE_SIZE[0])
  const [applicationModalOpen, setApplicationModalOpen] = useState<boolean>(false)
  const [application, setApplication] = useState<Application>()
  const [checkedApplications, setCheckedApplications] = useState<Application[]>([])
  const [denyModalOpen, setDenyModalOpen] = useState<boolean>(false)
  const [approveModalOpen, setApproveModalOpen] = useState<boolean>(false)
  const [proxyModalOpen, setProxyModalOpen] = useState<boolean>(false)

  const handleEdit = (row: Application) => {
    setApplication(row)
    setApplicationModalOpen(true)
  }

  const approvedValues = useMemo(
    () => checkedApplications.filter((item) => item.checked === true),
    [checkedApplications]
  )

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
            pr: "2rem",
            borderRadius: "9px 9px 0px 0px",
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography.Title sx={{ fontWeight: 500, fontSize: "24px", lineHeight: "1.5rem" }}>
            {t("application.new_notification_list")}
          </Typography.Title>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "secondary.dark",
              borderRadius: "0.5625rem",
              mt: "0.8125rem",
              mb: "0.8125rem",
            }}
            onClick={() => setProxyModalOpen(true)}
          >
            <Typography.Title
              sx={{ fontWeight: 500, fontSize: "20px", textAlign: "center", lineHeight: "1.5rem" }}
            >
              {t("application.proxy_application")}
            </Typography.Title>
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "0.6875rem",
            pr: "2rem",
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
              backgroundColor: "secondary.dark",
              borderRadius: "0.5625rem",
              mt: "2.125rem",
            }}
            onClick={() => setApproveModalOpen(true)}
          >
            <Typography.Title
              sx={{ fontWeight: 500, fontSize: "20px", textAlign: "center", lineHeight: "1.5rem" }}
            >
              {t("application.bulk_approval")}
            </Typography.Title>
          </Button>
        </Box>
        <ApplicationListTable
          applicationData={applicationData}
          onEdit={handleEdit}
          setApplications={setCheckedApplications}
          pagination={{ count: 10, currentPage: 1 }}
        />
      </Box>
      <ApplicationModal
        open={applicationModalOpen}
        handleApplicationOpen={setApplicationModalOpen}
        application={application}
        handleDenyOpen={setDenyModalOpen}
      />
      <DenyModal
        open={denyModalOpen}
        handleDenyOpen={setDenyModalOpen}
        registNumber={application?.id}
      />
      <ApproveModal
        open={approveModalOpen}
        handleApproveOpen={setApproveModalOpen}
        checkedApplicationDatas={approvedValues}
      />
      <ProxyModal open={proxyModalOpen} handleProxyOpen={setProxyModalOpen} />
    </Box>
  )
}
