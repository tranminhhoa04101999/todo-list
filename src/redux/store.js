import {} from 'react-redux';
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';

export const addTask = createAction('addTask');
export const completedSub = createAction('completedSub');
export const percentComplete = createAction('percentComplete');

const INITIAL_TASK = [
  {
    name: 'Design UI',
    subTask: [
      { name: 'Design login', isCompleted: false },
      { name: 'Design Logout', isCompleted: false },
      { name: 'Design Home', isCompleted: false },
    ],
  },
  {
    name: 'Design UI',
    subTask: [
      { name: 'Design login', isCompleted: false },
      { name: 'Design Logout', isCompleted: false },
      { name: 'Design Home', isCompleted: false },
    ],
  },
  {
    name: 'Fetch API',
    subTask: [
      { name: 'Get data', isCompleted: false },
      { name: 'Update Data', isCompleted: true },
    ],
  },
];
const rootReducer = createReducer(INITIAL_TASK, {
  addTask: (state, action) => {
    state.push(action.payload);
  },
  completedSub: (state, action) => {
    let iTask = action.payload.indexTask;
    let iSubTask = action.payload.indexSubTask;
    state[iTask].subTask[iSubTask].isCompleted = true;
  },
  percentComplete: (state, action) => {
    return 2;
  },
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
