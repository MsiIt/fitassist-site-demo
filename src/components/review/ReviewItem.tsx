import Image from "next/image";
import styles from "./styles.module.scss";
import Ratings from '~/components/rating/Rating'

export const ReviewItem = ({item}) => {
  return (
    <div className={styles.reviewsSection}>
      <div className="reviewer-info">
        <Image
          src={item.src}
          width={48}
          height={48}
          className="img"
          alt="person"
        />
        <div>
          <p className="name" >{item.name}</p>
          <p className="description" >{item.description}</p>
        </div>
      </div>
      <div className="review-block">
        <div className="review-header">
          <Image
            src="/images/quotes.png"
            width={22}
            height={18}
            alt="quotes"
            className="quotes"
          />

          <Ratings count={5} />
        </div>
        <p className="review">{item.review}</p>
      </div>
    </div>
  )
}
