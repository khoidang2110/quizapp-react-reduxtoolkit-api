import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { decode } from 'html-entities';
import { changeScore } from '../redux/questionsSlice'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export default function Questions() {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score
  } = useSelector(state => state.question)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`

  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`)
  }

  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`)
  }

  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`)
  }

  const { response, loading } = useAxios({ url: apiUrl })

  const [questionIndex, setQuestionIndex] = useState(0)

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const questions = response.results[questionIndex];
      console.log('res pon', response)

      let answers = [...questions.incorrect_answers];
      answers.splice(getRandomInt(questions.incorrect_answers.length), 0, questions.correct_answer);
      setOptions(answers)
    }
  }, [response, questionIndex])

  console.log({ options })

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    )
  }

  const handleAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(changeScore(score + 1))
    }
    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(preState => preState + 1)
    } else {
      navigate('/score')
    }
  }

  return (
    <Box>
      <Typography variant='h4' mb={2}>Question {questionIndex + 1}</Typography>
      <Typography mb={2} >
        {decode(response.results[questionIndex].question)}
      </Typography>
      {options.map((name, index) => (
        <Box mb={2} key={index}>
          <Button variant='contained' fullWidth onClick={handleAnswer}>{name}</Button>
        </Box>
      ))}
      <Box mt={5}>
        Score: {score} / {response?.results.length}
      </Box>

    </Box>
  )
}

