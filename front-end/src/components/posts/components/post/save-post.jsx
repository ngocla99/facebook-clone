import React from "react"
import { getCollectionsApi } from "@/api/services/collection"
import { savePostApi, unSavePostApi } from "@/api/services/post"
import { useMe } from "@/hooks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { useProfile } from "@/hooks/use-profile"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Modal } from "@/components/ui/modal"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { MuiInput } from "@/components/input/mui-input"
import { Plus } from "@/assets/svg"

export const SavePost = ({ postId, setOpen }) => {
  const { data: me } = useMe()
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = React.useState(false)
  const [isNewCollection, setIsNewCollection] = React.useState(false)
  const [selectedCollection, setSelectedCollection] = React.useState(null)
  const inputRef = React.useRef(null)

  const { data: collections } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollectionsApi,
    select: (data) => {
      if (data.length === 0) return [{ _id: "forLater", name: "For later" }]
      return data
    },
  })

  React.useEffect(() => {
    setSelectedCollection(collections?.[0]?._id)
  }, [collections])

  const savePostMutation = useMutation({
    mutationFn: savePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      queryClient.invalidateQueries({ queryKey: ["me"] })
    },
    onSettled: () => {
      setShowModal(false)
      setOpen(false)
    },
  })

  const unSavePostMutation = useMutation({
    mutationFn: unSavePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      queryClient.invalidateQueries({ queryKey: ["me"] })
    },
  })

  const handleSavePost = () => {
    if (savePostMutation.isPending) return
    if (isNewCollection) {
      return savePostMutation.mutate({
        postId,
        collectionName: inputRef.current.value,
      })
    }

    savePostMutation.mutate({
      postId,
      collectionId: selectedCollection,
    })
  }

  const handleUnSavePost = () => {
    if (unSavePostMutation.isPending) return
    setOpen(false)
    unSavePostMutation.mutate({ postId })
  }

  const isPostSaved = React.useMemo(
    () => me.savedPosts.some((itm) => itm.post === postId),
    [me]
  )

  return (
    <>
      <Button
        variant="ghost"
        className="h-auto items-start justify-start gap-3 p-2 text-left"
        onClick={() => {
          if (isPostSaved) return handleUnSavePost()
          setShowModal(true)
        }}
      >
        <i className="save_icon filter-primary-icon pt-2"></i>
        {isPostSaved ? (
          <div className="-mt-[1px] space-y-1">
            <p className="leading-none">Unsave post</p>
            <p className="text-xs font-normal leading-none text-muted-foreground">
              Remove this from your saved items
            </p>
          </div>
        ) : (
          <div className="-mt-[1px] space-y-1">
            <p className="leading-none">Save post</p>
            <p className="text-xs font-normal leading-none text-muted-foreground">
              Add this to your saved items.
            </p>
          </div>
        )}
      </Button>
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        className="w-[548px] p-0 drop-shadow"
      >
        <DialogHeader className="flex h-[60px] items-center justify-center border-b border-border px-4">
          <DialogTitle>Save To</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="">
          <RadioGroup
            className="gap-0 px-2 pt-2"
            defaultValue={selectedCollection}
            onValueChange={(value) => {
              setSelectedCollection(value)
            }}
          >
            {(collections ?? []).map((itm) => (
              <Label
                key={itm._id}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-[64px] justify-start gap-3 p-2"
                )}
                htmlFor={itm._id}
              >
                <div className="grid size-12 place-items-center overflow-hidden rounded-lg border border-border bg-primary">
                  {itm._id === "forLater" ? (
                    <span className="text-2xl font-bold text-white">F</span>
                  ) : (
                    <img src={me.picture} />
                  )}
                </div>
                <div className="grid flex-1 gap-1.5">
                  <p className="text-lg font-medium leading-none">{itm.name}</p>
                  <div className="flex items-center gap-2">
                    <img
                      src="/icons/size/12/private.png"
                      alt="private"
                      className="filter-secondary-icon"
                    />
                    <span className="text-base font-normal text-muted-foreground">
                      Only me
                    </span>
                  </div>
                </div>
                <RadioGroupItem
                  className="my-1 self-start"
                  value={itm._id}
                  id={itm._id}
                />
              </Label>
            ))}
          </RadioGroup>
        </div>
        <div className="px-4">
          <Separator className="my-2" />
        </div>
        {isNewCollection ? (
          <div className="px-4">
            <MuiInput
              ref={inputRef}
              label="Name"
              placeholder="Give your name collection..."
              autoFocus
            />
          </div>
        ) : (
          <>
            <div className="grid px-2">
              <Button
                className="h-[64px] justify-start px-2 text-lg"
                variant="ghost"
                size="xl"
                onClick={() => setIsNewCollection(true)}
              >
                <div className="mr-3 grid size-12 place-items-center rounded-lg bg-background-secondary">
                  <Plus />
                </div>
                New Collection
              </Button>
            </div>
            <div className="px-4">
              <Separator className="my-2" />
            </div>
          </>
        )}
        {isNewCollection ? (
          <div className="flex justify-end gap-2 pb-3 pr-4 pt-1">
            <Button
              key="cancel"
              variant="ghost"
              className="text-primary"
              onClick={() => setIsNewCollection(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSavePost}>Create</Button>
          </div>
        ) : (
          <div className="flex justify-end pb-3 pr-4 pt-1">
            <Button key="done" className="w-[116px]" onClick={handleSavePost}>
              Done
            </Button>
          </div>
        )}
      </Modal>
    </>
  )
}
