import { useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Return } from "@/assets/svg"
import { SendRequestModal } from '../components/send-request-modal'

export const Left = ({ className }) => {
  const navigate = useNavigate()

  return (
    <div className={cn("pt-5", className)}>
      <div className="flex items-center gap-2 px-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-9 text-muted-foreground"
          onClick={() => navigate(-1)}
        >
          <Return />
        </Button>
        <div className="">
          <p className="text-sm text-muted-foreground">Friends</p>
          <h3 className="text-xl font-bold leading-none">Friend Requests</h3>
        </div>
      </div>
      <div className="mt-2 px-4">
        <p className="text-lg font-semibold">Friend Requests</p>
        <SendRequestModal />
        <div className="mt-5">
          <p className="text-sm leading-none text-muted-foreground">
            No new requests
          </p>
        </div>
      </div>
    </div>
  )
}
