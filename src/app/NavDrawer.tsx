'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Drawer, IconButton } from '@mui/material'
import CloseIcon from '~/components/icons/CloseIcon'
import BurgerIcon from '~/components/icons/BurgerIcon'
import styles from './layout.module.scss'
import GooglePlayLink from '~/components/buttons/GooglePlayLink'
import AppStoreLink from '~/components/buttons/AppStoreLink'
import Image from 'next/image'

const NavDrawer = () => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const links = [
    { name: 'О приложении', path: `/#` },
    { name: 'Возможности', path: `/#opportunities` },
    { name: 'Функционал', path: `/#functional` },
    { name: 'Отзывы', path: `/#reviews` },
    { name: 'Пройти опрос', path: '/quiz' },
  ]

  return (
    <div className={styles.burgerBlock}>
      <div className="menu-icon">
        <IconButton
          disableRipple={false}
          variant="clear"
          onClick={toggleDrawer(!open)}
          className="icon"
        >
          {open ? <CloseIcon /> : <BurgerIcon />}
        </IconButton>
      </div>

      <Drawer
        anchor="top"
        key={open}
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{
          container: document.getElementById('drawer'),
        }}
        sx={{
          '.MuiPaper-root': {
            height: '100%',
            backgroundColor: 'transparent',
          },
        }}
      >
        <div className={styles.content}>
          <nav className="menu">
            {links.map(link => {
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={toggleDrawer(false)}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          <div className="footer">
            <div className="download-btns">
              <GooglePlayLink className="sm-store-link" />
              <AppStoreLink className="sm-store-link" />
            </div>
            <div className="block-pays">
              <p>© 2024 Fit Assist</p>
              <div className="items">
                <p>Белкард</p>
                <p>МИР</p>
                <p>VISA</p>
                <p>Mastercard</p>
                <Image
                  src="/images/apple-pay-purple.png"
                  alt="apple-pay"
                  width={34}
                  height={13}
                />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default NavDrawer
