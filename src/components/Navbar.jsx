import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
    const navigate=useNavigate();
    const {userData,backendUrl,setUserData,setIsLoggedIn}=useContext(AppContext);
    const logout=async()=>{
        try {
            axios.defaults.withCredentials=true;
            const {data}=await axios.post(backendUrl+'/api/auth/logout')
            if(data.success){
                setIsLoggedIn(false);
                setUserData(false);
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const sendVerifivationOtp=async()=>{
        try {
            axios.defaults.withCredentials=true;
            const {data}=await axios.post(backendUrl+'/api/auth/send-verify-otp')
            console.log(data)
            if(data.success){
                navigate('/email-verify')
                toast.success(data.message)
            }

            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={assets.logo} alt="logo" className='w-28 sm:w-32 '/>

      {userData ? 
      <div className='w-8 cursor-pointer h-8 flex justify-center items-center rounded-full group bg-black text-white relative '>
            {userData.name[0].toUpperCase()}
            <div className='absolute hidden w-32 group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                <ul className='border rounded-md border-slate-300 p-2 cursor-pointer'>

                    {!userData.isAccountVerified && 
                    <li onClick={sendVerifivationOtp} className='hover:bg-gray-300 px-2 py-1 rounded-md'>Verify-Email</li>
                    }
                    <li onClick={logout} className='hover:bg-gray-300 px-2 py-1 rounded-md'>Logout</li>
                </ul>
            </div>
      </div> :
        <button onClick={()=>navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>Login
         <img src={assets.arrow_icon} alt="" />
      </button>
      }
    
    </div>
  )
}

export default Navbar
