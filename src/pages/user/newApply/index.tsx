import React, { useState } from "react"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useQueryClient } from "@tanstack/react-query"
import { MobileDateTimePicker } from "@mui/x-date-pickers"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import {
  AdapterDateFns,
  Box,
  Button,
  Divider,
  LocalizationProvider,
  MenuItem,
  TextField,
  Typography,
} from "src/UILibrary"
import { InputField } from "./components/field/inputField"
import { ConfirmModal } from "./components/modal/confirmModal"
import { SendModal } from "./components/modal/sendModal"

import { CATEGORY_TYPES } from "src/constants/categoryType"
import { Application, CategoryType } from "src/types/application"
import { COMPOINION_LIST } from "src/constants/componion"
import { usePushAlerts } from "src/hooks/alerts"
import { useSession } from "src/modules/sessionProvider"
import * as Validator from "src/modules/validation"
import { useAddApplication } from "src/queries/application"

const validationSchema = Yup.object().shape({
  category: Validator.categorySchema(),
  student_id: Validator.studentNumberSchema(),
  student_name: Validator.studentNameSchema(),
  departure_datetime: Validator.departureDateSchema(),
  departure_companion: Validator.departureCompanionSchema(),
  // departure_detail: Validator.departureDetailSchema(),
  arrival_datetime: Validator.arrivalDateSchema(),
  arrival_companion: Validator.arrivalCompanionSchema(),
  //arrival_detail: Validator.arrivalDetailSchema(),
  content: Validator.contentSchema(),
})

export const NewApply: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const session = useSession()
  const queryClient = useQueryClient()
  const pushAlerts = usePushAlerts()

  const [sendModalOpen, setSendModalOpen] = useState<boolean>(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    trigger,
  } = useForm<Application>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  })

  const departureCompanion = watch("departure_companion")
  const arrivalCompanion = watch("arrival_companion")

  const handleModal = async () => {
    const isValid = await trigger()
    if (isValid === true) {
      setSendModalOpen(true)
    }
  }
  const handleClose = () => {
    setSendModalOpen(false)
    setConfirmModalOpen(true)
  }

  const { mutate: addApplication, isLoading } = useAddApplication({
    onSuccess: () => {
      queryClient.invalidateQueries(["getApplicationList"])
      handleClose()
    },
    onError: (err: AxiosError) => {
      pushAlerts({ message: err.message, color: "error" })
    },
  })

  const onAddApplication: SubmitHandler<Application> = (data) => {
    addApplication({
      data: data,
      token: session?.value.tokenInfo.id_token || "",
    })
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "660px",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={{ mt: "3.75rem" }}>
          <Typography.Heading sx={{ flex: 1, fontWeight: 500, textAlign: "center" }}>
            {t("application.new_apply")}
          </Typography.Heading>
        </Box>
        <Divider sx={{ borderColor: "text.primary", width: "100%", mt: "1rem", mb: "2.25rem" }} />
        <Box
          flexDirection="column"
          sx={{ display: "flex", gap: "2.375rem" }}
          component="form"
          onSubmit={handleSubmit(onAddApplication)}
        >
          <Box flexDirection="column" sx={{ display: "flex", gap: "0.5rem" }}>
            <Controller
              control={control}
              name="category"
              render={({ field: { value, onChange } }) => (
                <InputField label={t("application.category")}>
                  <TextField
                    select
                    sx={{
                      width: "50%",
                      "& .MuiSelect-select": {
                        minHeight: "1.5rem",
                        height: "1.5rem",
                        py: "0.4rem",
                        bgcolor: "background.default",
                      },
                    }}
                    value={value || ""}
                    onChange={onChange}
                    error={!!errors.category}
                    helperText={errors.category && t(`error.${errors.category.message}`)}
                    disabled={isLoading}
                  >
                    {Object.keys(CATEGORY_TYPES).map((categoryType) => (
                      <MenuItem key={categoryType} value={categoryType}>
                        {t(CATEGORY_TYPES[categoryType as CategoryType])}
                      </MenuItem>
                    ))}
                  </TextField>
                </InputField>
              )}
            />
            <Controller
              control={control}
              name="student_id"
              render={({ field }) => (
                <InputField label={t("application.student_number")}>
                  <TextField
                    sx={{ width: "50%" }}
                    defaultValue=""
                    onChange={(e) => {
                      const value = parseInt(e.target.value)
                      field.onChange(value)
                    }}
                    error={!!errors.student_id}
                    helperText={errors.student_id && t(`error.${errors.student_id.message}`)}
                    disabled={isLoading}
                  />
                </InputField>
              )}
            />
            <Controller
              control={control}
              name="student_name"
              render={({ field: { value, onChange } }) => (
                <InputField label={t("application.student_name")}>
                  <TextField
                    sx={{ width: "50%" }}
                    value={value || ""}
                    onChange={onChange}
                    error={!!errors.student_name}
                    helperText={errors.student_name && t(`error.${errors.student_name.message}`)}
                    disabled={isLoading}
                  />
                </InputField>
              )}
            />
          </Box>
          <Box flexDirection="column" sx={{ display: "flex", gap: "0.5rem" }}>
            <Controller
              control={control}
              name="departure_datetime"
              render={({ field }) => (
                <InputField label={t("application.departure_time")}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDateTimePicker
                      minutesStep={30}
                      value={field.value || null}
                      onChange={(date) => {
                        field.onChange(new Date(date as string).toISOString())
                      }}
                      disabled={isLoading}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          sx={{ width: "50%" }}
                          {...params}
                          error={!!errors.departure_datetime}
                          helperText={
                            errors.departure_datetime &&
                            t(`error.${errors.departure_datetime.message}`)
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                </InputField>
              )}
            />
            <Controller
              control={control}
              name="departure_companion"
              render={({ field: { value, onChange } }) => (
                <InputField label={t("application.departure_companion")}>
                  <TextField
                    fullWidth
                    select
                    sx={{
                      width: "50%",
                      "& .MuiSelect-select": {
                        minHeight: "1.5rem",
                        height: "1.5rem",
                        py: "0.4rem",
                        bgcolor: "background.default",
                      },
                    }}
                    value={value || ""}
                    onChange={onChange}
                    error={!!errors.departure_companion}
                    helperText={
                      errors.departure_companion && t(`error.${errors.departure_companion.message}`)
                    }
                    disabled={isLoading}
                  >
                    {COMPOINION_LIST.map((companion) => (
                      <MenuItem key={companion.key} value={companion.key}>
                        {t(companion.label)}
                      </MenuItem>
                    ))}
                  </TextField>
                </InputField>
              )}
            />
            <Controller
              control={control}
              name="departure_detail"
              render={({ field: { value, onChange } }) => (
                <InputField label="">
                  {(departureCompanion === "brother_sister" ||
                    departureCompanion === "relative" ||
                    departureCompanion === "staff" ||
                    departureCompanion === "other") && (
                    <TextField
                      sx={{ width: "50%" }}
                      placeholder={t("application.enter_companion")}
                      value={value || ""}
                      onChange={onChange}
                      error={!!errors.departure_detail}
                      helperText={
                        errors.departure_detail && t(`error.${errors.departure_detail.message}`)
                      }
                      disabled={isLoading}
                    />
                  )}
                </InputField>
              )}
            />
          </Box>
          <Box flexDirection="column" sx={{ display: "flex", gap: "0.5rem" }}>
            <Controller
              control={control}
              name="arrival_datetime"
              render={({ field }) => (
                <InputField label={t("application.return_time")}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDateTimePicker
                      minutesStep={30}
                      value={field.value || null}
                      onChange={(date) => {
                        field.onChange(new Date(date as string).toISOString())
                      }}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          sx={{ width: "50%" }}
                          {...params}
                          error={!!errors.arrival_datetime}
                          helperText={
                            errors.arrival_datetime && t(`error.${errors.arrival_datetime.message}`)
                          }
                          disabled={isLoading}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </InputField>
              )}
            />
            <Controller
              control={control}
              name="arrival_companion"
              render={({ field: { value, onChange } }) => (
                <InputField label={t("application.return_companion")}>
                  <TextField
                    fullWidth
                    select
                    sx={{
                      width: "50%",
                      "& .MuiSelect-select": {
                        minHeight: "1.5rem",
                        height: "1.5rem",
                        py: "0.4rem",
                        bgcolor: "background.default",
                      },
                    }}
                    value={value || ""}
                    onChange={onChange}
                    error={!!errors.arrival_companion}
                    helperText={
                      errors.arrival_companion && t(`error.${errors.arrival_companion.message}`)
                    }
                    disabled={isLoading}
                  >
                    {COMPOINION_LIST.map((companion) => (
                      <MenuItem key={companion.key} value={companion.key}>
                        {t(companion.label)}
                      </MenuItem>
                    ))}
                  </TextField>
                </InputField>
              )}
            />
            <Controller
              control={control}
              name="arrival_detail"
              render={({ field: { value, onChange } }) => (
                <InputField label="">
                  {(arrivalCompanion === "brother_sister" ||
                    arrivalCompanion === "relative" ||
                    arrivalCompanion === "staff" ||
                    arrivalCompanion === "other") && (
                    <TextField
                      sx={{ width: "50%" }}
                      placeholder={t("application.enter_companion")}
                      value={value || ""}
                      onChange={onChange}
                      error={!!errors.arrival_detail}
                      helperText={
                        errors.arrival_detail && t(`error.${errors.arrival_detail.message}`)
                      }
                      disabled={isLoading}
                    />
                  )}
                </InputField>
              )}
            />
          </Box>
          <Box>
            <Controller
              control={control}
              name="content"
              render={({ field: { value, onChange } }) => (
                <InputField label={t("application.application_content")}>
                  <TextField
                    rows={5}
                    id="outlined-multiline-static"
                    multiline
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderRadius: 0.1875,
                          border: "1px solid",
                          borderColor: "secondary.light",
                        },
                      },
                      width: "100%",
                    }}
                    value={value || ""}
                    onChange={onChange}
                    error={!!errors.content}
                    helperText={errors.content && t(`error.${errors.content.message}`)}
                    disabled={isLoading}
                  />
                </InputField>
              )}
            />
            <Controller
              control={control}
              name="type"
              defaultValue={session?.value.user.role}
              render={({ field }) => <TextField sx={{ display: "none" }} value={field.value} />}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              mt: "2.5rem",
              mb: "3.75rem",
            }}
          >
            <Button
              sx={{
                fontWeight: "500",
                lineHeight: "0.875rem",
                color: "secondary.dark",
                p: "0.5625rem 2.375rem",
                mr: "1.25rem",
              }}
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              {t("application.back")}
            </Button>
            <Button
              sx={{
                fontWeight: "500",
                lineHeight: "0.875rem",
                bgcolor: "secondary.dark",
                color: "background.default",
                p: "0.5625rem 2.375rem",
              }}
              variant="contained"
              onClick={handleModal}
              //onClick={() => setSendModalOpen(true)}
            >
              {t("application.send")}
            </Button>
            <SendModal
              isLoading={isLoading}
              open={sendModalOpen}
              handleSendOpen={setSendModalOpen}
              handleConfirmOpen={setConfirmModalOpen}
              handleSubmit={handleSubmit(onAddApplication)}
            />
          </Box>
        </Box>
        <ConfirmModal open={confirmModalOpen} handleConfirmOpen={setConfirmModalOpen} />
      </Box>
    </Box>
  )
}
