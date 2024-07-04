export const PreImage = ({ file }) => {
  return (
    <>
      {isFileWithPreview(file) ? (
        <img
          src={file.preview}
          alt={file.name}
          draggable="false"
          className="h-full w-full shrink-0 object-cover"
        />
      ) : null}
    </>
  )
}

function isFileWithPreview(file) {
  return "preview" in file && typeof file.preview === "string"
}
