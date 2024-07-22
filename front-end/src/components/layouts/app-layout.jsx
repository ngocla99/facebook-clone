import { getMeApi } from "@/api/services/user"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/layouts/site-header"

export const AppLayout = ({ children }) => {
  const { isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
  })

  // TODO: loading UI
  if (isLoading) return "Loading..."

  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased")}>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 bg-background-comment">{children}</main>
      </div>
    </div>
  )
}
