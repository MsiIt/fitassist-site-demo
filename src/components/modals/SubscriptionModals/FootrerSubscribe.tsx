'use client'

import Image from "next/image";


import styles from "~/components/modals/SubscriptionModals/styles.module.scss";

const FooterSubscribe = () => {

  return (
   <div className={styles.footer}>
    <div><p  className={styles.info} >© 2024 Fit Assist</p></div>
     <div className={styles.items}>
       <p>Белкард</p>
       <p>МИР</p>
       <p>VISA</p>
       <p>Mastercard</p>
       <Image
         src={'/images/apple-pay-purple.png'}
         width={34}
         height={15}
         alt="apple-pay"
       />
     </div>
   </div>
  )
}

export default FooterSubscribe
