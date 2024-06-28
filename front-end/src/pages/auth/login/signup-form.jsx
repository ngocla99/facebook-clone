import React from "react"
import { signUpApi } from "@/api/services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"
import { signUpSchema } from "@/lib/validations/auth"
import { useAuth } from "@/providers/auth-provider"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import LoadingButton from "@/components/button/loading-button"
import { PasswordInput } from "@/components/password-input"

const yearOptions = Array.from(
  new Array(120),
  (val, index) => new Date().getFullYear() - index
)

const monthOptions = Array.from(new Array(12), (val, index) => 1 + index)

const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "custom", label: "Custom" },
]

export const SignUpForm = ({ className }) => {
  const { setToken } = useAuth()
  const navigate = useNavigate()
  const [messageRes, setMessageRes] = React.useState()
  const [dayOptions, setDayOptions] = React.useState(
    Array.from(
      new Array(getDays(new Date().getFullYear(), new Date().getMonth() + 1)),
      (val, index) => 1 + index
    )
  )

  // react-hook-form
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      bYear: new Date().getFullYear().toString(),
      bMonth: (new Date().getMonth() + 1).toString(),
      bDay: new Date().getDate().toString(),
      gender: "",
    },
  })

  React.useEffect(() => {
    const year = form.getValues("bYear")
    const month = form.getValues("bMonth")
    setDayOptions(
      Array.from(new Array(getDays(year, month)), (val, index) => 1 + index)
    )
  }, [form.getValues("bYear"), form.getValues("bMonth")])

  const signUpMutation = useMutation({
    mutationFn: signUpApi,
    onSuccess: ({ data }) => {
      const { message, ...rest } = data
      setMessageRes({
        type: "success",
        message,
      })
      setTimeout(() => {
        setToken(rest.token)
        navigate("/")
      }, 2000)
    },
    onError: (err) => {
      setMessageRes({
        type: "error",
        message: err.response.data.message,
      })
    },
  })

  function getDays(year, month) {
    return new Date(year, month, 0).getDate()
  }

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    if (signUpMutation.isLoading) return
    signUpMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid gap-3", className)}
        onSubmit={(...args) =>
          form.handleSubmit(onSubmit, (err) => {
            console.log(err)
          })(...args)
        }
      >
        {messageRes && (
          <div
            className={cn(
              "mt-3 overflow-hidden border   px-[3px] py-[7px] text-center",
              messageRes.type === "success" && "border-green-700 bg-green-50",
              messageRes.type === "error" && "border-[#dd3c10] bg-[#ffebe8]"
            )}
          >
            <p className="text-xs">{messageRes.message}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-[10px]">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="color-[#1d2129] border-[#dddfe2] bg-[#f5f6f7]"
                    placeholder="First Name"
                    size="sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="color-[#1d2129] border-[#dddfe2] bg-[#f5f6f7]"
                    placeholder="Surname"
                    size="sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <Input
                    className="color-[#1d2129] border-[#dddfe2] bg-[#f5f6f7]"
                    placeholder="Mobile number and email address"
                    size="sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <PasswordInput
                    className="border-[#dddfe2] bg-[#f5f6f7] text-[#ddfe2]"
                    placeholder="New Password"
                    size="sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormLabel className="flex items-center gap-1 text-xs leading-5 text-[#606770]">
            Date of birth
            <Popover>
              <PopoverTrigger className="flex">
                <i className="info_icon"></i>
              </PopoverTrigger>
              <PopoverContent
                side="left"
                sideOffset={20}
                align="start"
                className="w-[356px] p-3 shadow-xl"
              >
                <p className="text-[13px] text-[#65676B]">
                  <strong>Providing your birthday</strong> helps make sure that
                  you get the right Facebook experience for your age. If you
                  want to change who sees this, go to the About section of your
                  profile. For more details, please visit our{" "}
                  <Link
                    className="text-[#1877F2] hover:underline hover:underline-offset-1"
                    to=""
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </PopoverContent>
            </Popover>
          </FormLabel>
          <div className="grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="bDay"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value.toString()}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl
                      error={
                        form.formState.errors.birthDate ? "true" : undefined
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a birth day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dayOptions.map((itm) => (
                        <SelectItem key={itm} value={itm.toString()}>
                          {itm}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bMonth"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value.toString()}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl
                      error={
                        form.formState.errors.birthDate ? "true" : undefined
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a birth month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {monthOptions.map((itm) => (
                        <SelectItem key={itm} value={itm.toString()}>
                          {itm}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bYear"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value.toString()}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl
                      error={
                        form.formState.errors.birthDate ? "true" : undefined
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a birth year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yearOptions.map((itm) => (
                        <SelectItem key={itm} value={itm.toString()}>
                          {itm}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          {!!form.formState.errors.birthDate && (
            <p className="mt-2 text-[0.8rem] font-medium text-destructive">
              {form.formState.errors.birthDate.message}
            </p>
          )}
        </div>
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="flex items-center gap-1 text-xs leading-5 text-[#606770]">
                Gender
                <Popover>
                  <PopoverTrigger className="flex">
                    <i className="info_icon"></i>
                  </PopoverTrigger>
                  <PopoverContent
                    side="left"
                    sideOffset={20}
                    align="start"
                    className="w-[356px] p-3 shadow-xl"
                  >
                    <p className="text-[13px] text-[#65676B]">
                      You can change who sees your gender on your profile later.
                      Select Custom to choose another gender, or if you&#39;d
                      rather not say.
                    </p>
                  </PopoverContent>
                </Popover>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-3 gap-3"
                >
                  {genderOptions.map((itm) => (
                    <FormItem
                      key={itm.value}
                      className="group relative flex items-center space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem
                          size="sm"
                          value={itm.value}
                          className="absolute right-[10px] border-muted-foreground group-hover:border-[#1c1e21]"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel className="h-full w-full rounded-sm border border-[#ccd0d5] pl-[10px] pr-7 text-[15px] font-normal leading-9 text-[#1c1e21] aria-invalid:border-destructive aria-invalid:focus:ring-red-100">
                          {itm.label}
                        </FormLabel>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage className="!mt-2" />
            </FormItem>
          )}
        />
        <FormDescription className="text-[11px] text-[#777] text-muted-foreground">
          People who use our service may have uploaded your contact information
          to Facebook. Learn more.
        </FormDescription>
        <FormDescription className="text-[11px] text-[#777] text-muted-foreground">
          By clicking Sign Up, you agree to our Terms, Privacy Policy and
          Cookies Policy. You may receive SMS notifications from us and can opt
          out at any time.
        </FormDescription>
        <div className="flex justify-center py-[10px]">
          <LoadingButton
            className="h-9 min-w-[194px] bg-[#00a400] from-[#79bc64] to-[#578843] px-8 text-[18px] hover:bg-gradient-to-b"
            size="lg"
            loading={signUpMutation.isPending}
          >
            Sign Up
            <span className="sr-only">Sign Up</span>
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
