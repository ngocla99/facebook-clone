import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/layouts/site-header"

export const AppLayout = ({ children }) => {
  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased")}>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 bg-background-comment">{children}</main>
      </div>
    </div>
  )
}
