'use client'

import styles from './styles.module.scss'
import { Swiper as LSwiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { useRef } from 'react'
import ArrowLeftIcon from '~/components/icons/ArrowLeftIcon'
import ArrowRightIcon from '~/components/icons/ArrowRightIcon'
import { ReviewItem } from '~/components/review/ReviewItem'
import SquareButton from '~/components/buttons/SquareButton'

export const ReviewsSwiper = ({ items }) => {
  const swiperRef = useRef(null)

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  return (
    <div className={styles.reviewsSwiperContainer}>
      <LSwiper
        ref={swiperRef}
        slidesPerView={1}
        loop={true}
      >
        {items.map(item => {
          return (
            <SwiperSlide key={item.id}>
              <ReviewItem item={item} />
            </SwiperSlide>
          )
        })}
      </LSwiper>
      <div className="swiper-btns">
        <SquareButton
          icon={<ArrowLeftIcon />}
          onClick={goPrev}/>
        <SquareButton
          icon={<ArrowRightIcon />}
          onClick={goNext}/>
      </div>
    </div>
  )
}
