import { cn } from "@/lib/utils"

import { CollegeForm } from "./college-form"
import { HighSchoolForm } from "./high-school-form"
import { WorkplaceForm } from "./workplace-form"

export const Overview = ({ className }) => {
  return (
    <div className={cn("grid gap-6", className)}>
      <WorkplaceForm />
      <HighSchoolForm />
      <CollegeForm />
    </div>
  )
}
