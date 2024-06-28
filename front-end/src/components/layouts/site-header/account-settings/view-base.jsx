import { useAuth } from "@/providers/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { VIEWS } from "."
import { InfoFooter } from "../../info-footer"
import { SettingItem } from "./components"

export const ViewBase = ({ setView }) => {
  const { clearToken } = useAuth()

  return (
    <div className="pt-3">
      <Card className="m-4 mt-0 shadow-xl">
        <CardContent className="grid p-0">
          <div className="m-1 flex h-[60px] items-center gap-2 rounded-lg p-2 hover:bg-hover">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-[17px] font-semibold">Lan Anh</p>
          </div>
          <div className="mx-4">
            <Separator />
          </div>
          <div className="p-3">
            <Button className="w-full" variant="secondary">
              See your profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="px-2">
        <SettingItem
          icon={<i className="settings_filled_icon"></i>}
          title="Settings & privacy"
          onNext={() => setView(VIEWS.SETTINGS)}
        />
        <SettingItem
          icon={<i className="help_filled_icon"></i>}
          title="Help & support"
          onNext={() => setView(VIEWS.SUPPORT)}
        />
        <SettingItem
          icon={<i className="dark_filled_icon"></i>}
          title="Display & Accessibility"
          onNext={() => setView(VIEWS.DISPLAY)}
        />
        <SettingItem
          icon={<i className="report_filled_icon"></i>}
          title="Give feedback"
        />
        <SettingItem
          icon={<i className="logout_filled_icon"></i>}
          title="Logout"
          onClick={clearToken}
        />
      </div>
      <InfoFooter className="p-4" />
    </div>
  )
}
