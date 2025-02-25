"use client";
import TaskDetails, { Task } from "@/components/TaskDetails";
import { useParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const View = () => {
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
        }
        fetchTask();
    }, []);

    const handleBack = () => {
      router.back();
  }

  return (
    <TaskDetails task={task} isDisabled={true} isAdd={false} onSubmit={handleBack}/>
  )
}

export default View;