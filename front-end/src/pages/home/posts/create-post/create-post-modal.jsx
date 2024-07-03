import React, { useCallback, useMemo } from "react"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"

import { CreatePostForm } from "./create-post-form"

const CreatePostModalHelper = ({
  showCreatePostModal,
  setShowCreatePostModal,
}) => {
  return (
    <Modal
      className="w-auto p-0 sm:w-[500px]"
      showModal={showCreatePostModal}
      setShowModal={setShowCreatePostModal}
    >
      <DialogHeader className="grid h-[60px] place-items-center space-y-0 border-b border-border">
        <DialogTitle>Create post</DialogTitle>
      </DialogHeader>
      <div className="px-0 py-4">
        <CreatePostForm />
      </div>
    </Modal>
  )
}

export const useCreatePostModal = () => {
  const [showCreatePostModal, setShowCreatePostModal] = React.useState(false)

  const CreatePostModal = useCallback(() => {
    return (
      <CreatePostModalHelper
        showCreatePostModal={showCreatePostModal}
        setShowCreatePostModal={setShowCreatePostModal}
      />
    )
  }, [showCreatePostModal, setShowCreatePostModal])

  return useMemo(
    () => ({ showCreatePostModal, setShowCreatePostModal, CreatePostModal }),
    [showCreatePostModal, setShowCreatePostModal, CreatePostModal]
  )
}
