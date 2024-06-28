import { ArrowTooltip } from "@/assets/svg"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const InfoFooter = ({ className }) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-1 text-xs text-[#8a8d91]",
        className
      )}
    >
      <Link
        to=""
        target="_blank"
        rel="noreferrer"
        className="hover:underline hover:underline-offset-1"
      >
        Privacy
      </Link>
      <span className=""> · </span>
      <Link
        to=""
        target="_blank"
        rel="noreferrer"
        className="hover:underline hover:underline-offset-1"
      >
        Terms
      </Link>
      <span className=""> · </span>
      <Link
        to=""
        target="_blank"
        rel="noreferrer"
        className="hover:underline hover:underline-offset-1"
      >
        Advertising
      </Link>
      <span className=""> · </span>
      <Link
        to=""
        target="_blank"
        rel="noreferrer"
        className="hover:underline hover:underline-offset-1"
      >
        Ad Choices
        <i className="ad_choices_icon ml-[6px]"></i>
      </Link>
      <span className=""> · </span>
      <Link
        to=""
        target="_blank"
        rel="noreferrer"
        className="hover:underline hover:underline-offset-1"
      >
        Cookies
      </Link>
      <span className=""> · </span>
      <Popover>
        <PopoverTrigger>More</PopoverTrigger>
        <PopoverContent
          side="top"
          sideOffset={16}
          className="relative flex flex-col p-2 shadow-3xl"
        >
          {["about", "careers", "developers", "help"].map((el) => (
            <Link
              key={el}
              className="rounded-sm px-2 py-3 text-[15px] font-semibold capitalize hover:bg-hover"
            >
              {el}
            </Link>
          ))}
          <ArrowTooltip className="absolute left-[calc(50%-12.5px)] top-[calc(100%-1px)] text-card" />
        </PopoverContent>
      </Popover>
      <span className=""> · </span>
      <p>Meta © 2024</p>
    </div>
  )
}
