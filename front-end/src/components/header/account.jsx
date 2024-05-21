import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const Account = () => {
  return (
    <>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  )
}
