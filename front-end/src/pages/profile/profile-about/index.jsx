import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Overview } from "../components/profile-about/overview"

export const ProfileAbout = ({ className }) => {
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
                <Button variant="ghost" className="justify-start">
                  Overview
                </Button>
                <Button variant="ghost" className="justify-start">
                  Work and education
                </Button>
                <Button variant="ghost" className="justify-start">
                  Places lived
                </Button>
                <Button variant="ghost" className="justify-start">
                  Contact and basic info
                </Button>
                <Button variant="ghost" className="justify-start">
                  Family and relationships
                </Button>
                <Button variant="ghost" className="justify-start">
                  Details about you
                </Button>
                <Button variant="ghost" className="justify-start">
                  Life events
                </Button>
              </div>
            </div>
            <div className="px-4 py-8">
              <Overview />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
