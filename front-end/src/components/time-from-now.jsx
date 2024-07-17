import moment from "moment"

import {
  CONFIG_RELATIVE_TIME_DEFAULT,
  CONFIG_RELATIVE_TIME_SHORT,
} from "@/lib/moment"
import { cn } from "@/lib/utils"

export const TimeFromNow = ({ type = "default", time, className }) => {
  let timeText = moment(time).fromNow()

  if (type === "short") {
    moment.updateLocale("en", {
      relativeTime: CONFIG_RELATIVE_TIME_SHORT,
    })
    timeText = moment(time).fromNow()
  }

  moment.updateLocale("en", {
    relativeTime: CONFIG_RELATIVE_TIME_DEFAULT,
  })

  return <p className={cn("", className)}>{timeText}</p>
}
