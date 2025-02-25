"use client"
import Header from "../components/Header";
import SearhcBar from "../components/SearhcBar";
import ListItem from "../components/ListItem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
export default function Home() {
    const router = useRouter();
    const { isAuthenticated, token } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("title");

    const filteredTasks = tasks.filter((task: any) => 
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()) ||
        task.status.toLowerCase().includes(search.toLowerCase())
    );

    const sortedAndFilteredTasks = filteredTasks.sort((a: any, b: any) => {
        return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
    });

    const handleSearch = (search: string) => {
        setSearch(search);
    }

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
        const fetchTasks = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(response.data);
        }
        fetchTasks();
    }, []);

    const handleView = (id: string) => {
        router.push(`/view/${id}`);
    }

    const handleEdit = (id: string) => {
        router.push(`/edit/${id}`);
    }

    const handleDelete = (id: string) => {
        axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        toast.success("Task deleted successfully");
        setTasks(tasks.filter((task: any) => task._id !== id));
    }

  return (
    <div className="flex flex-col h-screen bg-white">
        <Header/>
        <div className="flex flex-row items-center justify-center h-[10%] ">
            <SearhcBar search={search} setSearch={setSearch}/>
            <button className=" px-6 h-10 text-white bg-black rounded-lg hover:opacity-80" onClick={() => router.push("/add")}>Add Task</button>
        </div>
        <div className="flex flex-col items-center h-[80%] pt-10 gap-5"> 
            <div className="flex flex-row items-center justify-end w-full max-w-3xl mb-4">
                <span className="mr-2 text-white">Sort by:</span>
                <select 
                    className="px-4 py-2 text-black bg-white rounded-lg border border-gray-300 focus:outline-none focus:border-black"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="title">Title</option>
                    <option value="description">Description</option>
                    <option value="status">Status</option>
                </select>
            </div>
            <div className="w-full h-[85%] overflow-y-auto flex flex-col items-center gap-5">
                {sortedAndFilteredTasks.map((task: any) => (
                    <ListItem key={task._id} title={task.title} status={task.status} onView={() => handleView(task._id)} onEdit={() => handleEdit(task._id)} onDelete={() => handleDelete(task._id)}/>
                ))}
            </div>

        </div>
    </div>

  );
}
