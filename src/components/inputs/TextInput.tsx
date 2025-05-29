'use client'

import { TextFieldProps } from '@mui/material'
import TextField from '../fields/TextField'
import _ from 'lodash'
import { useController, useFormContext } from 'react-hook-form'

const TextInput = ({
  source,
  pattern,
  ...props
}: { source: string; pattern?: any } & TextFieldProps) => {
  const { field } = useController({
    name: source,
    rules: { required: props.required, pattern },
  })
  const {
    formState: { errors },
  } = useFormContext()
  const error = !!_.get(errors, source)

  return (
    <TextField
      {...props}
      {...field}
      error={error}
      InputLabelProps={{
        style: {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: '100%',
          color: '#6039D5',
        },
      }}
      sx={[
        props.sx,
        props.multiline && {
          '.MuiInputBase-root': props.multilineStyle ?? {
            paddingLeft: '16px',
            paddingRight: '16px',
            minHeight: '104px',
            alignItems: 'flex-start',
          },
          textarea: { paddingLeft: 0 },
        },
      ]}
    />
  )
}

export default TextInput
