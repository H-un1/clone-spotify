import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const {audioRef, track, songsData} = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      {
        songsData.length != 0
        ? <>
          <div className='h-[90%] flex'>
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
        : null
      }
    
      <audio ref={audioRef} src={track?track.file:""} preload='auto'></audio>
      <ToastContainer />
    </div>
  )
}

export default App
