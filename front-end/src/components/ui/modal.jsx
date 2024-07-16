import { useMediaQuery } from "@/hooks"

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
  enableCloseBtn = true,
  ...props
}) {
  const closeModal = ({ dragged } = {}) => {
    if (preventDefaultClose && !dragged) {
      return
    }
    // fire onClose event if provided
    onClose && onClose()
  }
  const isMobile = useMediaQuery("(max-width: 640px)")

  if (isMobile && !desktopOnly) {
    return (
      <Drawer
        open={showModal}
        onOpenChange={(open) => {
          if (!open) {
            closeModal({ dragged: true })
          }
        }}
        {...props}
      >
        <DrawerContent className={className}>{children}</DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog
      open={showModal}
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
        enableCloseBtn={enableCloseBtn}
        {...props}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}
