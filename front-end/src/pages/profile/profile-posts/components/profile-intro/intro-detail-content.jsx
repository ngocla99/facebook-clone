import { useParams } from "react-router-dom"

import { cn } from "@/lib/utils"
import { useProfile } from "@/hooks/use-profile"

export const IntroDetailContent = ({ className }) => {
  const { username } = useParams()
  const { data: user } = useProfile(username)

  if (!user.details) return null

  const { workplace, currentCity, hometown, hiddenDetails } = user.details

  const isShowing = (key) => !(hiddenDetails ?? []).includes(key)

  return (
    <div className={cn("grid gap-4 [&>div:last-child]:pb-1", className)}>
      {isShowing("workplace") && workplace.length > 0 && (
        <div className="flex items-center justify-center gap-3">
          <img
            src="/icons/profile/workplace_20.png"
            alt="Work place"
            className="filter-placeholder-icon self-start py-1.5"
          />
          <div className="flex-1 ">
            <p className="">
              {!workplace[0].isCurrent && workplace[0].position && "Former "}
              {workplace[0].position ||
                (workplace[0].isCurrent ? "Works" : "Worked")}{" "}
              at{" "}
              <strong className="font-semibold">{workplace[0].company}</strong>
            </p>
          </div>
        </div>
      )}
      {isShowing("currentCity") && currentCity && (
        <div className="flex items-center justify-center gap-3">
          <img
            src="/icons/profile/mark_20.png"
            alt="Work place"
            className="filter-placeholder-icon py-1.5"
          />
          <div className="flex-1 ">
            <p className="">
              Lives{" "}
              <strong className="font-semibold">{currentCity.name}</strong>
            </p>
          </div>
        </div>
      )}
      {isShowing("hometown") && hometown && (
        <div className="flex items-center justify-center gap-3">
          <img
            src="/icons/profile/mark_20.png"
            alt="Work place"
            className="filter-placeholder-icon py-1.5"
          />
          <div className="flex-1 ">
            <p className="">
              From <strong className="font-semibold">{hometown.name}</strong>
            </p>
          </div>
        </div>
      )}
      {isShowing("createdDate") && user.createdAt && (
        <div className="flex items-center justify-center gap-3">
          <img
            src="/icons/profile/date_20.png"
            alt="Work place"
            className="filter-placeholder-icon py-1.5"
          />
          <div className="flex-1 ">
            <p className="">
              Joined{" "}
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
