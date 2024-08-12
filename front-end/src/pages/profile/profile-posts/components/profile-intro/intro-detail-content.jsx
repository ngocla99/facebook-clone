import { useParams } from "react-router-dom"

import { cn } from "@/lib/utils"
import { useProfile } from "@/hooks/use-profile"

export const IntroDetailContent = ({ className }) => {
  const { username } = useParams()
  const { data: user } = useProfile(username)
  const { workplace, currentCity, hometown } = user.details

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="flex items-center justify-center gap-3">
        <img
          src="/icons/profile/workplace.png"
          alt="Work place"
          className="filter-secondary-icon self-start pt-1"
        />
        <div className="flex-1 ">
          <p className="">
            {!workplace[0].isCurrent && workplace[0].position && "Former "}
            {workplace[0].position ||
              (workplace[0].isCurrent ? "Works" : "Worked")}{" "}
            at <strong className="font-semibold">{workplace[0].company}</strong>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <img
          src="/icons/profile/mark.png"
          alt="Work place"
          className="filter-secondary-icon"
        />
        <div className="flex-1 ">
          <p className="">
            Lives <strong className="font-semibold">{currentCity.name}</strong>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <img
          src="/icons/profile/mark.png"
          alt="Work place"
          className="filter-secondary-icon"
        />
        <div className="flex-1 ">
          <p className="">
            From <strong className="font-semibold">{hometown.name}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
