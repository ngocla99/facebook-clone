import { cn } from "@/lib/utils"

const messageStyles = {
  success: "border-green-700 bg-green-50",
  error: "border-[#dd3c10] bg-[#ffebe8]"
}

export const MessageBox = ({ type = "error", title, subtitle, className }) => {
  return (
    <div
      className={cn(
        "overflow-hidden border p-3",
        messageStyles[type],
        className
      )}
    >
      <p className="text-sm">{title}</p>
      <p className="text-sm">{subtitle}</p>
    </div>
  )
}
