import { FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const FormSelect = ({
  name,
  control,
  label,
  hidden,
  options,
  props,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={hidden && "hidden"}>
          <Select
            value={field.value?.toString()}
            onValueChange={field.onChange}
            defaultValue="null"
            {...props}
          >
            <FormControl>
              <SelectTrigger className="min-w-[82px]">
                <SelectValue placeholder={label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="min-w-[328px]">
              <SelectItem value="null">{label}</SelectItem>
              {options.map((itm) => (
                <SelectItem key={itm.value} value={itm.value.toString()}>
                  {itm.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}
