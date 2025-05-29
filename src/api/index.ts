import { instance } from './instance'
import config from '~/components/constants/config'
import { softTransfomEntity } from '~/components/modules/entity'

export class Api {
  static async getUserByUniqueToken(uniqueId) {
    const res = await instance.get(`/public/users/token/${uniqueId}`)
    res.data = softTransfomEntity(res.data)
    return res
  }

  static async login(data: { email: string; password: string }) {
    return await instance.post('/auth/login', {
      ...data,
      application: Number(config.APPLICATION_ID),
    })
  }

  static async getSelf() {
    const res = await instance.get('/public/users')
    res.data = softTransfomEntity(res.data)
    return res
  }

  static async getSubscriptionsList() {
    const res = await instance.get(
      `/public/in-app-purchases/subscriptions/${config.APPLICATION_ID}`
    )
    return res
  }

  static async initSubscriptions(data: {
    tariffId?: number
    subscriptionId?: number
  }) {
    return await instance.post('/public/transactions', data)
  }

  static async initSubscriptionsNoAuth(data: {
    userId?: number
    tariffId?: number
    subscriptionId?: number
  }) {
    return await instance.post('/public/transactions/no-auth', data)
  }

  static async createAppealConsultation(email: string) {
    return await instance.get(`/appeals/${email}`)
  }

  static async getSurveyList(data) {
    return await instance.post(`/public/entities/survey/list`, data)
  }

  static async sendSurveyForm(data) {
    return await instance.post('/public/entities/surveyAnswerPack', data)
  }
}
