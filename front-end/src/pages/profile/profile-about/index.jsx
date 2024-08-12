import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Overview } from "./components/overview"

const overviewTabs = [
  {
    params: "about_overview",
    title: "Overview",
  },
  {
    params: "about_work_and_education",
    title: "Work and education",
  },
  {
    params: "about_places",
    title: "Places lived",
  },
  {
    params: "about_contact_and_basic_info",
    title: "Contact and basic info",
  },
  {
    params: "about_family_and_relationships",
    title: "Family and relationships",
  },
  {
    params: "about_details",
    title: "Details about you",
  },
  {
    params: "about_life_events",
    title: "Life events",
  },
]

export const ProfileAbout = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div className={cn("container mb-[22px] mt-4 px-4", className)}>
      <div className="mx-2 grid gap-4">
        <Card>
          <CardContent className="grid grid-cols-[288px_1fr] p-0">
            <div className="border-r border-border px-1.5 py-4">
              <h3 className="px-[10px] pb-5 text-xl font-bold leading-none">
                About
              </h3>
              <div className="grid gap-2">
                {overviewTabs.map((itm) => (
                  <Button
                    key={itm.params}
                    variant={
                      searchParams.get("sk") === itm.params ||
                      (itm.params === "about_overview" &&
                        !searchParams.get("sk"))
                        ? "deemphasized"
                        : "ghost"
                    }
                    className={cn("active:scale-1 justify-start")}
                    onClick={() => setSearchParams(`sk=${itm.params}`)}
                  >
                    {itm.title}
                  </Button>
                ))}
              </div>
            </div>
            <div className="p-[16px_32px_32px_16px]">
              <Overview />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
