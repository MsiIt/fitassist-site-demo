'use client'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { forwardRef, useImperativeHandle, useState } from 'react'
import Image from 'next/image'

const InfoAboutIdModal = ({ handleClose }, ref) => {

  const [open, setOpen] = useState(false)

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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ '.MuiPaper-root': { padding: '0 24px' } }}
    >
      <DialogTitle style={{ paddingLeft: 0 }} id="alert-dialog-title">
        Где найти свой ID профиля
      </DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        <div>
          <p>Зайдите в приложении в свой профиль и в конце скрина профиля нажмите на поле
            подписанное &quot;Идентификационный номер&quot;, после этого он скопируется и вы можете вставить его в форму
            на сайте</p>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            marginTop: '20px',
            flexWrap: 'wrap'
          }}>
            <Image src={'/images/client-id.png'} alt="client-id" width={200} height={400} />
            <Image src={'/images/trainer-profile.png'} alt="trainer-profile" width={200} height={400} />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Назад</Button>
      </DialogActions>
    </Dialog>
  )
}

export default forwardRef(InfoAboutIdModal)
