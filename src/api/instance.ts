import axios from "axios";
import config from "~/components/constants/config";
import Cookies from "universal-cookie";

const cookies = new Cookies()

export const instance = axios.create({
  baseURL: config.BASE_URL,
  headers: { 'auth-type': 'jwt', },
})

instance.interceptors.request.use(config => {
  config.headers['auth-access-token'] = cookies.get('token')
  config.headers['auth-type'] = cookies.get('auth-type')

  return config
})
