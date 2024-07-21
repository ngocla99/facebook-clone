import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dots } from "@/assets/svg"

export const CommentActions = ({ onDelete, onEdit }) => {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          className="size-8 self-center text-muted-foreground opacity-0 group-hover:opacity-100"
          variant="ghost"
          size="icon"
        >
          <Dots className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="grid w-[344px] p-2 shadow-xl"
        alignOffset={16}
      >
        <Button
          variant="ghost"
          className="justify-start px-2 text-[15px]"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          className="justify-start px-2 text-[15px]"
          onClick={onDelete}
        >
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  )
}
