import React from "react"
import { useMe } from "@/hooks"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { BioForm } from "../components/profile-intro/bio-form"
import { IntroDetailModal } from "../components/profile-intro/intro-detail"

export const ProfileIntro = ({ className }) => {
  const { data: me } = useMe()

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold leading-none">Intro</h3>
        <div className="mt-[22px] grid gap-[22px]">
          <BioForm bio={me?.details?.bio} />
          <IntroDetailModal />
          <Button variant="secondary">Add featured</Button>
        </div>
      </CardContent>
    </Card>
  )
}
