import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { userLoginReducer, userRegisterReducer } from '../reducers/userReducers';
import { noteListReducer } from '../reducers/notesReducer';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteList: noteListReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
});

export default store;
