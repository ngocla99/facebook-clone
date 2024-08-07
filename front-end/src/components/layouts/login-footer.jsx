import { Link } from "react-router-dom"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Plus } from "@/assets/svg"

import { Separator } from "../ui/separator"

export const LoginFooter = ({ className }) => {
  return (
    <footer className={cn("", className)}>
      <div className="flex flex-wrap items-center gap-[10px] pt-2 text-sm text-[#8a8d91]">
        {siteConfig.footerNav.locales.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            target={item?.external ? "_blank" : undefined}
            rel={item?.external ? "noreferrer" : undefined}
            className="hover:underline hover:underline-offset-1"
          >
            {item.title}
          </Link>
        ))}

        <Link
          to=""
          className="flex h-5 items-center rounded-sm border border-[#ccd0d5] bg-[#f5f6f7] px-2 text-sm text-[#4b4f56] transition-all hover:bg-[#ebedf0]"
        >
          <Plus className="size-3" />
        </Link>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-wrap gap-x-5 text-sm text-[#8a8d91]">
        {siteConfig.footerNav.links.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            target={item?.external ? "_blank" : undefined}
            rel={item?.external ? "noreferrer" : undefined}
            className="hover:underline hover:underline-offset-1"
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="my-5">
        <Link to="" className="text-sm text-[#737373]">
          Meta © 2024
        </Link>
      </div>
    </footer>
  )
}
