'use server'

import { ButtonProps } from '@mui/material'
import style from './style.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'

const GooglePlayLink = (props: ButtonProps) => {
  const utmSource = cookies().get('utm_source')

  const link = utmSource
    ? `https://play.google.com/store/apps/details?id=com.fitnessassist.online&referrer=utm_source%3D${utmSource.value}`
    : 'https://play.google.com/store/apps/details?id=com.fitnessassist.online'

  return (
    <Link
      href={link}
      className={classNames(style.storeLink, props.className)}
      target="_blank"
    >
      <Image
        className="icon"
        src="/images/google-play.png"
        alt="google-play"
        width={30}
        height={33}
        priority
      />
      <div>
        <p className="from">Загрузите на</p>
        <p className="name">Google Play</p>
      </div>
    </Link>
  )
}

export default GooglePlayLink
