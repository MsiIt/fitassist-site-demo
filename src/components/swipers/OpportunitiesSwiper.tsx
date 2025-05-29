'use client'

import { Swiper as LSwiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { useRef, useState } from 'react'
import { OpportunitySwiperItem } from '~/components/opportunitiesSection/OpportunitySwiperItem'
import styles from '~/components/swipers/styles.module.scss'
import SquareButton from '~/components/buttons/SquareButton'
import ArrowUpIcon from '~/components/icons/ArrowUpIcon'
import ArrowDownIcon from '~/components/icons/ArrowDownIcon'
import classNames from 'classnames'

export const OpportunitiesSwiper = ({ items }) => {
  const swiperRef = useRef(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [activeIndex, setActiveIndex] = useState(false)

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext()
      if (activeIndex === swiperRef.current.swiper.activeIndex) {
        setIsEnd(true)
      }
    }
  }

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper
      setIsBeginning(swiper.isBeginning)
      setIsEnd(swiper.isEnd)
      setActiveIndex(swiper.activeIndex)
    }
  }

  return (
    <div className={styles.opportunitiesSwiper}>
      <LSwiper
        ref={swiperRef}
        direction={'vertical'}
        slidesPerView={'auto'}
        spaceBetween={36}
        wrapperClass="swiper-wrapper"
        className="hidden-md"
        onSlideChange={handleSlideChange}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlide
              key={`${item.id} + ${index}`}
              style={{
                height: item.id === 0 ? 'auto' : '126px',
                visibility: item.id === 0 ? 'hidden' : undefined,
              }}>
              <OpportunitySwiperItem item={item} />
            </SwiperSlide>
          )
        })}
      </LSwiper>
      <div className="swiper-btns hidden-md">
        <SquareButton
          icon={<ArrowUpIcon />}
          className={classNames({'icon-disabled': isBeginning})}
          onClick={goPrev}
          disabled={isBeginning}
        />
        <SquareButton
          icon={<ArrowDownIcon />}
          className={classNames(({'icon-disabled': isEnd}))}
          onClick={goNext}
          disabled={isEnd}
        />
      </div>
      <div className="list">
        {items.map((item, index) => {
          return (
            <SwiperSlide
              key={`${item.id} + ${index}`}
              style={{
                visibility: item.id === 0 ? 'hidden' : undefined,
              }}>
              <OpportunitySwiperItem item={item} />
            </SwiperSlide>
          )
        })}
      </div>
    </div>
  )
}
