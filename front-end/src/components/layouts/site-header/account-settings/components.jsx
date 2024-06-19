import { Return } from "@/svg"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export const SettingItem = ({ icon, title, subTitle, onNext, className }) => {
  return (
    <Button
      size="xl"
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 whitespace-normal text-left",
        className
      )}
      {...(onNext ? { onClick: onNext } : {})}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background-secondary">
        {icon}
      </div>
      <div className="flex flex-1 flex-col justify-center gap-[5px]">
        <p className="text-[15px] font-semibold leading-none">{title}</p>
        <span className="text-[13px] leading-none text-muted-foreground">
          {subTitle}
        </span>
      </div>
      {onNext && (
        <div className="">
          <i className="right_icon"></i>
        </div>
      )}
    </Button>
  )
}

export const HeadGoBack = ({ title, onBack, className }) => {
  return (
    <div className={cn("flex items-center gap-[10px]", className)}>
      <Button variant="ghost" className="w-9 rounded-full p-0" onClick={onBack}>
        <Return className="text-[#65676b]" />
      </Button>
      <h2 className="text-2xl font-[700] leading-[36px]">{title}</h2>
    </div>
  )
}
