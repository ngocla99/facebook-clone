import { useMe } from "@/hooks"
import { useParams } from "react-router-dom"

import { useProfile } from "@/hooks/use-profile"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { BioForm } from "./components/profile-intro/bio-form"
import { IntroDetailContent } from "./components/profile-intro/intro-detail-content"
import { IntroDetailModal } from "./components/profile-intro/intro-detail-modal"

export const ProfileIntro = ({ className }) => {
  const { username } = useParams()
  const { data: user } = useProfile(username)

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold leading-none">Intro</h3>
        <div className="mt-[22px] grid">
          <div className="grid gap-4">
            <p className="text-center leading-none">{user?.details?.bio}</p>
            {!user.isVisitor && <BioForm bio={user?.details?.bio} />}
          </div>
          <div className="mt-4 grid gap-1">
            <IntroDetailContent />
            {!user.isVisitor && <IntroDetailModal />}
          </div>
          {!user.isVisitor && (
            <Button variant="secondary" className="mt-[22px]">
              Add featured
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
