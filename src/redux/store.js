import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './questionsSlice';

const store = configureStore({
  reducer: {
    question: questionReducer
  },
});

export default store;
