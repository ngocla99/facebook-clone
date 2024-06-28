import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import { ForgotPasswordForm } from "./forgot-password-form"

export const ForgotPassword = () => {
  return (
    <div className="grid place-items-center bg-background-secondary px-10 pb-28 pt-[72px]">
      <Card className="w-[500px]">
        <CardHeader className="border-b border-[rgba(0,0,0,0.1)] px-[18px] pb-4 text-xl font-bold text-[#162643]">
          Find Your Account
        </CardHeader>
        <CardContent className="border-b border-[rgba(0,0,0,0.1)] p-[18px] pt-4">
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4">
          <Button variant="secondary" className="px-5 text-[15px] font-bold">
            Cancel
          </Button>
          <Button className="px-5 text-[15px] font-bold">Search</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
