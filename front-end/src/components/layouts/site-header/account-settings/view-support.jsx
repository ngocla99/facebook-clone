import { VIEWS } from "."
import { HeadGoBack, SettingItem } from "./components"

export const ViewSupport = ({ setView }) => {
  return (
    <div className="p-2">
      <HeadGoBack
        title="Help & support"
        onBack={() => setView(VIEWS.BASE)}
        className="p-2"
      />
      <div className="mt-1">
        <SettingItem
          title="Help Center"
          icon={<i className="help_center_icon"></i>}
        />
        <SettingItem
          title="Support Inbox"
          icon={<i className="email_icon"></i>}
        />
        <SettingItem
          title="Report a problem"
          icon={<i className="info_filled_icon"></i>}
        />
      </div>
    </div>
  )
}
