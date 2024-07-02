import * as React from "react"
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const PasswordInput = React.forwardRef(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        autoComplete="false"
        className={cn("pr-10", className)}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="lg"
        className={cn(
          "absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent",
          props.value === "" || (props.disabled && "hidden")
        )}
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <EyeNoneIcon
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        ) : (
          <EyeOpenIcon
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
