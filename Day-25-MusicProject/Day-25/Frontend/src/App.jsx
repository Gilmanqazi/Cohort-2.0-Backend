import React from 'react'
import Login from './features/Auth/pages/Login'
import Register from './features/Auth/pages/Register'
import { Routes,Route } from 'react-router-dom'
import Home from './features/home/pages/Home'
import Protected from './features/Auth/components/Protected'
import AuthPage from './features/Auth/pages/AuthPage'
import FaceExpression from './features/Expression/components/FaceExpression'
import UploadSong from './features/home/components/UploadSong'
import MoodDetect from './features/Expression/components/MoodDetect'
import Player from './features/home/components/Player'

const App = () => {
  return (
    <div className='bg-black h-screen w-full text-white'>
      <Routes>
<Route path='/' element={<Protected><Home/></Protected>}/>
        <Route path='/authpage' element={<AuthPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/moodDetect' element={<MoodDetect/>}/>
        <Route path='/uploadSong' element={<UploadSong/>}/>
        <Route path='*' element={<h1>404 PAGE NOT FOUND</h1>}/>
      </Routes>

    </div>
  )
}

export default App