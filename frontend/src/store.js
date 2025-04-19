import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import sessionReducer from './features/sessionSlice';
import mentorRequestsReducer from './features/mentorSlice'

const store = configureStore({
    reducer:{
        auth : authReducer,
        session : sessionReducer,
        mentorSessions : mentorRequestsReducer
    },
    devTools: true
})

export default store;