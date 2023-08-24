import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeScore, changeAmount } from '../redux/questionsSlice'

export default function FinalScreen() {
  const { score } = useSelector(state => state.question)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleBackToSettings = () => {
    dispatch(changeScore(0));
    dispatch(changeAmount(50));
    navigate("/");
  };

  return (
    <Box>
      <Typography variant='h3' fontWeight='bold' mb={3}>
        Final Score {score}
      </Typography>
      <Button variant='outlined' onClick={handleBackToSettings}>Back to Settings</Button>
    </Box>
  )
}
