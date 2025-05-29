'use client'

import { Radio, RadioGroup, SxProps } from '@mui/material'
import { createContext, useContext } from 'react'
import { useController, useWatch } from 'react-hook-form'

const Context = createContext({})

const Group = ({ source, children, ...props }) => {
  const { field } = useController({ name: source })
  const value = useWatch({ name: source })

  return (
    <Context.Provider value={{ source, selectedValue: value }}>
      <RadioGroup {...field} {...props}>
        {children}
      </RadioGroup>
    </Context.Provider>
  )
}

const Item = ({
  value,
  nodeId,
  sx = {},
  icon,
  checkedIcon,
}: {
  value: any
  nodeId: string
  sx?: SxProps
  icon?
  checkedIcon?
}) => {
  return (
    <Radio
      id={nodeId}
      value={value}
      disableRipple
      icon={icon}
      checkedIcon={checkedIcon}
      style={
        {
          // backgroundColor: '#E6DEFE',
        }
      }
      sx={[
        {
          padding: 0,
          color: '#6039D5',
          '&.Mui-checked': {
            color: '#6039D5',
          },
          '& .MuiSvgIcon-root': {
            fontSize: 20,
          },
        },
        sx,
      ]}
    />
  )
}

export const useRadioInputContext = () => useContext(Context)

export default { Group, Item }
