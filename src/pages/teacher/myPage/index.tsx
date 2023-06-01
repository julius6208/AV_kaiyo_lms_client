import React, { useState } from "react"
import { AxiosResponse } from "axios"
import { useTranslation } from "react-i18next"

import { Box, Button, Divider, Image, Paper, Stack, Typography } from "src/UILibrary"

import { IMealMaker, IParentInfo, IStudentInfo, ITeacherInfo } from "src/types/userDetail"
import { useSession } from "src/modules/sessionProvider"
import { useGetTeacherList } from "src/queries/users"
import { formatDate } from "src/modules/date"
import LogoImage from "src/assets/imgs/logo.png"

export const MyPage: React.FC = () => {
  const { t } = useTranslation()
  const session = useSession()

  const [view, setView] = useState<"notification" | "profile">("notification")

  const { data: userData } = useGetTeacherList("", session?.value.user.id as number)
  const switchView = () => {
    setView(view === "notification" ? "profile" : "notification")
  }
  const teacherInfo = userData as AxiosResponse<ITeacherInfo>
  const studentInfo = userData as AxiosResponse<IStudentInfo>
  const parentInfo = userData as AxiosResponse<IParentInfo>
  const mealMakerInfo = userData as AxiosResponse<IMealMaker>

  const renderDescriptionRow = (label: string, text: string | number) => (
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
      ) : session?.value.user.role === "teacher" ? (
        <Stack sx={{ maxWidth: 660, color: "text.primary", width: "100%" }}>
          <Typography.Heading align="center" sx={{ fontWeight: 500, mb: 1.75, letterSpacing: 0 }}>
            {t("mypage.personal_info")}
          </Typography.Heading>

          <Divider sx={{ borderColor: "text.primary", width: "100%", mb: { md: 5, xs: 1.25 } }} />

          <Stack gap={{ md: 2.5, xs: 1.25 }} sx={{ width: "100%", mb: { md: 4, xs: 1.75 } }}>
            {renderDescriptionRow("ID", teacherInfo?.data.teacher.userId || 0)}
            {renderDescriptionRow(t("mypage.name"), teacherInfo?.data.teacher.user.fullName || "")}
            {renderDescriptionRow(
              t("mypage.furigana"),
              teacherInfo?.data.teacher.user.fullNameKana || ""
            )}
            {renderDescriptionRow("e-mail", teacherInfo?.data.teacher.user.email || "")}
            {renderDescriptionRow(
              t("mypage.faculty_staff"),
              t(`user_list.${teacherInfo?.data.teacher.user.role}`)
            )}
            {renderDescriptionRow(
              t("mypage.postal_code"),
              teacherInfo?.data.teacher.postCode || ""
            )}
            {renderDescriptionRow(t("mypage.address"), teacherInfo?.data.teacher.address || "")}
            {renderDescriptionRow(`${t("mypage.phone")}1`, teacherInfo?.data.teacher.phone1 || "")}
            {renderDescriptionRow(`${t("mypage.phone")}2`, teacherInfo?.data.teacher.phone2 || "")}
          </Stack>

          <Typography.Description sx={{ color: "primary.dark" }}>
            {t("mypage.contact_tip")}
          </Typography.Description>
        </Stack>
      ) : session?.value.user.role === "student" ? (
        <Stack sx={{ maxWidth: 660, color: "text.primary", width: "100%" }}>
          <Typography.Heading align="center" sx={{ fontWeight: 500, mb: 1.75, letterSpacing: 0 }}>
            {t("mypage.personal_info")}
          </Typography.Heading>

          <Divider sx={{ borderColor: "text.primary", width: "100%", mb: { md: 5, xs: 1.25 } }} />

          <Stack gap={{ md: 2.5, xs: 1.25 }} sx={{ width: "100%", mb: { md: 4, xs: 1.75 } }}>
            {renderDescriptionRow("ID", studentInfo.data.student.userId || 0)}
            {renderDescriptionRow(t("mypage.name"), studentInfo.data.student.user.fullName || "")}
            {renderDescriptionRow(
              t("mypage.furigana"),
              studentInfo.data.student.user.fullNameKana || ""
            )}
            {renderDescriptionRow("e-mail", studentInfo.data.student.user.email || "")}
            {renderDescriptionRow(
              t("user_list.birth"),
              formatDate(studentInfo.data.student.birthday, "yyyy-MM-dd") || ""
            )}
            {renderDescriptionRow(
              t("user_list.enrolled_sibling"),
              studentInfo.data.student.enrolledSiblings || ""
            )}
            {renderDescriptionRow(
              t("user_list.parent"),
              studentInfo.data.student.Parent.user.fullName || ""
            )}
            {renderDescriptionRow(t("mypage.postal_code"), studentInfo.data.student.postCode || "")}
            {renderDescriptionRow(
              t("mypage.address"),
              "東京都新宿区戸山1-1-1-1111　VIVENタワー101号室"
            )}
            {renderDescriptionRow(`${t("mypage.phone")}`, studentInfo.data.student.phone || "")}
            {renderDescriptionRow(`${t("user_list.grade")}`, studentInfo.data.student.grade || 0)}
            {renderDescriptionRow(
              `${t("user_list.class")}`,
              studentInfo.data.student.learningG || 0
            )}
            {renderDescriptionRow(
              `${t("user_list.house")}`,
              studentInfo.data.student.dormitory || ""
            )}
            {renderDescriptionRow(
              `${t("user_list.extra_activity")}`,
              studentInfo.data.student.Club.name || ""
            )}
            {/* {renderDescriptionRow(`${t("user_list.remark")}`, "テキスト")} */}
          </Stack>

          <Typography.Description sx={{ color: "primary.dark" }}>
            {t("mypage.contact_tip")}
          </Typography.Description>
        </Stack>
      ) : session?.value.user.role === "parent" ? (
        <Stack sx={{ maxWidth: 660, color: "text.primary", width: "100%" }}>
          <Typography.Heading align="center" sx={{ fontWeight: 500, mb: 1.75, letterSpacing: 0 }}>
            {t("mypage.personal_info")}
          </Typography.Heading>

          <Divider sx={{ borderColor: "text.primary", width: "100%", mb: { md: 5, xs: 1.25 } }} />

          <Stack gap={{ md: 2.5, xs: 1.25 }} sx={{ width: "100%", mb: { md: 4, xs: 1.75 } }}>
            {renderDescriptionRow("ID", parentInfo.data.parent.userId || 0)}
            {renderDescriptionRow(t("mypage.name"), parentInfo.data.parent.user.fullName || "")}
            {renderDescriptionRow(
              t("mypage.furigana"),
              parentInfo.data.parent.user.fullNameKana || ""
            )}
            {renderDescriptionRow("e-mail", parentInfo.data.parent.user.email || "")}
            {renderDescriptionRow(
              t("mypage.relationship"),
              parentInfo.data.parent.isMum === true ? "母" : ""
            )}
            {renderDescriptionRow(
              t("user_list.enrolled_student"),
              parentInfo.data.parent.Students || ""
            )}
            {renderDescriptionRow(t("mypage.postal_code"), parentInfo.data.parent.postCode || "")}
            {renderDescriptionRow(t("mypage.address"), parentInfo.data.parent.address || "")}
            {renderDescriptionRow(`${t("mypage.phone")}1`, parentInfo.data.parent.phone1 || "")}
            {renderDescriptionRow(`${t("mypage.phone")}2`, parentInfo.data.parent.phone2 || "")}
          </Stack>

          <Typography.Description sx={{ color: "primary.dark" }}>
            {t("mypage.contact_tip")}
          </Typography.Description>
        </Stack>
      ) : session?.value.user.role === "meal-maker" ? (
        <Stack sx={{ maxWidth: 660, color: "text.primary", width: "100%" }}>
          <Typography.Heading align="center" sx={{ fontWeight: 500, mb: 1.75, letterSpacing: 0 }}>
            {t("mypage.personal_info")}
          </Typography.Heading>

          <Divider sx={{ borderColor: "text.primary", width: "100%", mb: { md: 5, xs: 1.25 } }} />

          <Stack gap={{ md: 2.5, xs: 1.25 }} sx={{ width: "100%", mb: { md: 4, xs: 1.75 } }}>
            {renderDescriptionRow("ID", mealMakerInfo.data.mealMaker.id || 0)}
            {renderDescriptionRow(t("mypage.name"), mealMakerInfo.data.mealMaker.fullName || "")}
            {renderDescriptionRow(
              t("mypage.furigana"),
              mealMakerInfo.data.mealMaker.fullNameKana || ""
            )}
            {renderDescriptionRow("e-mail", mealMakerInfo.data.mealMaker.email || "")}
            {renderDescriptionRow(
              t("mypage.faculty_staff"),
              t(`user_list.${mealMakerInfo.data.mealMaker.role}`)
            )}
          </Stack>

          <Typography.Description sx={{ color: "primary.dark" }}>
            {t("mypage.contact_tip")}
          </Typography.Description>
        </Stack>
      ) : (
        <Stack sx={{ maxWidth: 660, color: "text.primary", width: "100%" }}></Stack>
      )}
    </Box>
  )
}
