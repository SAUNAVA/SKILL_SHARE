import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUserFromStorage } from './features/auth/authSlice';
// import { fetchUserProfile } from './features/auth/authSlice';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/DashBoard';
import ProfileSetup from './pages/ProfilePage';
import ProfilePage from './pages/ProfileDisplay';
import FindMentor from './pages/FindMnetor';
import RequestPage from './pages/RequestPage';
import MySessions from './pages/MySessions';
import MentorDetails from './pages/MentorDetails';
import SessionRequests from './pages/MentorPages/SessionRequests';

function App() {
  
  const dispatch = useDispatch();
  // const token = localStorage.getItem("token")
  const {token} = useSelector((state)=>state.auth) 
  // const navigate = useNavigate()

  

  useEffect(() => {
    dispatch(loadUserFromStorage());
    
  }
  , [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token?<Navigate to="/dashboard"/>:<LandingPage/>}/>
        <Route path="/login" element={token?<Navigate to="/dashboard"/>:<Login/>}/>
        <Route path="/register" element={token?<Navigate to="/dashboard"/>:<Register/>}/>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path='/profile-setup' element={<PrivateRoute><ProfileSetup/></PrivateRoute>}/>
        <Route path='/profile' element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
        <Route path='/find-mentor' element={<PrivateRoute><FindMentor/></PrivateRoute>}/>
        <Route path='/request-session/:mentorId' element={<PrivateRoute><RequestPage/></PrivateRoute>}/>
        <Route path='/my-sessions' element={<PrivateRoute><MySessions/></PrivateRoute>}/>
        <Route path='/mentor/:mentorId' element={<MentorDetails/>}/>
        <Route path='/session-requests' element={<PrivateRoute><SessionRequests/></PrivateRoute>}/>
        
        
      </Routes>
    </Router>
  )
}

export default App
