import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { VIEWS } from "."
import { HeadGoBack, SettingItem } from "./components"

export const ViewDisplay = ({ setView }) => {
  return (
    <div className="p-2">
      <HeadGoBack
        title="Display & accessibility"
        onBack={() => setView(VIEWS.BASE)}
        className="p-2"
      />
      <div className="mt-2 space-y-3">
        {/* dark mode */}
        <div className="flex gap-[6px] px-2">
          <div className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-background-secondary">
            <i className="dark_filled_icon"></i>
          </div>
          <div className="space-y-[5px]">
            <div className="pl-[6px]">
              <p className="text-lg font-semibold leading-none">
                Dark mode
              </p>
              <p className="text-muted-foreground">
                Adjust the appearance of Facebook to reduce glare and give your
                eyes a break.
              </p>
            </div>
            <RadioGroup defaultValue="option-one" className="gap-0">
              <OptionItem htmlFor="option-one">
                <p className="font-semibold">Off</p>
                <RadioGroupItem value="option-one" id="option-one" />
              </OptionItem>
              <OptionItem htmlFor="option-two">
                <p className="font-semibold">On</p>
                <RadioGroupItem value="option-two" id="option-two" />
              </OptionItem>
              <OptionItem htmlFor="option-3">
                <div className="grid gap-[5px]">
                  <p className="font-semibold">Automatic</p>
                  <span className="text-xs text-muted-foreground">
                    We’ll automatically adjust the display based on your
                    device’s system settings.
                  </span>
                </div>
                <RadioGroupItem value="option-3" id="option-3" />
              </OptionItem>
            </RadioGroup>
          </div>
        </div>
        {/* compact mode */}
        <div className="flex gap-[6px] px-2">
          <div className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-background-secondary">
            <i className="compact_mode_icon"></i>
          </div>
          <div className="space-y-[5px]">
            <div className="pl-[6px]">
              <p className="text-lg font-semibold leading-none">
                Compact mode
              </p>
              <p className="text-muted-foreground">
                Make your font size smaller so more content can fit on the
                screen.
              </p>
            </div>
            <RadioGroup defaultValue="option-one" className="gap-0">
              <OptionItem htmlFor="option-one">
                <p className="font-semibold">Off</p>
                <RadioGroupItem value="option-one" id="option-one" />
              </OptionItem>
              <OptionItem htmlFor="option-two">
                <p className="font-semibold">On</p>
                <RadioGroupItem value="option-two" id="option-two" />
              </OptionItem>
            </RadioGroup>
          </div>
        </div>
        {/* show previews of links */}
        <div className="flex gap-[6px] px-2">
          <div className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-background-secondary">
            <i className="pointer_icon"></i>
          </div>
          <div className="space-y-[5px]">
            <div className="pl-[6px]">
              <p className="text-lg font-semibold leading-none">
                Show previews of links
              </p>
              <p className="text-muted-foreground">
                Without opening a page to a person, event, or group, show info
                and actions in a preview window.
              </p>
            </div>
            <RadioGroup defaultValue="option-one" className="gap-0">
              <OptionItem htmlFor="option-one">
                <p className="font-semibold">
                  Show preview when hovering pointer over link
                </p>
                <RadioGroupItem value="option-one" id="option-one" />
              </OptionItem>
              <OptionItem htmlFor="option-two">
                <div className="grid gap-[5px]">
                  <p className="font-semibold">
                    Show preview after clicking
                  </p>
                  <span className="text-xs text-muted-foreground">
                    We’ll automatically adjust the display based on your
                    device’s system settings.
                  </span>
                </div>
                <RadioGroupItem value="option-two" id="option-two" />
              </OptionItem>
              <OptionItem htmlFor="option-three">
                <p className="font-semibold">
                  Don&#39;t show preview
                </p>
                <RadioGroupItem value="option-three" id="option-three" />
              </OptionItem>
            </RadioGroup>
          </div>
        </div>
        <SettingItem
          title="Keyboard"
          icon={<i className="keyboard_icon"></i>}
          onNext={() => setView(VIEWS.KEYBOARD)}
        />
      </div>
    </div>
  )
}

export const OptionItem = ({ className, children }) => {
  return (
    <Label
      className={cn(
        "flex min-h-[44px] items-center justify-between gap-[18px] rounded-lg p-[6px] hover:bg-hover",
        className
      )}
    >
      {children}
    </Label>
  )
}
