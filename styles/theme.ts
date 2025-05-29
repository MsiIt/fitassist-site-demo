'use client'

import {Inter} from 'next/font/google'
import {createTheme} from '@mui/material/styles'
import {outlinedInputClasses} from "@mui/material";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
})

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },

  components: {
    MuiButton: {
      defaultProps:{
        disableRipple: true,
        variant: 'contained'
      },
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '10px',
          borderRadius: 16,
          textTransform: 'unset',
          padding: '18px 16px',
        }
      },
      variants: [
        {
          props: {variant: 'contained'},
          style: {
            backgroundColor: 'var(--color-primary)',
            border: '1px solid #7D5CE3',

            ':hover': {
              border: '1px solid var(--color-primary-hover)',
              backgroundColor: 'var(--color-primary-hover)',
            },
            ':active': {
              border: '1px solid var(--color-primary-active)',
              backgroundColor: 'var(--color-primary-active)',
            },
            ':disabled': {
              border: '1px solid var(--color-white-neutral)',
              backgroundColor: 'var(--color-white-neutral)',
            },
          },
        },
        {
          props: {variant: 'secondary'},
          style: {
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-primary)',

            ':hover': {
              backgroundColor: 'var(--color-white)',
            },

            ':active': {
              backgroundColor: 'var(--color-white)',
            },
          },
        },
        {
          props: {variant: 'outlined'},
          style: {
            backgroundColor: "transparent",
            borderRadius: 16,
            textTransform: 'unset',
            padding: '18px 16px',
            border: '1px solid var(--color-primary)',
            color: 'var(--color-primary)',

            ':hover': {
              border: '1px solid var(--color-primary-hover)',
              color: 'var(--color-primary-hover)',
            },
            ':active': {
              border: '1px solid var(--color-primary-active)',
              color: 'var(--color-primary-active)',
            },
            ':disabled': {
              border: '1px solid var(--color-white-neutral)',
              color: 'var(--color-white-neutral)',
            },
          },
        },
      ],
    },
    MuiIconButton: {
      defaultProps:{
        disableRipple: true,
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          padding: '14px',
          borderRadius: '16px',
          boxShadow: '0 4px 15px 0 #7D5CE312',
          height: '48px',
        }
      },
      variants: [
        {
          props: {variant: 'contained'},
          style: {
            backgroundColor: 'var(--color-white)',
            boxShadow: '0px 4px 15px 0px #7D5CE312',

            ':hover': {
              boxShadow: '0px 2px 10px 0px #7D5CE31A',
            },
            ':active': {
              boxShadow: '0px 2px 10px 0px #7D5CE31A',
            },
            ':disabled': {
              boxShadow: '0px 4px 15px 0px #7D5CE312',
            },
          },
        },
        {
          props: {variant: 'outlined'},
          style: {
            backgroundColor: "transparent",
            border: '1px solid var(--color-white-neutral)',

            ':hover': {
              background: '#FFFFFF1A',
              border: '1px solid var(--color-white)',
            },
            ':active': {
              background: '#FFFFFF1A',
              border: '1px solid var(--color-white-neutral)',
            },
            ':disabled': {
              border: '1px solid var(--color-secondary)',
            },
          },
        },
        {
          props: {variant: 'clear'},
          style: {
            backgroundColor: "transparent",
            border: 'none',
            boxShadow: 'none',
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'var(--color-white-neutral)',
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--color-primary)',
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--color-secondary)',
          },
          // [`&.Mui-error .${outlinedInputClasses.notchedOutline}`]: {
          //   borderColor: '#DF1E1EE0',
          // },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#B09AF1',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'var(--color-primary-hover)',
            fontSize: 16,
            fontWeight: '600'
          },
          '&:not(.Mui-selected)': {
            color: 'var(--color-primary)',
            fontSize: 16,
            fontWeight: '600'
          },
        },
      },
    },
  },
})

export default theme

