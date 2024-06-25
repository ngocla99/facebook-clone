import { useMediaQuery } from "@/hooks"
import { useNavigation } from "react-router-dom"

import { Dialog, DialogContent } from "./dialog"
import { Drawer, DrawerContent } from "./drawer"

export function Modal({
  children,
  className,
  showModal,
  setShowModal,
  onClose,
  desktopOnly,
  preventDefaultClose,
}) {
  const navigate = useNavigation()

  const closeModal = ({ dragged } = {}) => {
    if (preventDefaultClose && !dragged) {
      return
    }
    // fire onClose event if provided
    onClose && onClose()

    // if setShowModal is defined, use it to close modal
    if (setShowModal) {
      setShowModal(false)
      // else, this is intercepting route @modal
    } else {
      navigate(-1)
    }
  }
  const isMobile = useMediaQuery("(max-width: 640px)")

  if (isMobile && !desktopOnly) {
    return (
      <Drawer
        open={setShowModal ? showModal : true}
        onOpenChange={(open) => {
          if (!open) {
            closeModal({ dragged: true })
          }
        }}
      >
        <DrawerContent className={className}>{children}</DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog
      open={setShowModal ? showModal : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal()
        }
      }}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className={className}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
