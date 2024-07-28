import { cn, isImageSrc } from "@/lib/utils"

export const CommentImage = ({ file, className }) => {
  if (typeof file === "string" && isImageSrc(file)) {
    return (
      <img
        src={file}
        alt="Photo"
        draggable="false"
        className={cn(
          "h-[200px] rounded-[18px] border border-border object-cover",
          className
        )}
      />
    )
  }

  return (
    <>
      {isFileWithPreview(file) ? (
        <img
          src={file.preview}
          alt={file.name}
          draggable="false"
          className={cn("h-20 w-auto object-cover", className)}
        />
      ) : null}
    </>
  )
}

export function isFileWithPreview(file) {
  return "preview" in file && typeof file.preview === "string"
}
