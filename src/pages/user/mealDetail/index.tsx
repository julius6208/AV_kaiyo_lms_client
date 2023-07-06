import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { FieldDefinition } from "src/components/mealTable"
import { Modal } from "src/components/modal"
import { Box, Button, DialogTitle, IconButton, Typography } from "src/UILibrary"
import { MealDetailTable } from "src/components/mealDetailTable"
import { CloseIcon } from "src/assets/icons/CloseIcon"

import { useGetMealDetail } from "src/queries/meal"
import { Meals, Menu } from "src/types/meal"
import { AxiosError, AxiosResponse } from "axios"
import { useSession } from "src/modules/sessionProvider"

interface ApplicationModalProps {
  mealId: number
  open: boolean
  // eslint-disable-next-line no-unused-vars
  handleMealDetailOpen: (open: boolean) => void
  mealDate: string
}

const fields: FieldDefinition<Menu>[] = [
  {
    attribute: "title",
    label: "meal.menu_name",
    width: 200,
  },
  {
    attribute: "energy",
    label: "meal.energy",
  },
  {
    attribute: "protein",
    label: "meal.protein",
  },
  {
    attribute: "lipid",
    label: "meal.lipid",
  },
  {
    attribute: "saltiness",
    label: "meal.salt",
  },
]

export const MealDetailModal: React.FC<ApplicationModalProps> = ({
  mealId,
  open,
  handleMealDetailOpen,
  mealDate,
}) => {
  const { t } = useTranslation()
  const session = useSession()

  const getYear = new Date(mealDate).getFullYear()
  const getMonth = new Date(mealDate).getMonth()
  const getDay = new Date(mealDate).getDate()

  const [mealDetailData, setMealDetailData] = useState<Meals>()
  const [error, setError] = useState<string>("")

  const { mutate: getDetailData, isLoading } = useGetMealDetail({
    onSuccess: (res: AxiosResponse<Meals>) => {
      setMealDetailData(res.data)
    },
    onError: (err: AxiosError) => {
      setError(err.message)
    },
  })

  useEffect(() => {
    if (mealId !== 0) {
      getDetailData({ token: session?.value.tokenInfo.id_token || "", id: mealId })
    }
  }, [getDetailData, mealId, session])

  const handleClose = () => {
    handleMealDetailOpen(false)
  }

  return (
    <Modal handleClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          px: "0.5rem",
        }}
      >
        <Box sx={{ display: "flex", flex: 6, justifyContent: "center" }}>
          <Typography.Title sx={{ color: "text.secondary", fontWeight: 400 }}>
            {`${getYear}年${getMonth + 1}月${getDay}日`}
          </Typography.Title>
          <Typography.Title sx={{ color: "text.secondary", fontWeight: 400, ml: "0.5rem" }}>
            {t("meal.breakfast")}
          </Typography.Title>
        </Box>
        <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              display: { md: "block", xs: "none" },
              position: "absolute",
              color: "secondary.dark",
              top: 0,
              right: "0.5rem",
            }}
          >
            <CloseIcon width="18" height="18" />
          </IconButton>
          <Button
            variant="contained"
            sx={{
              display: { md: "none", xs: "block" },
              borderRadius: "0.1875rem",
              color: "background.paper",
              bgcolor: "secondary.dark",
              p: "0.3rem 0.5rem",
            }}
            onClick={handleClose}
          >
            <Typography.Action
              sx={{
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {t("application.back_list")}
            </Typography.Action>
          </Button>
        </Box>
      </DialogTitle>
      <MealDetailTable
        fields={fields}
        content={mealDetailData?.menus || []}
        isLoading={isLoading}
        error={error}
      />
    </Modal>
  )
}
