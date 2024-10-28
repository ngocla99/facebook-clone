import React from "react"
import {
  addPostToCollectionApi,
  getCollectionsApi,
} from "@/api/services/collection"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { MuiInput } from "@/components/input/mui-input"
import { Plus } from "@/assets/svg"

export const AddToCollectionModal = ({ showModal, setShowModal, postId }) => {
  const [isNewCollection, setIsNewCollection] = React.useState(false)
  const [collectionName, setCollectionName] = React.useState("")
  const queryClient = useQueryClient()

  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollectionsApi,
  })

  const addPostToCollectionMutation = useMutation({
    mutationFn: addPostToCollectionApi,
    onSuccess: (_, { collectionName }) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
      queryClient.invalidateQueries({ queryKey: ["me"] })
      toast({ title: `Saved to ${collectionName}` })
    },
    onError: (err) => {
      toast({ title: err.response.data.message })
    },
  })

  if (isLoading) return <div>Loading...</div>

  const handleAddToCollection = (collectionName) => {
    if (addPostToCollectionMutation.isPending) return
    addPostToCollectionMutation.mutate({ collectionName, postId })
  }

  function onClose() {
    setShowModal(false)
    setCollectionName("")
    setIsNewCollection(false)
  }

  if (!showModal) return null

  return (
    <Modal
      showModal={showModal}
      onClose={onClose}
      className="w-[548px] p-0 drop-shadow"
    >
      <DialogHeader className="flex h-[60px] items-center justify-center border-b border-border px-4">
        <DialogTitle>
          {isNewCollection ? "Create Collection" : "Add to Collection"}
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      {isNewCollection ? (
        <>
          <div className="px-4 py-5">
            <MuiInput
              label="Name"
              placeholder="Give your name collection..."
              autoFocus
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </div>
          <DialogFooter className="p-4">
            <Button
              variant="deemphasized"
              className="bg-transparent"
              onClick={() => setIsNewCollection(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleAddToCollection(collectionName)}
              variant="secondary"
              disabled={!collectionName}
              className="px-10"
            >
              Create
            </Button>
          </DialogFooter>
        </>
      ) : (
        <>
          <div className="grid gap-2 p-2">
            {(collections ?? []).map((itm) => (
              <Button
                key={itm.name}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-[64px] justify-start gap-3 p-2"
                )}
                disabled={addPostToCollectionMutation.isPending}
                onClick={() => handleAddToCollection(itm.name)}
              >
                <div
                  className={cn(
                    "grid size-12 place-items-center overflow-hidden rounded-lg border border-border",
                    itm._id === "forLater" && "bg-primary"
                  )}
                >
                  {itm._id === "forLater" ? (
                    <span className="text-2xl font-bold text-white">F</span>
                  ) : (
                    <img
                      src={
                        itm.posts[0]?.post?.images[0]?.url ??
                        "https://placehold.co/400x400?text=No+Image"
                      }
                    />
                  )}
                </div>
                <div className="grid flex-1 gap-1.5">
                  <p className="text-left text-lg font-medium leading-none">
                    {itm.name}
                  </p>
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
              </Button>
            ))}
          </div>
          <Separator className="my-2" />
          <div className="grid px-2 pb-2">
            <Button
              className="h-[64px] justify-start px-2 text-lg"
              variant="ghost"
              size="xl"
              onClick={() => setIsNewCollection(true)}
            >
              <div className="mr-3 grid size-10 place-items-center rounded-full bg-background-secondary">
                <Plus />
              </div>
              New Collection
            </Button>
          </div>
        </>
      )}
    </Modal>
  )
}
