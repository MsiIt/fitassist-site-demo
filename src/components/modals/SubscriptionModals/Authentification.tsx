'use client'

import {Box, Button, CircularProgress, Tab, Tabs} from '@mui/material'
import {SyntheticEvent, useEffect, useRef, useState} from 'react'
import styles from './styles.module.scss'
import TextInput from "~/components/inputs/TextInput";
import {FormProvider, useForm} from 'react-hook-form'
import {Api} from "~/api";
import {TOKEN_COOKIE_KEY} from "~/components/constants/auth";
import moment from 'moment'
import Cookies from "universal-cookie";
import UserInfo from "~/components/modals/SubscriptionModals/UserInfo";
import InfoAboutIdModal from "~/components/modals/SubscriptionModals/TooltipModal/InfoAboutIdModal";
import {useRouter} from "next/navigation";
import {getTariff, planCode} from './Subscribe';
import Image from "next/image";

const cookies = new Cookies()

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ paddingTop: '24px', width:300 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

enum TabsId {
  UniqueToken = 0,
  Email = 1,
}
const TAB_DATA = [
  { title: 'По ID-профиля', id: TabsId.UniqueToken },
  { title: 'Через Email', id: TabsId.Email },
]


const Authentification = ({closeModal}) => {
  const router = useRouter()
  const modalRef = useRef()
  const [tabValue, setTabValue] = useState<number>(TabsId.UniqueToken)
  const [loading, setLoading] = useState(false)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [userInfo, setUserInfo] = useState(false)
  const [error, setError] = useState(false)
  const [tariff, setTariff] = useState()
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSubscriptionId = await Api.getSubscriptionsList();
        const url = window.location.origin;
        const containsRu = url.includes('.ru');
        const containsBy = url.includes('.by');

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
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setError(false)
  }

  const methods = useForm({
    defaultValues: {
      uniqueToken: '',
      email: '',
      password: '',
    },
  })

  const confirmationById = async (data)=> {
    const { uniqueToken } = data
    const uniqueId = uniqueToken
    try {
      setLoading(true)
      const res = await Api.getUserByUniqueToken(uniqueId)
      if (res.data) {
        setUserInfo(res.data)
        setIsCurrentUser(true)
      }
      methods.reset()
    } catch (error) {
      setError(true)
      console.warn(error)
    } finally {
      setLoading(false)
    }
  }
  const authenticationByEmail= async (data)=> {
    const {  email, password } = data
    try {
      setLoading(true)
      const res = await Api.login({ email, password })
      cookies.set(TOKEN_COOKIE_KEY, res.data.accessToken, {
        path: '/',
        expires: moment().add(7, 'day').toDate(),
      })
        const resTransaction = await Api.initSubscriptions({tariffId:tariff?.id, subscriptionId:tariff?.subscriptionId })

        if (resTransaction) {
          router.push(resTransaction?.data?.link)
        }
      // methods.reset()
    } catch (error) {
      setError(true)
      console.warn(error)
    } finally {
      setLoading(false)
    }
  }

  const handleClickOpen = () => {
    modalRef.current?.open()
  }

  const handleClose = () => {
    modalRef.current?.dismiss()
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div  style={{marginBottom:20}}>

      {isCurrentUser
        ? <UserInfo user={userInfo} closeModal={closeModal} tariff={tariff}/>
        : <FormProvider {...methods}>
          <div className={styles.dialog}>
            <div className='body'>
              <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example" inkBarStyle={{background: 'red'}}
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: "#B09AF1",
                      }
                    }}
              >
                {TAB_DATA.map((el, index)=> {
                  return(
                    <Tab label={el.title} {...a11yProps(el.id)} key={index} />
                  )
                })}
              </Tabs>

              <CustomTabPanel value={tabValue} index={0} sx={{margin:0, padding:0}}>

                  <div className="fields">
                    <div style={{display:'flex', justifyContent:'space-between', gap:20}}>
                      <TextInput
                        source="uniqueToken"
                        autoFocus
                        required
                        sx={{fontSize: 34, width:'100%', '& .MuiFormHelperText-root': {
                            color: '#DF1E1EE0',
                          }
                        }}

                        label={'ID-ПРОФИЛЯ'}
                        error={error}
                        helperText={error && "Проверьте введенный ID-ПРОФИЛЯ"}

                      />
                      <InfoAboutIdModal ref={modalRef} handleClose={handleClose} />
                        <Button onClick={handleClickOpen} sx={{minWidth:'50px', height:'55px', padding:0, fontSize:20}} >
                          ?
                        </Button>
                    </div>


                    <Button onClick={methods.handleSubmit(confirmationById)} sx={{width: '130px', height: '50px'}}>
                      {!loading ? 'Продолжить' : <CircularProgress size={20} sx={{color: 'white'}}/>}
                    </Button>
                  </div>


              </CustomTabPanel>

              <CustomTabPanel value={tabValue} index={1}>

                <div className="fields">
                  <TextInput
                    source="email"
                    required
                    type="email"
                    // pattern={{
                    //   value: /\S+@\S+\.\S+/,
                    //   message: 'Entered value does not match email format',
                    // }}
                    label={'Email'}
                    sx={{ '& .MuiFormHelperText-root': {
                      color:'#DF1E1EE0',
                    }}}
                    error={error}
                    helperText={error && "Проверьте введенный email"}
                  />

                  <TextInput
                    source="password"
                    required
                    type={showPassword ? "text" : "password"} // Переключение типа
                    label={"Password"}
                    sx={{
                      '& .MuiFormHelperText-root': {
                        color: '#DF1E1EE0',
                      },
                    }}
                    error={error}
                    helperText={error && "Проверьте введенный password"}
                    InputProps={{
                      endAdornment: (
                        <EyeIcon active={showPassword} onPress={togglePasswordVisibility}/>
                      ),
                    }}
                  />


                  <Button variant={"contained"} onClick={methods.handleSubmit(authenticationByEmail)} sx={{width:'130px', height:'50px'}} disabled={loading}>
                    {!loading ? 'Продолжить' : <CircularProgress size={20} sx={{ color:'white' }} />}
                  </Button>
                </div>
              </CustomTabPanel>
            </div>
          </div>
        </FormProvider>
        }

    </div>
  )
}

const EyeIcon= ({ onPress, active }) => {
  return  (
    <Image
      onClick={onPress}
      src={active ? "/images/eye-show.png" : "/images/eye-hide.png"}
      alt="eye"
      width={35}
      height={35}
      priority
    />
  )
}


export default Authentification
