import { getMeApi } from "@/api/services/auth"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/layouts/site-header"

export const AppLayout = ({ children }) => {
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
    select: ({ data }) => data,
  })

  if (!user) return "Loading..."

  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased")}>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 bg-background-comment">{children}</main>
      </div>
    </div>
  )
}
