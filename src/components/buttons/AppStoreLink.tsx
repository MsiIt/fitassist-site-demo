'use server'

import { ButtonProps } from '@mui/material'
import style from './style.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'

const AppStoreLink = (props: ButtonProps) => {
  const utmSource = cookies().get('utm_source')

  const link = utmSource
    ? `https://apps.apple.com/app/apple-store/id6499576852?pt=126411376&ct=${utmSource.value}&mt=8`
    : 'https://apps.apple.com/by/app/fit-assist/id6499576852'

  return (
    <Link
      href={link}
      className={classNames(style.storeLink, props.className)}
      target="_blank"
    >
      <Image
        className="icon"
        src="/images/app-store.png"
        alt="app-store"
        width={30}
        height={33}
        priority
      />
      <div>
        <p className="from">Загрузите в</p>
        <p className="name">App Store</p>
      </div>
    </Link>
  )
}

export default AppStoreLink
