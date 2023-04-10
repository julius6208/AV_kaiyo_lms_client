import { format } from "date-fns"

export const formatDate = (date: string, formatString: string) => {
  return format(new Date(date), formatString)
}
