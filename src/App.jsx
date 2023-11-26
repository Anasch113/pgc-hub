
import './App.css'

import Portal from "./Components/Auth/Portal"
import Home from './Components/Home/Home'
import toast, { Toaster } from 'react-hot-toast';
import Signup from "./Components/Auth/Signup"
import Dashboard from './Components/MainPortals/Dashboard';
import MainPortal from "./Components/MainPortals/MainPortal"
import ProtectedRoute from "./Components/ProtectedRoute"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Assignments from "./Components/MainPortals/Assignments"
import { UserAuthContextProvider } from './context/UserAuthContext'
import Aboutt from "./Components/Home/Aboutt"
import About from "./Components/Home/About"
import Profile from './Components/MainPortals/Profile';
import AddArticle from './Components/MainPortals/AddArticle';
import SingleUserAssignments from './Components/MainPortals/SingleUserAssignments';

import "react-multi-carousel/lib/styles.css";

function App() {


  return (
    <>
      <UserAuthContextProvider>
        <Router>

          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/portal' element={<Portal />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/aboutt' element={<Aboutt />} />
            <Route path='/portal/mainportal/dashboard' element={<ProtectedRoute >
              <Dashboard />

            </ProtectedRoute>} />
            <Route path='/portal/mainportal' element={
              <ProtectedRoute>
                <MainPortal />

              </ProtectedRoute>
            } />
             <Route path='/portal/profile' element={
              <ProtectedRoute>
                <Profile/>

              </ProtectedRoute>
            } />
             <Route path='/portal/mainportal/singleuserassignments/:userId' element={
              <ProtectedRoute>
                <SingleUserAssignments/>

              </ProtectedRoute>
            } />
            <Route path='/portal/mainportal/addassignments' element={
              <ProtectedRoute>
                <AddArticle/>

              </ProtectedRoute>
            } />
            <Route path='/portal/mainportal/assignments' element={<ProtectedRoute >
              <Assignments />

            </ProtectedRoute>} />
          </Routes>

        </Router>
      </UserAuthContextProvider>
      <div> <Toaster /></div>
      
    </>
  )
}

export default App
