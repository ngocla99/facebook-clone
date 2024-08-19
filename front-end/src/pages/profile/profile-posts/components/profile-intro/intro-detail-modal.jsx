import React from "react"
import { updateProfileApi } from "@/api/services/user"
import { useMe } from "@/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { hiddenDetailsSchema } from "@/lib/validations/about"
import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Modal } from "@/components/ui/modal"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"

export const IntroDetailModal = () => {
  const queryClient = useQueryClient()
  const { data: me } = useMe()
  const hiddenDetails = me.details.hiddenDetails

  const [showIntroDetailModal, setShowIntroDetailModal] = React.useState(false)
  const { workplace, currentCity, hometown } = me.details

  const form = useForm({
    resolver: zodResolver(hiddenDetailsSchema),
    defaultValues: {
      hiddenDetails: [],
    },
  })

  React.useEffect(() => {
    if (!hiddenDetails) return
    form.reset({ hiddenDetails })
  }, [hiddenDetails])

  const updateProfileMutation = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      queryClient.invalidateQueries({ queryKey: ["user"] })
      setShowIntroDetailModal(false)
    },
  })

  const onSubmit = (data) => {
    if (updateProfileMutation.isPending) return
    updateProfileMutation.mutate({
      "details.hiddenDetails": data.hiddenDetails,
    })
  }

  return (
    <>
      <Button variant="secondary" onClick={() => setShowIntroDetailModal(true)}>
        Edit details
      </Button>
      <Modal
        className="w-auto p-0 sm:w-[700px]"
        showModal={showIntroDetailModal}
        onClose={() => setShowIntroDetailModal(false)}
      >
        <DialogHeader className="flex h-[60px] items-center justify-center border-b border-border">
          <DialogTitle>Edit details</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="hiddenDetails"
              render={({ field }) => {
                const handleChangeField = (key, value) => {
                  let hiddenArr = [...field.value]
                  if (value) {
                    hiddenArr = hiddenArr.filter((itm) => itm !== key)
                  } else {
                    hiddenArr.push(key)
                  }
                  field.onChange(hiddenArr)
                }

                return (
                  <FormItem>
                    <FormControl>
                      <ScrollArea className="h-[676px] px-7 py-5">
                        <p className="text-muted-foreground">
                          Details you select will be{" "}
                          <strong className="font-semibold">Public</strong> and
                          appear at the top of your profile.
                        </p>
                        <div className="mt-[30px] grid gap-5">
                          <h3 className="text-lg font-semibold leading-none">
                            Pronouns
                          </h3>
                          <IntroLink to="" title="Add pronouns" />
                        </div>
                        <div className="mt-[30px] grid gap-5">
                          <h3 className="text-lg font-semibold leading-none">
                            Work
                          </h3>
                          {workplace ? (
                            workplace.map((itm, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3"
                              >
                                <Switch
                                  id={`workplace-${idx}`}
                                  checked={!field.value.includes("workplace")}
                                  onCheckedChange={(value) =>
                                    handleChangeField("workplace", value)
                                  }
                                />
                                <Label
                                  htmlFor={`workplace-${idx}`}
                                  className="text-base font-normal"
                                >
                                  {!itm.isCurrent && itm.position && "Former "}
                                  {itm.position ||
                                    (itm.isCurrent ? "Works" : "Worked")}{" "}
                                  at {itm.company}
                                </Label>
                                <Link
                                  to=""
                                  className="ml-auto grid place-content-center"
                                >
                                  <i className="edit_icon_20 filter-primary-icon"></i>
                                </Link>
                              </div>
                            ))
                          ) : (
                            <IntroLink to="" title="Add current city" />
                          )}
                          <IntroLink to="" title="Add a workplace" />
                        </div>
                        <div className="mt-[30px] grid gap-5">
                          <h3 className="text-lg font-semibold leading-none">
                            Education
                          </h3>
                          <IntroLink to="" title="Add high school" />
                          <IntroLink to="" title="Add college" />
                        </div>
                        <div className="mt-[30px] grid gap-5">
                          <h3 className="text-lg font-semibold leading-none">
                            Current city
                          </h3>
                          {currentCity ? (
                            <div className="flex items-center gap-3">
                              <Switch
                                id="currentCity"
                                checked={!field.value.includes("currentCity")}
                                onCheckedChange={(value) =>
                                  handleChangeField("currentCity", value)
                                }
                              />
                              <Label
                                htmlFor="currentCity"
                                className="text-base font-normal"
                              >
                                Lives in {currentCity.name}
                              </Label>
                              <Link
                                to=""
                                className="ml-auto grid place-content-center"
                              >
                                <i className="edit_icon_20 filter-primary-icon"></i>
                              </Link>
                            </div>
                          ) : (
                            <IntroLink to="" title="Add current city" />
                          )}
                        </div>
                        <div className="mt-[30px] grid gap-5">
                          <h3 className="text-lg font-semibold leading-none">
                            Hometown
                          </h3>
                          {hometown ? (
                            <div className="flex items-center gap-3">
                              <Switch
                                id="hometown"
                                checked={!field.value.includes("hometown")}
                                onCheckedChange={(value) =>
                                  handleChangeField("hometown", value)
                                }
                              />
                              <Label
                                htmlFor="hometown"
                                className="text-base font-normal"
                              >
                                From {hometown.name}
                              </Label>
                              <Link to="" className="ml-auto">
                                <i className="edit_icon_20 filter-primary-icon grid place-content-center"></i>
                              </Link>
                            </div>
                          ) : (
                            <IntroLink to="" title="Add hometown" />
                          )}
                        </div>
                        <h3 className="mt-[30px] text-lg font-semibold leading-none">
                          Relationship
                        </h3>
                        <IntroLink
                          to=""
                          title="Add a relationship status"
                          className="mt-5"
                        />
                        <h3 className="mt-[30px] text-lg font-semibold leading-none">
                          Joined Facebook
                        </h3>
                        <div className="mt-5 flex gap-3">
                          <Switch
                            id="created-date"
                            checked={!field.value.includes("createdDate")}
                            onCheckedChange={(value) =>
                              handleChangeField("createdDate", value)
                            }
                          />
                          <div className="">
                            <Label
                              htmlFor="created-date"
                              className="text-base font-normal"
                            >
                              Joined{" "}
                              {new Date(me.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                }
                              )}
                            </Label>
                            {field.value.includes("createdDate") !==
                              hiddenDetails.includes("createdDate") &&
                              (hiddenDetails.includes("createdDate") ? (
                                <p className="text-sm leading-none text-muted-foreground">
                                  Will show at the top of your profile and still
                                  Public
                                </p>
                              ) : (
                                <p className="text-sm leading-none text-muted-foreground">
                                  Won't show at the top of your profile but
                                  still Public
                                </p>
                              ))}
                          </div>
                        </div>
                      </ScrollArea>
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <DialogFooter className="border-t border-border p-4">
              <div className="flex w-full justify-between flex-wrap gap-2">
                <Button variant="deemphasized" className="bg-transparent">
                  Update Your Information
                </Button>
                <div className="flex gap-2 ml-auto">
                  <Button
                    variant="secondary"
                    onClick={() => setShowIntroDetailModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="w-[112px]">Save</Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </Modal>
    </>
  )
}

const IntroLink = ({ to, title, className }) => {
  return (
    <div className={cn("group flex items-center gap-3", className)}>
      <i className="rounded_plus_icon filter-accent"></i>
      <Link
        to={to}
        className="text-primary group-hover:underline group-hover:underline-offset-2"
      >
        {title}
      </Link>
    </div>
  )
}
