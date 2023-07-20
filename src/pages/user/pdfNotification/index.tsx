import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Typography } from "src/UILibrary"

import { DetailModal } from "./components/detailModal"

export const UserPDFNotification: React.FC = () => {
  const { t } = useTranslation()

  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false)

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          maxWidth: "974px",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            p: "1.4375rem 1.25rem",
            borderRadius: "9px 9px 0px 0px",
            bgcolor: "background.paper",
          }}
        >
          <Typography.Heading sx={{ fontWeight: 500 }}>
            {t("notification.notification_history")}
          </Typography.Heading>
        </Box>
        <Box
          sx={{
            p: "1.25rem 1.25rem",
            maxHeight: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            overflowY: "scroll",
            bgcolor: "info.dark",
            border: "1px solid",
            borderColor: "primary.contrastText",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)",
          }}
        >
          {new Array(16).fill(0).map((_, index) => (
            <Box key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", gap: { md: "1.25rem", xs: "0.625rem" } }}>
                <Typography.Heading
                  sx={{
                    textAlign: "center",
                    fontWeight: 400,
                    fontSize: { md: "1.5rem", xs: "0.875rem" },
                  }}
                >
                  2022/10/10
                </Typography.Heading>
                <Typography.Heading
                  sx={{
                    textAlign: "center",
                    fontWeight: 400,
                    fontSize: { md: "1.5rem", xs: "0.875rem" },
                  }}
                >
                  タイトル
                </Typography.Heading>
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "secondary.dark",
                  borderRadius: "0.1875rem",
                  p: { md: "0.5625rem 2.625rem", xs: "0.5625rem 1.25rem" },
                  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => setDetailModalOpen(true)}
              >
                <Typography.Detail sx={{ textAlign: "center" }}>
                  {t("meal.details")}
                </Typography.Detail>
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
      <DetailModal open={detailModalOpen} handleDetailModalOpen={setDetailModalOpen} />
    </Box>
  )
}
