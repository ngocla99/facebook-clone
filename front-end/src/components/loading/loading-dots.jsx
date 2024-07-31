import { cn } from "@/lib/utils"

export const LoadingDots = ({ className }) => {
  return (
    <div className={cn("flex gap-1", className)}>
      <div className="animate-grow-fb-2 size-2 scale-[0.8] rounded-full bg-[#65676B] opacity-[0.265]"></div>
      <div className="animate-grow-fb-3 size-2 scale-[0.8] rounded-full bg-[#65676B] opacity-[0.265]"></div>
      <div className="animate-grow-fb-6 size-2 scale-[0.8] rounded-full bg-[#65676B] opacity-[0.265]"></div>
    </div>
  )
}
