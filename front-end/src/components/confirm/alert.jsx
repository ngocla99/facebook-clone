import { Cross2Icon } from "@radix-ui/react-icons"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"

export const Alert = ({
  type,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  onClose,
  ...props
}) => {
  const handleConfirm = () => {
    onConfirm && onConfirm()
    onClose()
  }
  const handleCancel = () => {
    onCancel && onCancel()
    onClose()
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="relative h-[60px] items-center justify-center space-y-0 border-b border-border">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-3 size-9 rounded-full text-muted-foreground"
            onClick={handleCancel}
          >
            <Cross2Icon className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </AlertDialogHeader>
        <div className="min-h-[50px] px-4 py-3">
          <AlertDialogDescription className="leading-none">
            {description}
          </AlertDialogDescription>
        </div>
        <AlertDialogFooter>
          {cancelText && (
            <AlertDialogCancel onClick={handleCancel}>
              {cancelText}
            </AlertDialogCancel>
          )}
          {confirmText && (
            <AlertDialogAction onClick={handleConfirm}>
              {confirmText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
