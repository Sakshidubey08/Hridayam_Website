import React from 'react'
import logo from './images/image 7365.png'

const Loadingpage = () => {
  return (
    <div className='  h-screen w-screen flex items-center justify-center '>
      <img className=' h-10 md:h-30 animate-pulse' src={logo}></img>
    </div>
  )
}

export default Loadingpage
