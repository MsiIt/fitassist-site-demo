'use client'

import styles from './style.module.scss'
import Image from 'next/image'
import classNames from 'classnames'
import { useFunctional } from '~/components/functionalSection/FunctionalProvider'

export const FunctionalItems = ({ items }) => {
  const { handleItem, item } = useFunctional()

  return (
    <div className={classNames(styles.functionalItems)}>
      <div className="header-block">
        <h2>Как это работает</h2>
        <div className="small-line" />
        <p className="description">{item.description}</p>
      </div>

      <div className="instructions-block hidden-xl">
        <Image
          src="/images/instructions.png"
          alt="flag-finish"
          width={87}
          height={20}
          priority
        />
      </div>

      <div className="list">
        {items.map(el => {
          return (
            <div
              key={el.id}
              onClick={() => handleItem(el)}
              className={classNames('item', { selected: item.id === el.id })}
            >
              <Image
                src="/images/flag-finish.png"
                alt="flag-finish"
                width={36}
                height={36}
                priority
              />
              <p>{el.title}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
