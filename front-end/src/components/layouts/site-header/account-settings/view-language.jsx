import { VIEWS } from "."
import { HeadGoBack, SettingItem } from "./components"

export const ViewLanguage = ({ setView }) => {
  return (
    <div className="p-2">
      <HeadGoBack
        title="Language"
        onBack={() => setView(VIEWS.SETTINGS)}
        className="p-2"
      />
      <div className="">
        <p className="px-2 py-3 text-[17px] font-medium">Language and region</p>
        <SettingItem
          icon={<i className="fb_language_icon"></i>}
          title="Facebook Language"
          subTitle="English (US)"
          onNext={() => setView(VIEWS.FB_LANGUAGE)}
        />
        <SettingItem
          icon={<i className="settings_filled_icon"></i>}
          title="View All Settings"
        />
      </div>
    </div>
  )
}
