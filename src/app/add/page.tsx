"use client";
import TaskDetails from "@/components/TaskDetails";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Add = () => {
    const { token } = useAuth();
    const router = useRouter();
    const handleAdd = async (title: string, description: string, status: string, dueDate: string) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
             title,
             description,
             status,
             dueDate
         }, {
             headers: {
                 Authorization: `Bearer ${token}`
             }
         });
         if (response.status === 201) {
            toast.success("Task added successfully");
            setTimeout(() => {
                router.push("/");
            }, 1000);
         }
     }
    const task = {
        id: "",
        title: "",
        description: "",
        status: "",
        dueDate: ""
    }
  return (
    <>
        <TaskDetails task={task} isDisabled={false} isAdd={true} onSubmit={handleAdd}/>
        <ToastContainer />
    </>
  )
}

export default Add;