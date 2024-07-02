import React from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { OptionItem } from "@/components/layouts/site-header/account-settings/view-display"

const optionsLogin = {
  LOG_OUT_ALL: "log_out_all",
  STAY_LOGGED_IN: "stay_logged_in",
}

export const PasswordChanged = () => {
  const navigate = useNavigate()
  const [methodLogin, setMethodLogin] = React.useState(
    optionsLogin.STAY_LOGGED_IN
  )

  const onConfirm = () => {
    if (methodLogin === optionsLogin.LOG_OUT_ALL) {
      //TODO:
    }
    if (methodLogin === optionsLogin.STAY_LOGGED_IN) {
    }
    navigate("/")
  }

  return (
    <div className="flex h-[calc(100vh-56px)] items-start justify-center">
      <Card className="mt-[88px] w-[558px]">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Password changed</CardTitle>
          <CardDescription className="text-[15px]">
            If you think someone else may have known your old password, it's a
            good idea to log out of any other phones and computers and check for
            recent changes to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-[10px] pb-0">
          <RadioGroup
            defaultValue={optionsLogin.STAY_LOGGED_IN}
            className="gap-0"
            onValueChange={setMethodLogin}
          >
            <OptionItem htmlFor={optionsLogin.LOG_OUT_ALL}>
              <div className="grid gap-[5px]">
                <p className="text-[15px] font-semibold">
                  Log out of other devices
                </p>
                <span className="text-[13px] font-normal text-muted-foreground">
                  We'll help you check for recent changes next.
                </span>
              </div>
              <RadioGroupItem
                value={optionsLogin.LOG_OUT_ALL}
                id={optionsLogin.LOG_OUT_ALL}
              />
            </OptionItem>
            <OptionItem htmlFor={optionsLogin.STAY_LOGGED_IN}>
              <p className="text-[15px] font-semibold">Stay logged in</p>
              <RadioGroupItem
                value={optionsLogin.STAY_LOGGED_IN}
                id={optionsLogin.STAY_LOGGED_IN}
              />
            </OptionItem>
          </RadioGroup>
        </CardContent>
        <CardFooter className="justify-end p-3">
          <Button onClick={onConfirm}>Continue</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
