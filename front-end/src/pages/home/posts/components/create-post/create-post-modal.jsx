import React, { useCallback, useMemo } from "react"

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
      enableCloseBtn={false}
    >
      <CreatePostForm />
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
