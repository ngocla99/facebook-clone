import { cn } from "@/lib/utils"

export const MessageBox = ({ type = "error", title, subtitle, className }) => {
  return (
    <div3
      className={cn(
        "overflow-hidden border p-3",
        type === "success" && "border-green-700 bg-green-50",
        type === "error" && "border-[#dd3c10] bg-[#ffebe8]",
        className
      )}
    >
      <p className="text-sm">{title}</p>
      <p className="text-sm">{subtitle}</p>
    </div3>
  )
}
