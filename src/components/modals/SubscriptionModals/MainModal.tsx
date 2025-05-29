'use client'

import {Dialog, DialogTitle, IconButton} from '@mui/material'
import {forwardRef, useImperativeHandle, useState} from 'react'
import CloseIcon from '../../icons/CloseIcon'
import Authentification from "~/components/modals/SubscriptionModals/Authentification";
import styles from './styles.module.scss'
import FooterSubscribe from "~/components/modals/SubscriptionModals/FootrerSubscribe";

const MainModal = ({tariff, user, closeModal}, ref) => {
  const [open, setOpen] = useState(false)

  useImperativeHandle(
    ref,
    () => ({
      open: data => {
        // additionalDataRef.current = data
        setOpen(true)
      },
      dismiss: data=>{
        setOpen(false)
      }
    }),
    []
  )


  const handleClose = async () => {
    setOpen(false)
  }

  const closeButton = (
    <IconButton
      aria-label="close"
      onClick={handleClose}
      sx={{ color: theme => theme.palette.grey[500], width:48, height:48 }}
      className="modal-close-button"
    >
      <CloseIcon className="hidden-sm" />
    </IconButton>
  )

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={false} fullWidth={true} sx={{ '.MuiPaper-root': {
        maxWidth: '100%',
        maxHeight: '100%',
        width: '100%',
        height: '100%',
        margin: 0,
        backgroundColor: 'var(--background-light-modal)',
      }}}>
      <div className={styles.wrapperModal}>
        <div className={styles.closeButton}>
          {closeButton}
        </div>
        <div className={styles.content}>
          <DialogTitle style={{fontSize: 36, fontWeight: '600', padding:0, paddingBottom:36, lineHeight:'40px'}}>Управление подпиской</DialogTitle>
          <p style={{fontSize: 16, fontWeight: '400', lineHeight:'24px', paddingBottom:45}}>
            Для оформления подписки на сайте необходимо авторизоваться под теми же учетными данными, под которыми вы авторизованы на сайте. Подписка оформляется на месяц. Для продления подписки необходимо повторно оплатить ее на сайте. ID профиля вы можете узнать в личном кабинете приложения.
          </p>
          <div className={styles.contentBlock}>
            <Authentification  closeModal={closeModal}/>

            <FooterSubscribe />
          </div>

        </div>
      </div>
    </Dialog>
  )
}

export default forwardRef(MainModal)
