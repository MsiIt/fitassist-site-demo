'use client'

import Image from 'next/image'
import styles from "~/components/modals/SubscriptionModals/styles.module.scss";
import {Button, CircularProgress} from "@mui/material";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Api} from "~/api";

const UserInfo = ({user, closeModal, tariff}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const openTransactions = async () => {
    setLoading(true)
    try {
      const resTransaction = await Api.initSubscriptionsNoAuth({ tariffId: tariff.id, subscriptionId: tariff.subscriptionId, userId: user.id})

      if (resTransaction.data) {
        router.push(resTransaction.data?.link)
      }

    } catch (error) {
      console.warn(error)
    } finally {
      setLoading(false)
    }
  }

  const goBack = () => {
    closeModal()
  }

  return (
   <div>
     <div style={{}}> <h4 style={{
       color:'#7D5CE3'
     }}>Это ваш аккаунт?</h4></div>
     <div className={styles.userInfo}>
       <div style={{width:48, height:48}}>
         <Image
           src={user?.properties?.avatar?.value?.[0]?.url ?? '/images/profile-male.png'}
           alt="avatar"
           width={48}
           height={48}
           style={{borderRadius:'50%'}}
           priority
           layout=''
           objectFit='cover'
         />
       </div>

       <div >
         <div style={{fontSize:20, fontWeight:'600',
           color: '#7D5CE3',
         }}> {user?.properties?.name?.value} {user?.properties?.surname?.value}</div>
       </div>
     </div>
      <div style={{display:'flex', gap:20, justifyContent:'center'}}>
        <Button variant={"contained"} onClick={openTransactions} sx={{ width:130, height:50 }} disabled={loading}> {!loading ? 'Да' : <CircularProgress size={20} sx={{color: 'white'}}/>}</Button>
        <Button variant={"contained"} onClick={goBack} sx={{ width:130, height:50 }} disabled={loading}>Нет</Button>
      </div>
   </div>
  )
}

export default UserInfo


