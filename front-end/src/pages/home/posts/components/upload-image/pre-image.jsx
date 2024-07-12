import { cn } from "@/lib/utils"

export const PreImage = ({ file, className }) => {
  return (
    <>
      {isFileWithPreview(file) ? (
        // TODO: zoom images to show more correctly
        <img
          src={file.preview}
          alt={file.name}
          draggable="false"
          className={cn("h-full shrink-0 object-cover", className)}
        />
      ) : null}
    </>
  )
}

export function isFileWithPreview(file) {
  return "preview" in file && typeof file.preview === "string"
}
