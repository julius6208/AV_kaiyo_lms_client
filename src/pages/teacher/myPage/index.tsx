import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Divider, Image, Paper, Stack, Typography } from "src/UILibrary"

import LogoImage from "src/assets/imgs/logo.png"

export const MyPage: React.FC = () => {
  const { t } = useTranslation()
  const [view, setView] = useState<"notification" | "profile">("notification")

  const switchView = () => {
    setView(view === "notification" ? "profile" : "notification")
  }

  const renderDescriptionRow = (label: string, text: string) => (
    <Stack direction="row" gap={{ md: 2.5, xs: 0 }} sx={{ width: "100%" }}>
      <Typography.Description sx={{ width: { md: "100px", xs: "80px", letterSpacing: 0 } }}>
        {label}
      </Typography.Description>
      <Typography.Description sx={{ flex: 1 }}>{text}</Typography.Description>
    </Stack>
  )

  return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
      {view === "notification" ? (
        <Stack alignItems="center" sx={{ maxWidth: 570, width: "100%" }}>
          <Image src={LogoImage} alt="Logo" sx={{ mb: 4 }} />

          <Typography.Title sx={{ fontWeight: 400, fontSize: "2rem", lineHeight: 1, mb: 1 }}>
            {t("mypage.new_notifications")}
          </Typography.Title>

          <Paper
            sx={{
              p: 2.5,
              width: "100%",
              color: "primary.dark",
              borderRadius: "10px",
              boxShadow: "0 1px 1px rgba(0, 0, 0, 0.25)",
              mb: {
                md: 6,
                xs: 3,
              },
            }}
          >
            {Array.from({ length: 5 }).map((_, idx) => (
              <Stack key={idx} direction="row" gap={1} sx={{ py: "5px" }}>
                <Typography.Detail sx={{ lineHeight: "1.25rem", fontWeight: 350 }}>
                  ［2023/2/9］
                </Typography.Detail>
                <Typography.Detail
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  sx={{ lineHeight: "1.25rem", fontWeight: 350 }}
                >
                  ［タイトルテキスト］テキストテキストテキストテキストテキストテキストテキスト
                </Typography.Detail>
              </Stack>
            ))}
          </Paper>
          <Button
            fullWidth
            variant="contained"
            onClick={switchView}
            sx={{
              bgcolor: "secondary.dark",
            }}
          >
            {t("mypage.view_personal_info")}
          </Button>
        </Stack>
      ) : (
        <Stack sx={{ maxWidth: 660, color: "text.primary", width: "100%" }}>
          <Typography.Heading align="center" sx={{ fontWeight: 500, mb: 1.75, letterSpacing: 0 }}>
            {t("mypage.personal_info")}
          </Typography.Heading>

          <Divider sx={{ borderColor: "text.primary", width: "100%", mb: { md: 5, xs: 1.25 } }} />

          <Stack gap={{ md: 2.5, xs: 1.25 }} sx={{ width: "100%", mb: { md: 4, xs: 1.75 } }}>
            {renderDescriptionRow("ID", "K00000001")}
            {renderDescriptionRow(t("mypage.name"), "山田 太郎")}
            {renderDescriptionRow(t("mypage.furigana"), "やまだ たろう")}
            {renderDescriptionRow("e-mail", "aaa@viven.co.jp")}
            {renderDescriptionRow(t("mypage.faculty_staff"), "教諭")}
            {renderDescriptionRow(t("mypage.postal_code"), "0000000")}
            {renderDescriptionRow(
              t("mypage.address"),
              "東京都新宿区戸山1-1-1-1111 VIVENタワー101号室"
            )}
            {renderDescriptionRow(`${t("mypage.phone")}1`, "00000000000")}
            {renderDescriptionRow(`${t("mypage.phone")}2`, "00000000000")}
          </Stack>

          <Typography.Description sx={{ color: "primary.dark" }}>
            {t("mypage.contact_tip")}
          </Typography.Description>
        </Stack>
      )}
    </Box>
  )
}
