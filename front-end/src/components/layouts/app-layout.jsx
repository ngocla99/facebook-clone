import { getMeApi } from "@/api/services/user"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/layouts/site-header"

import { LoadingPage } from "../loading/loading-page"

export const AppLayout = ({ children }) => {
  const { isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
  })

  if (isLoading) return <LoadingPage />

  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased")}>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 bg-background-comment">{children}</main>
      </div>
    </div>
  )
}
