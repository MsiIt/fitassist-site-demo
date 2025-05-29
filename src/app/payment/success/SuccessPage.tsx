'use client'

import React, {useEffect} from "react";
import Image from "next/image";
import {Button, DialogTitle} from "@mui/material";
import styles from "./styles.module.scss";
import {useRouter} from "next/navigation";

const SuccessPage = () => {
  const router = useRouter()

  const goHome = () => {
    router.push('/')
  }

  return (
    <div className={styles.wrapperModal}>
      <div className={styles.content}>
        <Image
          src={'/images/tick.png'}
          width={200}
          height={200}
          alt="apple-pay"
        />
        <DialogTitle style={{fontSize: 36, fontWeight: '600', padding: 36, lineHeight: '40px', textAlign: 'center'}}>
          Успешно</DialogTitle>
        <p style={{fontSize: 22, fontWeight: '400', lineHeight: '24px', paddingBottom: 45, textAlign:'center'}}>
          Поздравляем, Вы успешно приобрели подписку
        </p>

        <Button variant={"contained"} onClick={goHome} sx={{ width:200, height:50 }}> На главную</Button>
      </div>

    </div>
  );
}


export default SuccessPage
