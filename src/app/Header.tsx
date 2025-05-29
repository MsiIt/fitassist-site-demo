import Link from 'next/link'
import Image from 'next/image'
import styles from './layout.module.scss'
import dynamic from 'next/dynamic'

const NavDrawer = dynamic(() => import('./NavDrawer'), {
  ssr: false,
})

const Header = () => {
  const links = [
    { name: 'О приложении', path: `/` },
    { name: 'Возможности', path: `/#opportunities` },
    { name: 'Функционал', path: `/#functional` },
    { name: 'Отзывы', path: `/#reviews` },
    { name: 'Пройти опрос', path: '/quiz' },
  ]

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className="wrapper">
            <Link href={`/`}>
              <Image
                src="/images/fit-logo.png"
                alt="Logo"
                width={195}
                height={37}
                priority
              />
            </Link>

            <nav className="only-xl">
              {links.map(link => {
                return (
                  <Link key={link.path} href={link.path}>
                    {link.name}
                  </Link>
                )
              })}
            </nav>

            <div className="hidden-xl">
              <NavDrawer />
            </div>
          </div>
        </div>
      </header>
      <div id="drawer" />
      {/*<div className={styles.headerPlug}/>*/}
    </>
  )
}

export default Header
