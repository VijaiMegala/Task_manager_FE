"use client"
import { useState } from 'react';
import CredComponents from "@/components/CredComponents";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, 
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                toast.success('Login successful!');
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
                title="Login" 
                onEmailChange={handleEmailChange} 
                onPasswordChange={handlePasswordChange} 
                onSubmit={handleSubmit} 
             />
            <ToastContainer />
        </>
    )
}

export default Login;