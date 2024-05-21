import React, { useCallback, useMemo, useState } from "react"

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Modal } from "@/components/ui/modal"
import { Separator } from "@/components/ui/separator"

import { SignUpForm } from "../forms/signup-form"

// import { SignUpForm } from "@/components/forms/create-group-form"

const SignUpModalHelper = ({ showSignUpModal, setShowSignUpModal }) => {
  return (
    <Modal
      className="w-[432px] p-0"
      showModal={showSignUpModal}
      setShowModal={setShowSignUpModal}
    >
      <DialogHeader className="space-y-0 px-4 py-[10px]">
        <DialogTitle className="text-[32px] text-[#1c1e21]">
          Sign Up
        </DialogTitle>
        <DialogDescription className="text-[15px] text-[#606770]">
          It's quick and easy.
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
