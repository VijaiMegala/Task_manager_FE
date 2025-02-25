"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

interface credComponentsProps {
    title: string;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

const CredComponents = ({title, onEmailChange, onPasswordChange, onSubmit}: credComponentsProps) => {
  const [errors, setErrors] = useState({ email: '', password: '' });
  const router = useRouter();
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return false;
    }
    if (password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: '' }));
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateEmail(e.target.value);
    onEmailChange(e);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validatePassword(e.target.value);
    onPasswordChange(e);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
            <div className="flex flex-col items-center w-full max-w-md p-4 justify-between bg-white border border-gray-300 rounded-lg shadow-[10px_5px_5px_rgba(0,0,0,0.1)] h-[40%]">
                <h1 className="text-2xl font-bold text-black">{title}</h1>
                <div className="flex flex-col items-center w-full gap-10 ">
                    <div className="w-full">
                        <input type="email" placeholder="Email" className={`w-full p-2 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-black`} onChange={handleEmailChange} />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="w-full">
                        <input type="password" placeholder="Password" className={`w-full p-2 rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-black`} onChange={handlePasswordChange} />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                </div>
                <button className="w-full p-2 rounded-md bg-black text-white active:bg-gray-800" onClick={onSubmit}>{title}</button>

                <div className="flex flex-row items-center w-full max-w-md justify-end ">
                <h1 className="cursor-pointer text-black" onClick={() => {
                    router.push(title === "Login" ? "/signup" : "/login");
                }}>{ title === "Login" ? "Sign Up ?" : "Login ?"}</h1>
            </div>
            </div>
            
        </div>
  )
}

export default CredComponents;