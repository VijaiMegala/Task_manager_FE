"use client";
import TaskDetails from "@/components/TaskDetails";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Task } from "@/components/TaskDetails";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
const Edit = () => {
    const params = useParams();
    const { token } = useAuth();
    const [task, setTask] = useState<Task | null>(null);
    const router = useRouter();
    useEffect(() => {
        const fetchTask = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTask(response.data);
            console.log(response.data);
        }
        fetchTask();
    }, []);

    const handleSave = async (title: string, description: string, status: string, dueDate: string) => {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${params.id}`, {
          title,
          description,
          status,
          dueDate 
      }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      toast.success("Task updated successfully");
      router.push("/");
  }
  return (
    <>
        <TaskDetails task={task} isDisabled={false} isAdd={false} onSubmit={handleSave}/>
        <ToastContainer />
    </>
  )
}

export default Edit;