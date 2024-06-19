import { VIEWS } from "."
import { HeadGoBack, SettingItem } from "./components"

export const ViewSettings = ({ setView }) => {
  return (
    <div className="p-2">
      <HeadGoBack
        title="Settings & privacy"
        onBack={() => setView(VIEWS.BASE)}
        className="p-2"
      />
      <div className="">
        <SettingItem
          icon={<i className="settings_filled_icon"></i>}
          title="Settings"
        />
        <SettingItem
          icon={<i className="language_icon"></i>}
          title="Language"
          onNext={() => setView(VIEWS.LANGUAGE)}
        />
        <SettingItem
          icon={<i className="privacy_checkup_icon"></i>}
          title="Privacy Checkup"
        />
        <SettingItem
          icon={<i className="privacy_shortcuts_icon"></i>}
          title="Privacy Center"
        />
        <SettingItem
          icon={<i className="activity_log_icon"></i>}
          title="Activity log"
        />
        <SettingItem icon={<i className="feed_icon"></i>} title="Feed" />
      </div>
    </div>
  )
}
