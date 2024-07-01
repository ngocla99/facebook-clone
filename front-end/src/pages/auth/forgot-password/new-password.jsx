import React from "react"
import { validateResetCodeApi } from "@/api/services/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"
import { resetCodeSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const NewPassword = ({ data, goBack, goNext }) => {
  const form = useForm({
    resolver: zodResolver(resetCodeSchema),
    defaultValues: {
      code: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <Card className="w-[500px]">
          <CardHeader className="border-b border-[rgba(0,0,0,0.1)] px-[18px] pb-4 text-xl font-bold text-[#162643]">
            Choose a new password
          </CardHeader>
          <CardContent className="grid gap-4 border-b border-[rgba(0,0,0,0.1)] p-[18px] pt-4">
            {/* {errMessage && <MessageBox message={errMessage} />} */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormDescription className="mb-5 text-[17px] leading-[20px]">
                    Create a new password that is at least 6 characters long. A
                    strong password has a combination of letters, digits and
                    punctuation marks.
                  </FormDescription>
                  <div className="grid gap-5">
                    <FormControl>
                      <Input
                        className="color-[#1d2129] border-[#dddfe2]"
                        placeholder="New password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2 p-4">
            <Button
              type="button"
              variant="secondary"
              className="px-5 text-[15px] font-bold"
              onClick={() => navigate("/")}
            >
              Skip
            </Button>
            <Button className="px-5 text-[15px] font-bold">Continue</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
