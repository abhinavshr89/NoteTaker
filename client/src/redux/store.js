import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { userLoginReducer, userRegisterReducer } from '../reducers/userReducers';
import { noteListReducer } from '../reducers/notesReducer';
import { noteDeleteReducer ,noteCreateReducer,noteUpdateReducer} from '../reducers/notesReducer';
const reducer = combineReducers({
  noteList: noteListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteCreate: noteCreateReducer,
  noteDelete: noteDeleteReducer,
  noteUpdate: noteUpdateReducer,
  
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
