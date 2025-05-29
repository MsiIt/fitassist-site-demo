import * as React from "react"
const ArrowLeftIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    aria-hidden="true"
    className="w-[20px] h-[20px] text-gray-800 dark:text-white"
    {...props}
  >
    <path
      stroke="var(--color-primary)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m14 18-7-7 7-7"
    />
  </svg>
)
export default ArrowLeftIcon
