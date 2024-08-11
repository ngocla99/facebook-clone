import { cn } from "@/lib/utils"

export const LoadingDot = ({ className }) => {
  return (
    <div className={cn("flex gap-1", className)}>
      <div className="size-2 scale-[0.8] animate-grow-fb-2 rounded-full bg-[#65676B] opacity-[0.265]"></div>
    </div>
  )
}
