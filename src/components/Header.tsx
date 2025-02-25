"use client";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import { useRouter } from 'next/navigation';
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div className="flex flex-row w-full p-2 h-[10%] relative bg-black">
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-bold">Task Manager</h1>
            </div>
            <div className="hidden md:flex flex-row gap-2 items-center h-full justify-center absolute top-0 right-3">
                <div className="px-5 py-2 rounded-md cursor-pointer text-black bg-white" onClick={handleLogout}>Logout</div>
            </div>  
            <div className="flex md:hidden flex-row items-center justify-center h-full absolute top-0 cursor-pointer right-3"  onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MdOutlineMenu size={24} />
            </div>
                {isMenuOpen && (
                    <div className="absolute md:hidden top-full right-0 mt-2 bg-black rounded-md shadow-lg">
                        <div className="px-5 py-2 cursor-pointer text-white hover:bg-gray-800" onClick={handleLogout}>Logout</div>
                    </div>
                )}
        </div>
    )
};

export default Header;  