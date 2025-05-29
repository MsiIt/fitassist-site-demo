'use client'

import React from "react";
import Image from "next/image";
import {Button, DialogTitle} from "@mui/material";
import styles from "./styles.module.scss";
import {useRouter} from "next/navigation";

const FailurePage = () => {
  const router = useRouter()

  const goHome = () => {
    router.push('/')
  }

  return (
      <div className={styles.wrapperModal}>
        <div className={styles.content} style={{paddingTop: 40}}>
          <Image
            src={'/images/cancel.png'}
            width={150}
            height={150}
            alt="apple-pay"
          />
          <DialogTitle style={{fontSize: 36, fontWeight: '600', padding: 36, lineHeight: '40px', textAlign: 'center'}}>
            Оплата отклонена</DialogTitle>
          <p style={{fontSize: 22, fontWeight: '400', lineHeight: '24px', paddingBottom: 45, textAlign: 'center'}}>
            Что-то пошло не так, попробуйте позже
          </p>

          <Button variant={"contained"} onClick={goHome} sx={{width: 200, height: 50}}> На главную</Button>
        </div>
      </div>
)
}


export default FailurePage
