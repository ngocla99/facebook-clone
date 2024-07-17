export const Loading = (props) => {
  return (
    <svg
      height="32"
      viewBox="0 0 32 32"
      width="32"
      {...props}
      className="origin-[50%_50%] animate-spin-fb"
    >
      <circle
        cx="16"
        cy="16"
        fill="none"
        r="15"
        stroke="#000"
        strokeDasharray="94.24777960769379"
        strokeWidth="2"
        className="origin-[50%_50%] animate-spin-fb-circle"
      ></circle>
    </svg>
  )
}
