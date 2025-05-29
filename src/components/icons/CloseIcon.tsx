import * as React from "react"
const CloseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#252525"
      fillRule="evenodd"
      d="M16.62 3.366a1.25 1.25 0 0 1 0 1.768L5.133 16.619a1.25 1.25 0 0 1-1.768-1.768L14.851 3.366a1.25 1.25 0 0 1 1.768 0Z"
      clipRule="evenodd"
    />
    <path
      fill="#252525"
      fillRule="evenodd"
      d="M16.62 16.62a1.25 1.25 0 0 1-1.769 0L3.366 5.133a1.25 1.25 0 0 1 1.768-1.768l11.485 11.485a1.25 1.25 0 0 1 0 1.768Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CloseIcon
