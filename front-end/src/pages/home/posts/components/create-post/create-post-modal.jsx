import React, { useCallback, useMemo } from "react"

import { Modal } from "@/components/ui/modal"

import { CreatePostForm } from "./create-post-form"

const CreatePostModalHelper = ({ createPostModal, setCreatePostModal }) => {
  const ref = React.useRef(null)

  return (
    <Modal
      className="w-auto p-0 sm:w-[500px]"
      showModal={createPostModal.open}
      setShowModal={(open) => setCreatePostModal({ open })}
      enableCloseBtn={false}
      onInteractOutside={(e) => {
        if (ref.current.isPosting) e.preventDefault()
      }}
    >
      <CreatePostForm
        ref={ref}
        onClose={() => setCreatePostModal({ open: false })}
        openBy={createPostModal.openBy}
      />
    </Modal>
  )
}

export const useCreatePostModal = () => {
  const [createPostModal, setCreatePostModal] = React.useState(false)

  const CreatePostModal = useCallback(() => {
    return (
      <CreatePostModalHelper
        createPostModal={createPostModal}
        setCreatePostModal={setCreatePostModal}
      />
    )
  }, [createPostModal, setCreatePostModal])

  return useMemo(
    () => ({ createPostModal, setCreatePostModal, CreatePostModal }),
    [createPostModal, setCreatePostModal, CreatePostModal]
  )
}
