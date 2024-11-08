import { cn } from "@/lib/utils"

import { CollegeForm } from "./college-form"
import { CurrentCityForm } from "./current-city-form"
import { HighSchoolForm } from "./high-school-form"
import { HometownForm } from "./hometown-form"
import { RelationshipForm } from "./relationship-form"
import { WorkplaceForm } from "./workplace-form"

export const Overview = ({ className }) => {
  return (
    <div className={cn("grid gap-6", className)}>
      <WorkplaceForm />
      <HighSchoolForm />
      <CollegeForm />
      <CurrentCityForm />
      <HometownForm />
      <RelationshipForm />
    </div>
  )
}
