import { FromMeta, Logo } from "@/assets/svg"

export const LoadingPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center">
      <div className="grid flex-1 place-items-center">
        <Logo className="size-20 text-primary" />
      </div>
      <FromMeta className="pb-5" />
    </div>
  )
}
