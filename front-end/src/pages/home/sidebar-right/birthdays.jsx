import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export const Birthdays = ({ className }) => {
  return (
    <div className={cn("grid", className)}>
      <div className="mx-2 flex h-9 items-center justify-between">
        <h3 className="text-[17px] font-semibold text-muted-foreground">
          Birthdays
        </h3>
      </div>
      <Button
        variant="ghost"
        size="lg"
        className="flex h-auto min-h-[52px] items-center justify-start gap-2 px-2"
      >
        <i className="gift_icon"></i>
        <p className="whitespace-normal text-muted-foreground">
          <strong>Nemo</strong> and <strong>Lanh</strong> have birthdays today.
        </p>
      </Button>
    </div>
  )
}
