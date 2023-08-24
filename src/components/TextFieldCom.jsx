import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FormControl, TextField, Box } from '@mui/material';

import { changeAmount } from '../redux/questionsSlice';

function TextFieldCom() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleChange = (event) => {
    setHasInteracted(true);
    const value = parseInt(event.target.value);

    if (!isNaN(value) && value >= 1 && value <= 50) {
      setInputValue(event.target.value);
      dispatch(changeAmount(value));
    } else {
      setInputValue(event.target.value);
    }
  };

  const isInvalidInput = hasInteracted && (isNaN(inputValue) || !(inputValue >= 1 && inputValue <= 50));

  return (
    <Box mt={3}>
      <FormControl fullWidth size="small">
        <TextField
          label="Amount of Questions"
          variant="outlined"
          type="number"
          size="small"
          value={inputValue}
          onChange={handleChange}
          inputProps={{
            min: 1,
            max: 50,
          }}
          error={isInvalidInput}
          helperText={isInvalidInput && 'Please enter a number from 1 to 50'}
        />
      </FormControl>
    </Box>
  );
}

export default TextFieldCom;
