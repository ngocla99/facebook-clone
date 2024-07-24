import React, { useCallback, useMemo } from "react"
import { SignUpForm } from "@/pages/auth/login/signup-form"

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"
import { Separator } from "@/components/ui/separator"

const SignUpModalHelper = ({ showSignUpModal, setShowSignUpModal }) => {
  return (
    <Modal
      className="w-auto p-0 sm:w-[432px]"
      showModal={showSignUpModal}
      onClose={() => setShowSignUpModal(false)}
    >
      <DialogHeader className="space-y-0 px-4 py-[10px]">
        <DialogTitle className="text-[32px] text-[#1c1e21]">
          Sign Up
        </DialogTitle>
        <DialogDescription className="text-[#606770]">
          It&apos;s quick and easy.
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <SignUpForm className="p-4" />
    </Modal>
  )
}

export const useSignUpModal = () => {
  const [showSignUpModal, setShowSignUpModal] = React.useState(false)

  const SignUpModal = useCallback(() => {
    return (
      <SignUpModalHelper
        showSignUpModal={showSignUpModal}
        setShowSignUpModal={setShowSignUpModal}
      />
    )
  }, [showSignUpModal, setShowSignUpModal])

  return useMemo(
    () => ({ showSignUpModal, setShowSignUpModal, SignUpModal }),
    [showSignUpModal, setShowSignUpModal, SignUpModal]
  )
}
