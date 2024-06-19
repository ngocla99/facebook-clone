import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { VIEWS } from "."
import { HeadGoBack, SettingItem } from "./components"
import { OptionItem } from "./view-display"

export const ViewKeyboard = ({ setView }) => {
  return (
    <div className="p-2">
      <HeadGoBack
        title="Keyboard"
        onBack={() => setView(VIEWS.DISPLAY)}
        className="p-2"
      />
      <div className="mt-1">
        <SettingItem
          title="See all keyboard shortcuts"
          icon={<i className="help_center_icon"></i>}
        />
        <div className="mt-3 flex gap-[6px] px-2">
          <div className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-background-secondary">
            <i className="star_icon"></i>
          </div>
          <div className="space-y-[5px]">
            <div className="pl-[6px]">
              <p className="text-[17px] font-semibold leading-none">
                Use single-character keyboard shortcuts
              </p>
              <p className="text-[15px] text-muted-foreground">
                Use single-character shortcuts to perform common actions.
              </p>
            </div>
            <RadioGroup defaultValue="option-one" className="gap-0">
              <OptionItem htmlFor="option-one">
                <p className="text-[15px] font-semibold">Off</p>
                <RadioGroupItem value="option-one" id="option-one" />
              </OptionItem>
              <OptionItem htmlFor="option-two">
                <p className="text-[15px] font-semibold">On</p>
                <RadioGroupItem value="option-two" id="option-two" />
              </OptionItem>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  )
}
