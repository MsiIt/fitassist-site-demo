import {ButtonProps, IconButton} from '@mui/material'
import style from './style.module.scss'
import classNames from 'classnames'
import {ReactNode} from "react";

type Props = ButtonProps & { icon: ReactNode }

const SquareButton = ({icon, ...props}: Props) => {
  return (
    <IconButton
      disableRipple
      {...props}
      className={classNames(style.SquareButton, props.className)}
    >
      {icon}
    </IconButton>
  )
}

export default SquareButton
