import React from "react"
import { useControllableState } from "@/hooks"
import { Cross2Icon } from "@radix-ui/react-icons"
import Dropzone from "react-dropzone"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { AddToMobile } from "./add-to-mobile"
import { isFileWithPreview, PreImage } from "./pre-image"

export const UploadImages = (props) => {
  const {
    value: valueProp,
    onValueChange,
    className,
    storedImages,
    accept = { "image/*": [] },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    multiple = false,
    disabled = false,
    onClose,
    ...dropzoneProps
  } = props

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  })
  const [isPortraitFirstImg, setIsPortraitFirstImg] = React.useState(false)

  const onDrop = async (acceptedFiles, rejectedFiles) => {
    if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
      console.error("Cannot upload more than 1 file at a time")
      return
    }

    if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
      console.error(`Cannot upload more than ${maxFiles} files`)
      return
    }

    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    )

    const updatedFiles = files ? [...files, ...newFiles] : newFiles

    const isPortrait = await isPortraitImage(updatedFiles[0].preview)
    setIsPortraitFirstImg(isPortrait)

    setFiles(updatedFiles)

    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ file }) => {
        console.error(`File ${file.name} was rejected`)
      })
    }
  }

  const onRemove = (index) => {
    if (!files) return
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onValueChange?.(newFiles)
  }

  // Revoke preview url when component unmounts
  React.useEffect(() => {
    return () => {
      if (!files) return
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isDisabled = disabled || (files?.length ?? 0) >= maxFiles
  const displayImages = [...storedImages, ...files]

  return (
    <div className="relative grid w-full cursor-pointer rounded-lg border border-separator p-2 transition">
      <Button
        variant="secondary"
        className="absolute right-4 top-4 z-[11] size-7 rounded-full border border-border bg-white text-muted-foreground hover:bg-background-comment"
        size="icon"
        onClick={() => {
          setFiles([])
          onValueChange?.([])
          onClose()
        }}
      >
        <Cross2Icon className="size-5" />
        <span className="sr-only">Close</span>
      </Button>

      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFiles}
        multiple={maxFiles > 1 || multiple}
        disabled={isDisabled}
        noClick={true}
      >
        {({ getRootProps, open, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              "",
              isDragActive && "border-muted-foreground/50",
              isDisabled && "pointer-events-none opacity-60",
              className
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />

            {displayImages?.length === 0 && (
              <div
                className="flex h-[220px] flex-col items-center justify-center gap-1 rounded-lg bg-card-flat hover:bg-hover"
                onClick={open}
              >
                <div className="grid size-10 place-items-center rounded-full bg-background-secondary">
                  <i className="addPhoto_icon"></i>
                </div>
                <p className="text-[17px] font-medium leading-5">
                  Add Photos/Videos
                </p>
                <span className="text-xs text-muted-foreground">
                  or drag and drop
                </span>
              </div>
            )}

            {displayImages?.length ? (
              <div
                className={cn(
                  "group relative grid gap-[2px] overflow-hidden rounded-lg",
                  displayImages.length === 1 && "grid-cols-1",
                  displayImages.length === 2 &&
                    isPortraitFirstImg &&
                    "max-h-[233px] grid-cols-2",
                  displayImages.length === 2 &&
                    !isPortraitFirstImg &&
                    "h-[466px] grid-rows-2",
                  displayImages.length === 3 &&
                    !isPortraitFirstImg &&
                    "h-[466px] grid-cols-2 grid-rows-3 [&>img:first-child]:col-span-2 [&>img:first-child]:row-span-2",
                  displayImages.length === 3 &&
                    isPortraitFirstImg &&
                    "h-[466px] grid-cols-3 grid-rows-2 [&>img:first-child]:col-span-2 [&>img:first-child]:row-span-2",
                  displayImages.length === 4 &&
                    !isPortraitFirstImg &&
                    "h-[466px] grid-cols-3 grid-rows-3 [&>img:first-child]:col-span-3 [&>img:first-child]:row-span-2",
                  displayImages.length === 4 &&
                    isPortraitFirstImg &&
                    "h-[466px] grid-cols-3 grid-rows-3 [&>img:first-child]:col-span-2 [&>img:first-child]:row-span-3",
                  displayImages.length >= 5 &&
                    "h-[466px] grid-cols-2 grid-rows-6 [grid-template-areas:'img1_img3''img1_img3''img1_img4''img2_img4''img2_img5''img2_img5'] [&>img:nth-child(1)]:[grid-area:img1] [&>img:nth-child(2)]:[grid-area:img2] [&>img:nth-child(3)]:[grid-area:img3] [&>img:nth-child(4)]:[grid-area:img4] [&>img:nth-child(5)]:[grid-area:img5]"
                )}
              >
                {displayImages.slice(0, 5).map((file, index) => (
                  <PreImage key={index} file={file} />
                ))}
                {displayImages.length > 5 && (
                  <div className="absolute bottom-0 right-0 grid h-[154px] w-[224px] place-items-center bg-hover-media">
                    <p className="text-3xl font-bold text-white">
                      +{displayImages.length - 5}
                    </p>
                  </div>
                )}
                {displayImages?.length ? (
                  <div className="absolute inset-0 z-10 hidden gap-3 bg-hover-media p-2 group-hover:flex">
                    <Button
                      className="gap-2 bg-white text-[15px] font-semibold hover:bg-background-comment"
                      variant="secondary"
                      onClick={() => {}}
                    >
                      {/* TODO: Click to edit images */}
                      <i className="edit_icon_16 filter-primary-icon"></i>Edit
                      All
                    </Button>
                    <Button
                      className="gap-2 bg-white text-[15px] font-semibold hover:bg-background-comment"
                      variant="secondary"
                      onClick={open}
                    >
                      <i className="addPhoto_icon"></i>Add Photos/Videos
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </Dropzone>
      <AddToMobile className="mt-2" />
    </div>
  )
}

async function isPortraitImage(src) {
  // https://stackoverflow.com/questions/46399223/async-await-in-image-loading
  const img = new Image()
  img.src = src
  await img.decode()
  return img.height > img.width
}
