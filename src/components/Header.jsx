import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Header = () => {
    const {userData}=useContext(AppContext);

  return (
    <div className='h-screen flex flex-col items-center px-4 justify-center text-center'>
      <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6'/>

        <h1 className='flex items-start gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : "Developer" }
            <img src={assets.hand_wave} alt="" className='w-8 aspect-square'/>
        </h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our app</h2>
        <p className=''>Let's start with a quick product tour and we will have you up and runnning in no time!</p>

        <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>
            Get Started
        </button>
    </div>
  )
}

export default Header
