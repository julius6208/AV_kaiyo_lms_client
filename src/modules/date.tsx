import { format } from "date-fns"

export const formatDate = (date: string, formatString: string) => {
  return format(new Date(date), formatString)
}

export const formattedDate = (dateString: string) => {
  if (dateString) {
    const dateObj = new Date(dateString)
    const newFormattedDate =
      `${(dateObj.getMonth() + 1).toString().padStart(2, "0")}-` +
      `${dateObj.getDate().toString().padStart(2, "0")}-` +
      `${dateObj.getFullYear().toString().padStart(4, "0")} ` +
      `${dateObj.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`
    return newFormattedDate
  }
}
