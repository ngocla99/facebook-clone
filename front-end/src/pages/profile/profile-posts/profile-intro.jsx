import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const ProfileIntro = ({ className }) => {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold leading-none">Intro</h3>
        <div className="mt-[22px] grid gap-[22px]">
          <Button variant="secondary">Add bio</Button>
          <Button variant="secondary">Edit details</Button>
          <Button variant="secondary">Add featured</Button>
        </div>
      </CardContent>
    </Card>
  )
}
