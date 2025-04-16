import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const ResetPassword = () => {
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [newPassword,setNewPassword]=useState('')
    const [isEmailSent,setIsEmailSent]=useState('')
    const [otp,setOtp]=useState(0)
    const [isOtpSubmited,setIsOtpSubmited]=useState('')
    const inputRefs=React.useRef([]);

    const {backendUrl}=useContext(AppContext);
    axios.defaults.withCredentials=true;

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
    const onSubmitOtp=async(e)=>{
            e.preventDefault();
            const verifyArray=inputRefs.current.map(e=>e.value)
            setOtp(verifyArray.join(''));
            setIsOtpSubmited(true);
    }
    const onSubmitEmail=async(e)=>{
        try {
            e.preventDefault();
            const {data}=await axios.post(`${backendUrl}/api/auth/send-reset-otp`,{email});
            if(data.success){
                toast.success(data.message);
                setIsEmailSent(true);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const onSubmitPassword=async(e)=>{
        try {
            e.preventDefault();
            const {data}=await axios.post(`${backendUrl}/api/auth/reset-password`,{ email, otp, password: newPassword });
            console.log(data)
            if(data.success){
                toast.success(data.message);
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


  return (
<div className='flex items-center justify-center h-screen px-6 sm:px-6 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer '/>

{/* email form */}

{!isEmailSent && 
    <div  className='bg-slate-900 p-10  rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
      <h2 className='text-3xl font-semibold text-white text-center mb-4'>Reset Password</h2>
      <p className='text-center mb-4'>Enter your registered email address</p>
      <form onSubmit={onSubmitEmail}>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder='Email id' className='bg-transparent text-white w-full outline-none' required/>
        </div>
        <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 text-white font-medium'>Submit</button>
      </form>
      </div>
    }

            {/* otp input form */}
        {!isOtpSubmited && isEmailSent &&
            <form onSubmit={onSubmitOtp} className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
                <h1 className='text-white text-2xl font-semibold text-center mb-4'>
                    Reset passsworrd OTP
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
                <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'>Submit</button>
        </form>
}

        {/* Enter new password  */}
        {isOtpSubmited && isEmailSent &&
        <div className='bg-slate-900 p-10  rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
      <h2 className='text-3xl font-semibold text-white text-center mb-4'>New Password</h2>
      <p className='text-center mb-4'>Enter the ew password below</p>

      <form onSubmit={onSubmitPassword}>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} type="password" placeholder='Enter new password' className='bg-transparent w-full outline-none' required/>
        </div>
        {/* <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={(e)=>setPasssword(e.target.value)} value={email} type="text" placeholder='Confirm your password' className='bg-transparent w-full outline-none' required/>
        </div> */}
        <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 text-white font-medium'>Submit</button>
      </form>
      </div>
}
    </div>
  )
}

export default ResetPassword
