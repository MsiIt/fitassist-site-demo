import React from 'react'
import StarIcon from '~/components/icons/StarIcon'
import classNames from 'classnames'
import styles from './styles.module.scss'

const Star = ({ isActive }: { isActive: boolean }) => (
  <StarIcon className={classNames({'icon-gold': isActive})} />
)

const Ratings = ({ count }: { count: number }) => {
  const stars = Array(5)
    .fill(null)
    .map((_, index) => <Star key={index} isActive={index < count} />)
  return <div className={styles.ratings}>{stars}</div>
}

export default Ratings
