'use client'

import { TextField as MuiTextField, TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'
import ChevronDownIcon from '../icons/ChevronDownIcon'
import classNames from 'classnames'

// 🚧

const TextInput = (props: TextFieldProps, ref) => {
  return (
    <MuiTextField
      inputRef={ref}
      SelectProps={{
        IconComponent: iconProps => {
          return (
            <ChevronDownIcon
              className={classNames([
                iconProps.className,
                'icon-color-primary',
              ])}
            />
          )
        },
      }}
      {...props}
    />
  )
}

export default forwardRef(TextInput)
