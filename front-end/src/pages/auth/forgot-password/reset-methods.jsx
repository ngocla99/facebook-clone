import { sendResetPasswordCodeApi } from "@/api/services/auth"
import { useMutation } from "@tanstack/react-query"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const ResetMethods = ({ data, goNext, goBack }) => {
  const { picture, email, firstName, lastName } = data

  const sendResetPasswordCodeMutation = useMutation({
    mutationFn: sendResetPasswordCodeApi,
    onSuccess: () => {
      goNext()
    },
  })

  const handleConfirm = () => {
    if (sendResetPasswordCodeMutation.isPending) return
    sendResetPasswordCodeMutation.mutate({ email })
  }

  return (
    <Card className="w-[500px]">
      <CardHeader className="border-b border-[rgba(0,0,0,0.1)] px-[18px] pb-4 text-xl font-bold text-[#162643]">
        Reset Your Password
      </CardHeader>
      <CardContent className="flex items-center border-b border-[rgba(0,0,0,0.1)] p-[18px] pt-4">
        <div className="w-3/5">
          <h3 className="mb-5 text-lg leading-5">
            How do you want to receive the code to reset your password?
          </h3>
          <RadioGroup defaultValue="email" className="gap-0">
            <Label
              className="flex gap-3 rounded-lg p-[6px] hover:bg-hover"
              htmlFor="google-account"
            >
              <RadioGroupItem
                value="google-account"
                id="google-account"
                disabled={true}
              />
              <div className="space-y-1">
                <p className="leading-5">Use my Google account</p>
                <p className="text-sm leading-4">
                  Log in to Google (if you aren't already) to quickly reset your
                  password.
                </p>
              </div>
            </Label>
            <Label
              className="flex gap-3 rounded-lg p-[6px] hover:bg-hover"
              htmlFor="email"
            >
              <RadioGroupItem value="email" id="email" />
              <div className="space-y-1">
                <p className="leading-5">Send code via email</p>
                <p className="text-sm leading-4">{email}</p>
              </div>
            </Label>
            <Label
              className="flex gap-3 rounded-lg p-[6px] hover:bg-hover"
              htmlFor="facebook"
            >
              <RadioGroupItem value="facebook" id="facebook" disabled={true} />
              <div className="space-y-1">
                <p className="leading-5">Send code via Facebook notification</p>
                <p className="text-sm leading-4">
                  You're logged in on another app or device. Get a notification
                  with a login code.
                </p>
              </div>
            </Label>
            <Label
              className="flex gap-3 rounded-lg p-[6px] hover:bg-hover"
              htmlFor="sms"
            >
              <RadioGroupItem value="sms" id="sms" disabled={true} />
              <div className="space-y-1">
                <p className="leading-5">Send code via SMS</p>
                <p className="text-sm leading-4">+*********13</p>
              </div>
            </Label>
            <Label
              className="flex gap-3 rounded-lg p-[6px] hover:bg-hover"
              htmlFor="password"
            >
              <RadioGroupItem value="password" id="password" disabled={true} />
              <div className="space-y-1">
                <p className="leading-5">Enter Password to Log In</p>
              </div>
            </Label>
          </RadioGroup>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <Avatar className="mb-4 size-[60px]">
            <AvatarImage src={picture} alt="nm" />
            <AvatarFallback>NM</AvatarFallback>
          </Avatar>
          <p className="leading-5">{firstName + " " + lastName}</p>
          <span className="text-sm leading-4 text-muted-foreground">
            Facebook user
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4">
        <Button variant="secondary" className="px-5 font-bold" onClick={goBack}>
          Not you?
        </Button>
        <Button className="px-5 font-bold" onClick={handleConfirm}>
          Continue
        </Button>
      </CardFooter>
    </Card>
  )
}
