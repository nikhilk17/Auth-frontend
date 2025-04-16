import React, { createContext, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const EmailVerify = () => {
    const navigate=useNavigate()
    axios.defaults.withCredentials=true;
    const {backendUrl,isLoggedIn,userData,getUserData}=useContext(AppContext);
    const inputRefs=React.useRef([]);
    const handleInput = (e, index) => {
        if(e.target.value.length > 0 && inputRefs.current[index + 1]){
            inputRefs.current[index + 1].focus();
        }
    }
    const handleKeyDown=(e,index)=>{
        if(e.key==='Backspace' && e.target.value === '' && index>0){
            inputRefs.current[index-1].focus();
        }
    }
    const handlePaste=(e)=>{
        const paste=e.clipboardData.getData('text')
        const pasteArray=paste.split('')
        pasteArray.forEach((char,index)=>{
            if(inputRefs.current[index]){
                inputRefs.current[index].value=char;
            }
        })
    }
    const onSubmitHandler=async(e)=>{
        try{
            e.preventDefault();
            const verifyArray=inputRefs.current.map(e=>e.value)
            const otp=verifyArray.join('')
            const {data}=await axios.post(`${backendUrl}/api/auth/verify-account`,{otp})
            if(data.success){
                toast.success(data.message);
                getUserData()
                navigate('/')
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        isLoggedIn && userData && userData.isAccountVerified && navigate('/')
    },[isLoggedIn,userData])
return (
    <div className='flex flex-col items-center justify-center h-screen px-6 sm:px-6 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer '/>
        <form onSubmit={onSubmitHandler} className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
                <h1 className='text-white text-2xl font-semibold text-center mb-4'>
                    Email verify OTP
                </h1>
                <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email id</p>

                <div className='flex justify-between mb-8' onPaste={handlePaste}>
                    {Array(6).fill(0).map((_,index)=>(
                        <input type='text' maxLength='1' key={index}
                        className='w-12 h-12 bg-[#333A5C] text-white rounded-xl text-center text-xl'
                        ref={e=>inputRefs.current[index]=e}
                        onInput={(e)=>handleInput(e,index)}
                        onKeyDown={(e)=>handleKeyDown(e,index)}
                        />
                    )
                    )}
                </div>
                <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Verify otp</button>
        </form>
      
      </div>
  )
}
export default EmailVerify
