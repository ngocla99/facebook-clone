import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Return } from "@/assets/svg"

export const SettingItem = ({
  icon,
  title,
  subTitle,
  onNext,
  className,
  ...props
}) => {
  return (
    <Button
      size="xl"
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 whitespace-normal text-left",
        className
      )}
      {...(onNext ? { onClick: onNext } : {})}
      {...props}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background-secondary">
        {icon}
      </div>
      <div className="flex flex-1 flex-col justify-center gap-[5px]">
        <p className="font-semibold leading-none">{title}</p>
        <span className="text-sm leading-none text-muted-foreground">
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
      <Button
        variant="ghost"
        className="size-9 p-0"
        size="icon"
        onClick={onBack}
      >
        <Return className="text-[#65676b]" />
      </Button>
      <h2 className="text-2xl font-[700] leading-[36px]">{title}</h2>
    </div>
  )
}
