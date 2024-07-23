import { getMeApi } from "@/api/services/user"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useNavigation } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layouts/site-header"
import { EmptyPage } from "@/assets/svg"

const PageNotFound = () => {
  const navigate = useNavigate()
  const { isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
  })

  if (isLoading) return null

  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased")}>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="grid flex-1 place-items-center bg-background-comment">
          <div className="flex w-[500px] flex-col items-center justify-center p-6 text-center">
            <EmptyPage className="size-[112px]" />
            <h3 className="text-xl font-bold leading-6 text-muted-foreground">
              This content isn't available at the moment
            </h3>
            <p className="text-[17px] leading-5 text-muted-foreground">
              When this happens, it's usually because the owner only shared it
              with a small group of people or changed who can see it, or it's
              been deleted.
            </p>
            <Button
              className="mt-6 h-10 w-[212px] text-[17px] font-semibold"
              onClick={() => navigate("/", { replace: true })}
            >
              Go to News Feed
            </Button>
            <Button
              variant="ghost"
              className="mt-3 h-5 text-[17px] font-semibold text-[#0064d1] hover:bg-transparent hover:text-[#0064d1] hover:underline hover:underline-offset-1"
              onClick={() => navigate(-1)}
            >
              Go back
            </Button>
            <Button
              variant="ghost"
              className="mt-2 h-5 text-[17px] font-semibold text-[#0064d1] hover:bg-transparent hover:text-[#0064d1] hover:underline hover:underline-offset-1"
              disabled
            >
              Visit Help Center
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default PageNotFound