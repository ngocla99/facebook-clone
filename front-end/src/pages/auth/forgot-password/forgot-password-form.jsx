import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { forgotPasswordSchema } from "@/lib/validations/auth"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const ForgotPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = () => {}

  return (
    <Form {...form}>
      <form
        className="grid gap-3"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormDescription className="mb-4 text-[17px] leading-[20px]">
                Please enter your email address or mobile number to search for
                your account.
              </FormDescription>
              <FormControl>
                <Input
                  className="color-[#1d2129] border-[#dddfe2]"
                  placeholder="Email address or phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
