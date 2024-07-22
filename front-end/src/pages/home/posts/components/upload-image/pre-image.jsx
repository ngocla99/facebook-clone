import { cn, isImageSrc } from "@/lib/utils"

export const PreImage = ({ file, className }) => {
  if (typeof file?.url === "string" && isImageSrc(file?.url)) {
    return (
      <img
        src={file.url}
        alt="Photo"
        draggable="false"
        className={cn("h-full w-full object-cover", className)}
      />
    )
  }

  return (
    <>
      {isFileWithPreview(file) ? (
        // TODO: zoom images to show more correctly
        <img
          src={file.preview}
          alt={file.name}
          draggable="false"
          className={cn("h-full w-full object-cover", className)}
        />
      ) : null}
    </>
  )
}

export function isFileWithPreview(file) {
  return "preview" in file && typeof file.preview === "string"
}
