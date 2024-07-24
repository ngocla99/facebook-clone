import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "@/assets/svg"

export const CreateStory = () => {
  return (
    <Card>
      <CardContent className="grid p-2">
        <Button
          variant="ghost"
          className="h-[56px] justify-start gap-3 text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EBF5FF]">
            <Plus className="text-primary" />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-[5px]">
            <p className="text-lg font-semibold leading-none">
              Create story
            </p>
            <span className="font-normal leading-none text-muted-foreground">
              Share a photo or write something.
            </span>
          </div>
        </Button>
      </CardContent>
    </Card>
  )
}
