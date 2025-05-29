import * as React from 'react'
const BurgerIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g stroke="#000" strokeLinecap="round" strokeWidth={1.608}>
      <path stroke="#4419C6" d="M2 17h16M2 11h16M2 5h16" />
    </g>
  </svg>
)
export default BurgerIcon
