"use client"
import { useState } from 'react';
import CredComponents from "@/components/CredComponents";
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        console.log(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        console.log(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signup`, 
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.status === 201) {
                localStorage.setItem('token', response.data.token);
                toast.success('Signup successful!');
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    }
    return (
        <>
            <CredComponents 
                title="Signup" 
                onEmailChange={handleEmailChange} 
                onPasswordChange={handlePasswordChange} 
                onSubmit={handleSubmit} 
            />
            <ToastContainer />
        </>
    )
}

export default Signup;