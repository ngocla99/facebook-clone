import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { MuiInput } from "@/components/input/mui-input"

export const FormInput = ({ name, control, label, ...props }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <MuiInput label={label} {...field} {...props} />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
