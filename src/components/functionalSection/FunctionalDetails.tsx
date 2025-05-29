'use client'

import Button from '@mui/material/Button'
import { useRef } from 'react'
import DetailsModal from '~/components/modals/details/DetailsModal'

export const FunctionalDetails = () => {
  const modalRef = useRef()

  const handleClickOpen = () => {
    modalRef.current?.open()
  }

  const handleClose = () => {
    modalRef.current?.dismiss()
  }
  return (
    <>
      <Button className="moreBtn" variant="secondary" onClick={handleClickOpen}>Узнать подробности</Button>
      <DetailsModal ref={modalRef} handleClose={handleClose} />
    </>
  )
}
