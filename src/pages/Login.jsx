import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = () => {
    const [state,setState]=useState('Sign Up')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate();
    const {backendUrl,setIsLoggedIn,getUserData}=useContext(AppContext);

    const onSubmitHandler=async (e)=>{
        try {
            e.preventDefault();
            axios.defaults.withCredentials=true;
            if(state === 'Sign Up'){
                const {data}=await axios.post(`${backendUrl}/api/auth/register`,{
                    name,email,password
                })
            if(data.success){
                setIsLoggedIn(true);
                // navigate('/verify-email');
                getUserData();
                navigate('/');

            }
            else{
                toast.error(data.message);
            }
            }
            else{
                const {data}=await axios.post(`${backendUrl}/api/auth/login`,{
                email,password})
                console.log(data);
            if(data.success){
                setIsLoggedIn(true);
                toast.success(data.message);
                getUserData();
                navigate('/');
            }
            else{
                toast.error(data.message);
            }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen px-6 sm:px-6 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer '/>

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign Up' ? "Create Account":"Login"}</h2>
        <h2 className='text-center mb-6'>{state === 'Sign Up' ? "Create your account":"Login to your account"}</h2>

      <form onSubmit={onSubmitHandler}>
        {state === 'Sign Up' && (
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={assets.person_icon} alt="" />
                    <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Full Name' className='bg-transparent w-full outline-none' required/>
                </div>
        )}
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder='Email id' className='bg-transparent w-full outline-none' required/>
        </div>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='bg-transparent w-full outline-none' required/>
        </div>
        <p onClick={()=>navigate('/reset-password')} className='cursor-pointer mb-4 text-indigo-500'>Forgot password?</p>
        <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 text-white font-medium'>{state}</button>
        {state === 'Sign Up' ? (
        <p className='text-gray-400 text-center text-sm mt-4'>
            Already have an account?{' '}
            <span onClick={()=>setState('Login')} className='text-indigo-500 text-center cursor-pointer text-sm mt-4'>Login Here</span>
        </p>
    ):(
        <p className='text-gray-400 text-center text-sm mt-4'>
            Don't have an account?{' '}
            <span onClick={()=>setState('Sign Up')} className='text-indigo-500 text-center cursor-pointer text-sm mt-4'>Sign In</span>
        </p>)}
      </form>
      </div>
    </div>
  )
}

export default Login;
