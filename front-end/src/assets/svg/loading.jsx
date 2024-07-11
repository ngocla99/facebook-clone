export const Loading = (props) => {
  return (
    <svg
      height="32"
      viewBox="0 0 32 32"
      width="32"
      {...props}
      className="animate-spin-fb origin-[50%_50%]"
    >
      <circle
        cx="16"
        cy="16"
        fill="none"
        r="15"
        stroke="#000"
        stroke-dasharray="94.24777960769379"
        stroke-width="2"
        className="animate-spin-fb-circle origin-[50%_50%]"
      ></circle>
    </svg>
  )
}
