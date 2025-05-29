import Image from "next/image";
import styles from "./styles.module.scss";

export const OpportunitySwiperItem = ({item}) => {
  return (
    <div key={item.id} className={styles.opportunitiesSwiperItem}>
      {item.icon && (
        <div className="icon-container">
          <Image
            className="icon"
            src={`/images/${item.icon}`}
            alt="person"
            width={36}
            height={36}
            priority
          />
        </div>
      )}
      <div className="text">
        <p className="title">{item.title}</p>
        <p className="paragraph">{item.paragraph}</p>
      </div>
    </div>
  )
}
