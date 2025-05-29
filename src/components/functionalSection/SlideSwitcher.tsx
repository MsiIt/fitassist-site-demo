'use client'

import styles from './style.module.scss'
import Image from 'next/image'
import SquareButton from '~/components/buttons/SquareButton'
import ArrowLeftIcon from '~/components/icons/ArrowLeftIcon'
import ArrowRightIcon from '~/components/icons/ArrowRightIcon'
import { useFunctional } from './FunctionalProvider'
import classNames from 'classnames'

export const SlideSwitcher = ({ items }) => {
  const { handleNext, handlePrev, item, listItem, hasPrev, hasNext } = useFunctional()

  const currentList = items.find(l => l.id === item.id)
  const currentItem = currentList.list.find(l => l.id === listItem.id)

  return (
    <>
      {items.map(l => {
        const isShowList = currentList.id === l.id
        return (
          <div
            className={styles.slider}
            style={{ display: isShowList ? 'block' : 'none' }}
            key={l.id}
          >
            {l.list.map(v => {
              return (
                <div
                  key={v.id}
                  className={classNames('imageSwitcher', { show: currentItem.id === v.id })}
                >
                  <div className="content">
                    <Image
                      key={v.src}
                      src={v.src}
                      width={264}
                      height={538}
                      className="img"
                      alt="functional"
                      priority={true}
                      // loading="eager"
                    />

                    <div className="content-block">
                      <div className="text">
                        {/*<p className="title">{listItem.title}</p>*/}
                        <p className="subtitle">{v.text}</p>
                      </div>

                      <div className="controls">
                        <div className="btns">
                          <SquareButton
                            variant={'outlined'}
                            icon={<ArrowLeftIcon
                              className={classNames('icon-color-secondary', { 'icon-disabled': hasPrev })} />}
                            onClick={handlePrev}
                            disabled={hasPrev}
                          />
                          <SquareButton
                            variant={'outlined'}
                            icon={<ArrowRightIcon
                              className={classNames('icon-color-secondary', { 'icon-disabled': hasNext })} />}
                            onClick={handleNext}
                            disabled={hasNext}
                          />
                        </div>
                        <p className="pagination">{v.id} / {item.list.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })
      }
    </>
  )
}
