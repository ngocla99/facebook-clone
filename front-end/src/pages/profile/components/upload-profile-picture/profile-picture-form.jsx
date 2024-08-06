import React from "react"
import Cropper from "react-easy-crop"

import getCroppedImg from "@/lib/crop-image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { LoadingDots } from "@/components/loading/loading-dots"
import { MuiTextarea } from '@/components/textarea/mui-textarea'

const ZOOM_MIN = 1
const ZOOM_MAX = 3
const ZOOM_STEP = 0.2
export const ProfilePictureForm = ({
  form,
  isSaving,
  className,
  onSubmit,
  onClose,
}) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null)
  const [showCropped, setShowCropped] = React.useState(false)
  const [showDragHint, setShowDragHint] = React.useState(false)
  const [showZoomHint, setShowZoomHint] = React.useState(false)

  const zoomTimeoutRef = React.useRef()

  React.useEffect(() => {
    setShowDragHint(true)
    setTimeout(() => setShowDragHint(false), 2000)
  }, [])

  const handleZoomIn = () => {
    if (zoom >= ZOOM_MAX) return
    setZoom((prev) => Math.round((prev + ZOOM_STEP) * 100) / 100)
  }

  const handleZoomOut = () => {
    if (zoom <= ZOOM_MIN) return
    setZoom((prev) => Math.round((prev - ZOOM_STEP) * 100) / 100)
  }

  const handleWheelRequest = (e) => {
    // require the CTRL/⌘ key to be able to zoom with wheel
    if (e.ctrlKey || e.metaKey) {
      setShowZoomHint(false)
      return true
    }
    setShowZoomHint(true)
    clearTimeout(zoomTimeoutRef.current)
    zoomTimeoutRef.current = setTimeout(() => setShowZoomHint(false), 2000)
    return false
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const showCroppedImage = async () => {
    try {
      if (!showCropped) {
        const croppedImage = await getCroppedImg(
          form.getValues("image"),
          croppedAreaPixels
        )

        form.setValue("image", croppedImage)
      } else {
        form.resetField("image")
      }
    } catch (e) {
      console.error(e)
    }
    setShowCropped((prev) => !prev)
  }

  React.useEffect(() => {
    setZoom(1)
  }, [showCropped])

  return (
    <Form {...form}>
      <form
        className={cn("grid", className)}
        onSubmit={form.handleSubmit((data) =>
          onSubmit({ ...data, isCropped: showCropped, croppedAreaPixels })
        )}
      >
        <div className="p-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MuiTextarea
                    label="Description"
                    className="min-h-[82px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="relative mt-4 h-[420px]">
                <FormControl>
                  <Cropper
                    image={field.value}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    onWheelRequest={handleWheelRequest}
                    style={{
                      cropAreaStyle: {
                        filter: "grayscale(1) invert(1)",
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
                {showZoomHint && (
                  <div className="absolute left-1/2 top-1/4 max-w-[244px] -translate-x-1/2 rounded-lg bg-[rgba(0,0,0,0.5)] px-3  py-2 text-center font-semibold text-white">
                    <p>Use ⌘ + scroll (or ctrl + scroll) to zoom the image</p>
                  </div>
                )}
                {showDragHint && (
                  <div className="absolute left-1/2 top-1/4 flex max-w-[244px] -translate-x-1/2 items-center gap-2 rounded-lg bg-[rgba(0,0,0,0.5)] px-3 py-2 text-center font-semibold text-white">
                    <i className="drag_icon invert"></i>
                    <p>Drag to Reposition</p>
                  </div>
                )}
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="size-9"
              onClick={handleZoomOut}
              disabled={zoom === ZOOM_MIN}
            >
              <i className="minus_icon"></i>
            </Button>
            <Slider
              defaultValue={[1]}
              value={[zoom]}
              min={ZOOM_MIN}
              max={ZOOM_MAX}
              step={ZOOM_STEP}
              className="my-3 max-w-[400px]"
              onValueChange={([value]) => setZoom(value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="size-9"
              onClick={handleZoomIn}
              disabled={zoom === ZOOM_MAX}
            >
              <i className="plus_icon"></i>
            </Button>
          </div>
          <div className="mt-2 flex justify-center gap-3">
            <Button
              variant={showCropped ? "deemphasized" : "secondary"}
              onClick={showCroppedImage}
            >
              <i
                className={cn(
                  "crop_icon mr-1.5",
                  showCropped && "filter-accent"
                )}
              ></i>
              Crop photo
            </Button>
            <Button variant="secondary" disabled>
              <i className="temp_icon mr-1.5"></i>Make Temporary
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <i className="public_icon filter-secondary-icon"></i>
            <p className="text-lg text-muted-foreground">
              Your profile picture is public.
            </p>
          </div>
        </div>
        <DialogFooter className="items-center border-t border-border p-4">
          {isSaving ? (
            <LoadingDots className="mr-2" />
          ) : (
            <Button
              variant="ghost"
              className="w-[70px] text-primary"
              onClick={onClose}
            >
              Cancel
            </Button>
          )}
          <Button className="w-[112px]" disabled={isSaving}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
