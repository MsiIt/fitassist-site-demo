'use client'

import {
  Button, CircularProgress,
  Dialog,
  DialogActions,
  DialogContent, DialogContentText, DialogTitle, IconButton,
} from '@mui/material'
import { forwardRef, useImperativeHandle, useState } from 'react'
import TextInput from '~/components/inputs/TextInput'
import { FormProvider, useForm } from 'react-hook-form'
import CloseIcon from '~/components/icons/CloseIcon'
import styles from './styles.module.scss'
import { Api } from '~/api'

const DetailsModal = ({ handleClose }, ref) => {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useImperativeHandle(
    ref,
    () => ({
      open: data => {
        // additionalDataRef.current = data
        setOpen(true)
      },
      dismiss: data => {
        setOpen(false)
      },
    }),
    [],
  )

  const methods = useForm({
    defaultValues: {
      email: '',
    },
  })

  const handler = async (data)=> {
    const { email } = data
    try {
      setLoading(true)
      await Api.createAppealConsultation(email)
      ref.current?.dismiss()
    } catch (error) {
      setError(true)
      console.warn(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ '.MuiPaper-root': { padding: '20px', maxWidth: '650px', width: '100%' } }}
    >
      <FormProvider {...methods}>
        <div>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ color: theme => theme.palette.grey[500], width:48, height:48 }}
            className={styles.closeButton}
          >
            <CloseIcon className="hidden-sm" />
          </IconButton>
          <DialogContent>
            <DialogTitle style={{ paddingLeft: 0 }} id="alert-dialog-title">
              Подробнее о программе сопровождения тренеров
            </DialogTitle>
          <DialogContentText>
            Введи адрес электронной почты и мы отправим тебе всю необходимую информацию
          </DialogContentText>
            <TextInput
              source="email"
              required
              type="email"
              label={'Email'}
              sx={{
                margin: '20px 0',
                width:'100%',
                '& .MuiFormHelperText-root': {
                  color: '#DF1E1EE0',
                },
              }}
              error={error}
              helperText={error && "Проверьте введенный email"}
            />
            <DialogActions>
              <Button onClick={methods.handleSubmit(handler)} >
                {!loading ? 'Узнать' : <CircularProgress size={20} sx={{color: 'white'}}/>}
              </Button>
            </DialogActions>
          </DialogContent>
        </div>
      </FormProvider>
    </Dialog>
  )
}

export default forwardRef(DetailsModal)
