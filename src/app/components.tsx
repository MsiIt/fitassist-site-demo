import styles from './styles.module.scss'
import Image from 'next/image'
import {ReviewsSwiper} from "~/components/swipers/ReviewsSwiper";
import {OpportunitiesSwiper} from "~/components/swipers/OpportunitiesSwiper";
import Subscribe from "~/components/modals/SubscriptionModals/Subscribe";
import GooglePlayLink from "~/components/buttons/GooglePlayLink";
import AppStoreLink from "~/components/buttons/AppStoreLink";
import {FunctionalBlock} from "~/components/functionalSection/FunctionalBlock";
import { FunctionalDetails } from '~/components/functionalSection/FunctionalDetails'

export const HomePageTitle = () => {
  return (
    <section className={styles.titleSection}>
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <div className="text-container">
              <p className="app-helper">Приложение-помощник</p>
              <h1 className="title">Вместе к лучшей версии себя</h1>
              <p className="subtitle">Начни свой путь к лучшей версии себя с нашим приложением. Тренируйся вместе с нами и достигай новых высот каждый день!</p>
              <div className="download-btns">
                <GooglePlayLink />
                <AppStoreLink />
              </div>
            </div>

            <div className="images">
              <Image
                className="circles only-xl"
                src="/images/title-circles.png"
                alt="title-circles"
                width={615}
                height={615}
                priority
              />

              <Image
                className="mobiles-app"
                src="/images/mobiles-app.png"
                alt="mobiles-app"
                width={478}
                height={603}
                priority
              />
            </div>

            <Image
              className="scroll-down only-xl"
              src="/images/scroll-down.svg"
              alt="google-play-button"
              width={27}
              height={40}
            />
          </div>
        </div>
      </div>
      <div className="bg">
        <div className="line line-1 hidden-lg" />
        <div className="line line-2" />
        <div className="line line-3" />
        <div className="line line-4" />
        <div className="line line-5 hidden-lg" />
      </div>
    </section>
  )
}

export const SubscriptionSection = () => {
  return (
    <section className={styles.subscriptionSection}>
      <div className="container">
        <div className="wrapper">
          <Image
            className="training-people"
            src="/images/training-people.png"
            alt="training-people"
            width={578}
            height={488}
            priority
          />

          <div className="text-container">
            <h2 className="title">Сделайте первый шаг к здоровому образу жизни!</h2>
            <div className="small-line hidden-xl" />
            <p className="subtitle">Fit Assist - удобное приложение-помощник для эффективных тренировок и занятий
              спортом. Поможет найти лучших тренеров, выстроить оптимальную программу тренировок и питания для
              эффективных
              занятий фитнесом.</p>

            <div className="subscribe-btn-block">
              <Subscribe />
            </div>
          </div>
        </div>
      </div>
      <div className="bg" />
    </section>
  )
}

export const OpportunitiesSection = () => {
  const swiperItems = [
    {
      id: 1,
      icon: 'book.png',
      title: 'Бесплатные программы тренировок',
      paragraph: 'Наше приложение предлагает бесплатные программы тренировок для всех уровней подготовки, чтобы вы могли тренироваться эффективно и без лишних затрат.',
    },
    {
      id: 2,
      icon: 'statistics.png',
      title: 'Индивидуальный план тренировок',
      paragraph: 'Наше приложение создает индивидуальные планы тренировок, адаптированные под ваши цели и уровень подготовки, чтобы вы могли тренироваться максимально эффективно.'
    },
    {
      id: 3,
      icon: 'flash.png',
      title: 'Видео по каждому упражнению',
      paragraph: 'Наше приложение предоставляет видеоинструкции по каждому упражнению, чтобы вы могли тренироваться правильно и безопасно.'
    },
    {
      id: 4,
      icon: 'flash.png',
      title: 'Поиск и подбор личного тренера',
      paragraph: 'Наше приложение помогает найти и подобрать личного тренера, который идеально соответствует вашим целям и уровню подготовки.'
    },
    {
      id: 5,
      icon: 'food.png',
      title: 'Бесплатные программы питания',
      paragraph: 'Наше приложение предлагает бесплатные программы питания, разработанные специалистами по здоровому и спортивному питанию, чтобы вы могли питаться правильно и достигать своих целей.'
    },
    {
      id: 6,
      icon: 'geolocation.png',
      title: 'Поиск тренажерного зала',
      paragraph: 'Наше приложение помогает найти ближайший тренажерный зал, соответствующий вашим предпочтениям и потребностям.'
    },
    {
      id: 7,
      icon: 'camera.png',
      title: 'Онлайн тренировки с трансляцией',
      paragraph: 'Наше приложение предлагает проводить онлайн тренировки с трансляцией, чтобы тренер мог наблюдать за выполнением упражнений, давать советы.'
    },
    { id: 0 },
  ]

  return (
    <section className={styles.opportunitiesSection}>
      <div className="container">
        <div className="wrapper">
          <div className="img-container">
            <div className="img-wrapper">
              <Image
                className="img hidden-lg"
                src="/images/person.png"
                alt="person"
                width={0}
                height={0}
                sizes="100vw"
                priority
              />
              <Image
                className="img-lg only-lg"
                src="/images/person-lg.png"
                alt="person"
                width={0}
                height={0}
                sizes="100vw"
                priority
              />
            </div>

            <div className="content-img">
              <h2>Возможности</h2>
              <div className="small-line" />
              <p className="description">Откройте для себя все возможности нашего приложения и начните свой путь к лучшей версии себя уже сегодня!</p>
            </div>
          </div>
          <div className="content">
            <OpportunitiesSwiper items={swiperItems}/>
          </div>
        </div>
      </div>
    </section>
  )
}

export const FunctionalSection = () => {
  return (
    <section className={styles.functionalSection}>
      <div className="container">
        <div className="wrapper">
          <FunctionalBlock />

          <div className="earn-block">
            <Image
              className="img hidden-md"
              src="/images/trainer-client.jpg"
              alt="trainer-client"
              width={660}
              height={360}
              priority
            />
            <Image
              className="img only-md"
              src="/images/trainer-client-full.jpg"
              alt="trainer-client"
              width={660}
              height={360}
              priority
            />
            <div className="text-block">
              <h4>Зарабатывай вместе с нами!</h4>
              <p>Есть авторская программа тренировок? Знаешь эффективный курс питания? Тогда подключайся к нашей
                программе тренерского сопровождения и начинай зарабатывать!</p>
              <FunctionalDetails />
            </div>
          </div>
        </div>
      </div>
      <div className="bg" />
    </section>
  )
}

export const ReviewsSection = () => {
  const reviewsPersonPhoto = [
    '/images/reviews-person/reviews-person-1.jpg',
    '/images/reviews-person/reviews-person-2.jpg',
    '/images/reviews-person/reviews-person-3.jpg',
    '/images/reviews-person/reviews-person-4.jpg',
    '/images/reviews-person/reviews-person-5.jpg',
  ]
  const reviews = [
    {
      id: 1,
      name: 'Алексей С.',
      src: '/images/reviews-person/reviews-person-1.jpg',
      description: 'Энтузиаст бега',
      review: 'FitAssist  - это отличное приложение для планирования тренировок. Удобный интерфейс и полезные функции делают его незаменимым для любого спортсмена.'
    },
    {
      id: 2,
      name: 'Мария Л.',
      src: '/images/reviews-person/reviews-person-2.jpg',
      description: 'Баскетболист',
      review: 'Приложение FitAssist помогло мне найти идеальных партнеров для тренировок и оставаться мотивированной. Теперь мои занятия спортом стали намного интереснее!'
    },
    {
      id: 3,
      name: 'Иван К.',
      src: '/images/reviews-person/reviews-person-3.jpg',
      description: 'Эксперт во всём',
      review: 'FitAssist  - это не просто приложение, это настоящий помощник в достижении спортивных целей. Рекомендую всем, кто хочет улучшить свою физическую форму!'
    },
    {
      id: 4,
      name: 'Анна П.',
      src: '/images/reviews-person/reviews-person-4.jpg',
      description: 'Новичок',
      review: 'FitAssist изменило мой подход к фитнесу. Я стала более организованной и мотивированной, а мои тренировки стали более эффективными!'
    },
    {
      id: 5,
      name: 'Екатерина М.',
      src: '/images/reviews-person/reviews-person-5.jpg',
      description: 'Легкоатлет',
      review: 'Приложение FitAssist помогло мне структурировать мои тренировки и следить за прогрессом. Теперь я точно знаю, что и когда нужно делать для достижения лучших результатов.'
    }
  ]

  return (
    <section className={styles.reviewsSection}>
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <div className="text-content">
              <h2>Что говорят пользователи</h2>
              <div className="small-line"/>
              <p>Узнайте, как наше приложение помогает людям достигать своих фитнес-целей и становиться лучшей версией себя!</p>
              <div className="reviews-icons">
                {reviewsPersonPhoto.map(r => {
                  return (
                    <div key={r} style={{marginRight: '-8px'}}>
                      <Image
                        src={r}
                        width={32}
                        height={32}
                        className="person"
                        alt="person"
                      />
                    </div>
                  )
                })}
                {/*<p className="reviews-count">1 560+</p>*/}
              </div>
            </div>
            <div className="reviews-content">
              <ReviewsSwiper items={reviews}/>
            </div>
          </div>
          <div className="image-container">
            <Image
              src="/images/woman-texting-phone-gym.png"
              alt="bg"
              width={756}
              height={1046}
              className="img"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export const DownloadSection = () => {
  return (
    <section className={styles.downloadSection}>
      <div className="container">
        <div className="wrapper">
          <div className="images">
            <Image
              className="circles"
              src="/images/download-circles.png"
              alt="circles"
              width={316}
              height={316}
            />

              <Image
                className="phone"
                src="/images/part-phone.png"
                alt="part-phone"
                width={279}
                height={285}
                priority
              />
              <div className="line"/>
          </div>

          <div className="text-content">
            <h2>Скачивайте прямо сейчас!</h2>
            <p className="subtitle">Не откладывай на завтра, скачивай и тренируйся сейчас!</p>
            <div className="download-btns">
              <GooglePlayLink className="link"/>
              <AppStoreLink className="link"/>
            </div>
          </div>
        </div>
      </div>
      <div className="bg"/>
    </section>
  )
}
