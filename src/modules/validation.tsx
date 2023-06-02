import * as Yup from "yup"

export const categorySchema = () => {
  return Yup.string().required("required")
}

export const studentNumberSchema = () => {
  return Yup.number().required("required").typeError("invalid_number")
}

export const studentNameSchema = () => {
  return Yup.string()
    .required("required")
    .min(1, "invalid_student_name_length")
    .max(150, "invalid_student_name_length")
}

export const departureDateSchema = () => {
  return Yup.string()
    .required("required")
    .min(1, "invalid_departure_date_length")
    .max(150, "invalid_departure_date_length")
}

export const departureCompanionSchema = () => {
  return Yup.string()
    .required("required")
    .min(1, "invalid_departure_companion_length")
    .max(100, "invalid_departure_companion_length")
}

export const departureDetailSchema = () => {
  return Yup.string()
    .required("required")
    .min(1, "invalid_departure_detail_length")
    .max(150, "invalid_departure_detail_length")
}

export const arrivalDateSchema = () => {
  return Yup.string()
    .required("required")
    .min(1, "invalid_arrival_date_length")
    .max(150, "invalid_arrival_date_length")
}

export const arrivalCompanionSchema = () => {
  return Yup.string()
    .required("required")
    .min(1, "invalid_arrival_companion_length")
    .max(150, "invalid_arrival_companion_length")
}

export const arrivalDetailSchema = () => {
  return Yup.string()
    .required("required")
    .min(1, "invalid_arrival_detail_length")
    .max(150, "invalid_arrival_detail_length")
}

export const contentSchema = () => {
  return Yup.string().required("required")
}
