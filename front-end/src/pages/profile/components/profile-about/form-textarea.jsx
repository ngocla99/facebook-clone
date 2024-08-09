import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { MuiTextarea } from "@/components/textarea/mui-textarea"

export const FormTextarea = ({ name, control, label, ...props }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <MuiTextarea label={label} {...field} {...props} />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
