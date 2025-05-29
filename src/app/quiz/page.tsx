'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import RadioInput from '~/components/inputs/RadioInput'
import classNames from 'classnames'
import TextInput from '~/components/inputs/TextInput'
import { Button } from '@mui/material'
import { Api } from '~/api'

const booleanVariants = [
  { id: 1, value: 'Да' },
  { id: 2, value: 'Нет' },
]

export default function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('process')
  const [isError, setIsError] = useState(false)
  const [survey, setSurvey] = useState({})
  const [surveyTitle, setSurveyTitle] = useState('')
  const [surveyDescription, setSurveyDescription] = useState('')
  const [questions, setQuestions] = useState([])
  const [questionsIds, setQuestionsIds] = useState([])

  useEffect(() => {
    const getList = async () => {
      const query = await Api.getSurveyList({
        application: 1,
        pull: {
          properties: true,
          relations: [
            {
              symbolCode: 'surveyQuestion',
              entities: {
                properties: true,
              },
            },
          ],
        },
      })

      setSurvey(query?.data?.rows?.[0])
    }
    getList()
  }, [])

  useEffect(() => {
    if (survey.id){
      setSurveyTitle(
        survey?.properties?.find(prop => prop.symbolCode === 'title')?.value
      )
      setSurveyDescription(
        survey?.properties?.find(prop => prop.symbolCode === 'description')?.value
      )
      setQuestions(
        survey?.relations?.[0]?.entities?.map((e, index) => ({
          ...e,
          id: index + 1,
        }))
      )
      setQuestionsIds(survey?.relations?.[0]?.entities?.map(e => e.id))
    }
  }, [survey])

  const question = questions?.find(q => q.id === currentQuestion)

  const questionTitle = question?.properties?.find(
    prop => prop.symbolCode === 'text'
  )?.value
  const questionHasBooleanAnswerVariant = question?.properties?.find(
    prop => prop.symbolCode === 'hasBooleanAnswerVariant'
  )?.value
  const questionHasCommentAnswerVariant = question?.properties?.find(
    prop => prop.symbolCode === 'hasCommentAnswerVariant'
  )?.value

  const methods = useForm()

  useEffect(() => {
    if (questions.length) {
      methods.setValue('answers', questions?.map(q => {
        return ({
          questionId: q?.id,
          value: '',
          comment: '',
        })
      }))
    }
  }, [questions])

  const handleNextQuestion = () => {
    if (questionHasBooleanAnswerVariant) {
      const currentValue =
        methods.getValues().answers[currentQuestion - 1].value
      if (currentValue) {
        if (currentQuestion === questions?.length - 1) {
          setStatus('email')
        }
        methods.setValue(`answers.${currentQuestion}.value`, null)
        methods.setValue(`answers.${currentQuestion}.comment`, null)
        setCurrentQuestion(currentQuestion + 1)
        setIsError(false)
      } else {
        setIsError(true)
      }
    } else {
      if (currentQuestion === questions?.length - 1) {
        setStatus('email')
      }
      methods.setValue(`answers.${currentQuestion}.value`, null)
      methods.setValue(`answers.${currentQuestion}.comment`, null)
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion === questions?.length) {
      setStatus('process')
    }
    setCurrentQuestion(currentQuestion - 1)
    setIsError(false)
  }

  const handleFinishQuiz = async () => {
    try {
      const answersRequest = methods
        .getValues()
        .answers.map((answer, index, arr) => {
          if (index === arr.length - 2) {
            return {
              properties: [
                {
                  symbolCode: 'answer',
                  value: answer.comment ?? '',
                },
              ],
              relations: [
                {
                  symbolCode: 'surveyQuestion',
                  entities: [
                    {
                      id: questionsIds?.[index],
                    },
                  ],
                },
              ],
            }
          }

          if (index === arr.length - 1) {
            return {
              properties: [
                {
                  symbolCode: 'answer',
                  value: methods.getValues().email ?? '',
                },
              ],
              relations: [
                {
                  symbolCode: 'surveyQuestion',
                  entities: [
                    {
                      id: questionsIds?.[index],
                    },
                  ],
                },
              ],
            }
          }

          return {
            properties: [
              {
                symbolCode: 'answer',
                value: answer.value === '1' ? true : false,
              },
              {
                symbolCode: 'comment',
                value: answer.comment ?? '',
              },
            ],
            relations: [
              {
                symbolCode: 'surveyQuestion',
                entities: [
                  {
                    id: questionsIds?.[index],
                  },
                ],
              },
            ],
          }
        })

      const reqData = {
        application: 1,
        relations: [
          {
            symbolCode: 'surveyAnswer',
            entities: answersRequest,
          },
        ],
        pull: {
          properties: true,
          users: true,
          relations: [
            {
              symbolCode: 'surveyAnswer',
              entities: {
                properties: true,
                relations: [
                  {
                    symbolCode: 'surveyQuestion',
                    entities: {
                      properties: true,
                    },
                  },
                ],
              },
            },
          ],
        },
      }

      const result = await Api.sendSurveyForm(reqData)

      setStatus('finish')
    } catch (err) {
      console.log({ err })
    }
  }

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 0)
  }, [currentQuestion])

  return (
    <main className={styles.quizForm}>
      <div className={'description-container'}>
        {status !== 'finish' && (
          <>
            {surveyTitle && <p className="description-title">{surveyTitle}</p>}
            {surveyDescription && (
              <p className="description-subtitle">{surveyDescription}</p>
            )}
          </>
        )}
        {status === 'finish' && (
          <>
            <p className="description-title">Спасибо, что уделили нам время!</p>
            <p className="description-subtitle">
              Команда Fit Assist неустанно работает над улучшением приложения,
              чтобы сделать ваши тренировки еще более эффективными и приятными.
              Мы постоянно анализируем ваши отзывы и предложения, чтобы
              создавать новые функции и улучшать существующие. Наша цель —
              помочь вам достичь ваших фитнес-целей с максимальным комфортом и
              мотивацией.
            </p>
          </>
        )}
      </div>
      <FormProvider {...methods}>
        {status !== 'finish' && (
          <div className="quiz-form-wrapper">
            {loading && <></>}
            {!loading && (
              <>
                {currentQuestion < questions?.length && (
                  <div className="quiz-form-content">
                    {questionTitle && (
                      <p className="question-title">{questionTitle}</p>
                    )}

                    {questionHasBooleanAnswerVariant && (
                      <>
                        <RadioInput.Group
                          key={currentQuestion}
                          className={!isError ? 'question-radio-group' : ''}
                          source={`answers[${currentQuestion - 1}].value`}
                        >
                          {booleanVariants.map(variant => {
                            return (
                              <label
                                key={variant.id}
                                htmlFor={variant.id.toString()}
                                className={classNames(
                                  styles.directionVariantButton
                                )}
                                onClick={() => setIsError(false)}
                              >
                                <RadioInput.Item
                                  value={variant.id}
                                  nodeId={variant.id.toString()}
                                />
                                <span>{variant.value}</span>
                              </label>
                            )
                          })}
                        </RadioInput.Group>
                        {isError && (
                          <p className="error-text">Вы не указали ответ</p>
                        )}
                      </>
                    )}
                    {questionHasCommentAnswerVariant && (
                      <TextInput
                        key={currentQuestion}
                        placeholder="Комментарий"
                        source={`answers[${currentQuestion - 1}].comment`}
                        multiline
                        multilineStyle={{
                          padding: 0,
                          minHeight: 'auto',
                        }}
                        sx={{
                          width: '100%',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '16px',
                            borderColor: '#E6DEFE',
                          },
                          '& .MuiOutlinedInput-input': {
                            padding: '12.5px',
                            color: '#B09AF1',
                          },
                          '& :hover': {
                            color: '#000000',
                          },
                          '& :focus': {
                            color: '#000000',
                          },
                        }}
                      />
                    )}
                  </div>
                )}
                {currentQuestion === questions?.length && (
                  <div className="quiz-form-content">
                    <p className="email-title">{questionTitle}</p>
                    <TextInput
                      placeholder="Email"
                      source={`email`}
                      sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '16px',
                          borderColor: '#E6DEFE',
                        },
                        '& .MuiOutlinedInput-input': {
                          padding: '12.5px',
                          color: '#B09AF1',
                        },
                        '& :hover': {
                          color: '#000000',
                        },
                        '& :focus': {
                          color: '#000000',
                        },
                      }}
                    />
                  </div>
                )}

                <div className="quiz-bottom">
                  <div className="button-container">
                    <Button
                      variant={'contained'}
                      onClick={handlePrevQuestion}
                      sx={{
                        height: 48,
                        visibility:
                          currentQuestion === 1 ? 'hidden' : 'visible',
                      }}
                    >
                      Назад
                    </Button>
                    {currentQuestion < questions?.length && (
                      <Button
                        variant={'contained'}
                        onClick={handleNextQuestion}
                        sx={{ height: 48 }}
                      >
                        Далее
                      </Button>
                    )}
                    {currentQuestion === questions?.length && (
                      <Button
                        variant={'contained'}
                        onClick={handleFinishQuiz}
                        sx={{ height: 48 }}
                      >
                        Завершить
                      </Button>
                    )}
                  </div>
                  {questions?.length > 0 && (
                    <p className="counter">
                      {currentQuestion}/{questions.length}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </FormProvider>

      {status !== 'finish' && (
        <div className="form-footer">
          <p className="footer-text">© 2024 Fit Assist</p>
        </div>
      )}
    </main>
  )
}
