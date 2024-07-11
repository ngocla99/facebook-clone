import React, { useCallback, useMemo } from "react"

import { Modal } from "@/components/ui/modal"

import { CreatePostForm } from "./create-post-form"

const CreatePostModalHelper = ({
  showCreatePostModal,
  setShowCreatePostModal,
}) => {
  const ref = React.useRef(null)

  return (
    <Modal
      className="w-auto p-0 sm:w-[500px]"
      showModal={showCreatePostModal}
      setShowModal={setShowCreatePostModal}
      enableCloseBtn={false}
      onInteractOutside={(e) => {
        if (ref.current.isPosting) e.preventDefault()
      }}
    >
      <CreatePostForm ref={ref} onClose={() => setShowCreatePostModal(false)} />
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
