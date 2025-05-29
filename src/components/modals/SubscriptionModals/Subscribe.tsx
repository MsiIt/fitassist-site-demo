"use client"

import {useEffect, useRef, useState} from "react";
import MainModal from "~/components/modals/SubscriptionModals/MainModal";
import {Button, CircularProgress} from "@mui/material";
import {Api} from "~/api";
import {useRouter} from 'next/navigation'
import Cookies from "universal-cookie";

export const planCode = "monthly-premium-subscription";

export const  getTariff = (tariffs, planCode, symbolCode) =>
  tariffs.find(tariff => {
     return tariff.planCode === planCode && tariff.currency.symbolCode === symbolCode
    }
  );



const Subscribe = () => {
  const modalRef =useRef();
  const router = useRouter()
  const cookies = new Cookies()
  const token = cookies.get('token')

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [transaction, setTransaction] = useState()
  const [tariff, setTariff] = useState()

  useEffect(() => {

    const fetchData = async () => {

      const url = window.location.origin;
      const containsRu = url.includes('.ru');
      const containsBy = url.includes('.by');

      try {
        setLoading(true)
        try {
          const resUser = await Api.getSelf()
          if (resUser){
            setUser(resUser.data)
            const resSubscriptionId = await Api.getSubscriptionsList()

            if (resSubscriptionId.data) {
              const tariffs = resSubscriptionId.data[0]?.tariffs || [];
              let tariffToSet = null;

              if (containsRu) {
                tariffToSet = getTariff(tariffs, planCode, 'RUB');
              } else if (containsBy) {
                tariffToSet = getTariff(tariffs, planCode, 'BYN');
              }

              if (tariffToSet) {
                setTariff(tariffToSet);
              }

              const resTransaction = await Api.initSubscriptions({tariffId: tariffToSet?.id, subscriptionId: tariffToSet?.subscriptionId })

              setTransaction(resTransaction.data);
            }
          }
        } catch (e){
          console.warn(e)
        }

      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false)
      }
    };

    if(!!token){
      fetchData()
    }
  }, []);

  const openSubscriptionModal = () => {
    if (user?.id && transaction) {
      // setLoading(true)
      router.push(transaction?.link)
    } else modalRef.current?.open();
  }

  const closeModal = () => {
    modalRef.current?.dismiss();
  }

  return (
    <>
      <Button variant={"contained"} onClick={openSubscriptionModal} sx={{ width:200, height:50 }}>{
        !loading ? 'Оформить подписку' : <CircularProgress size={20} sx={{ color:'white' }} />}</Button>

      <MainModal ref={modalRef} tariff={tariff} user={user} closeModal={closeModal}/>
    </>
  )
}
export default Subscribe
