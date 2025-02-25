"use client"
import { useState, useEffect } from "react";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}
const TaskDetails = ({task, isDisabled, isAdd, onSubmit}: {task: Task | null, isDisabled: boolean, isAdd: boolean, onSubmit: (title: string, description: string, status: string, dueDate: string) => void}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [dueDate, setDueDate] = useState('');
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        dueDate: ''
    });

    useEffect(() => {
        setTitle(task ? task.title : '');
        setDescription(task ? task.description : '');
        setStatus(task ? task.status : 'pending');
        setDueDate(task ? task.dueDate : '');
    }, [task]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            title: '',
            description: '',
            dueDate: ''
        };

        if (!title.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        if (!description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
        }

        if (!dueDate) {
            newErrors.dueDate = 'Due date is required';
            isValid = false;
        } else {
            const selectedDate = new Date(dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                newErrors.dueDate = 'Due date cannot be in the past';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(title, description, status, dueDate);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black">
            <div className="flex flex-col w-[30%] p-4 gap-10  bg-white border border-gray-300 rounded-lg min-h-[50%]">
                <h1 className="text-2xl font-bold text-black">{isDisabled ? "View Task" : isAdd ? "Add Task" : "Edit Task"}</h1>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-black">Title</h1>
                    <input 
                        type="text" 
                        className={`w-full p-2 border text-black border-gray-300 rounded-lg ${isDisabled ? "cursor-not-allowed" : ""} ${errors.title ? "border-red-500" : ""}`} 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isDisabled}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-black">Description</h1>
                    <input 
                        type="text" 
                        className={`w-full p-2 border text-black border-gray-300 rounded-lg ${isDisabled ? "cursor-not-allowed" : ""} ${errors.description ? "border-red-500" : ""}`} 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isDisabled}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-black">Status</h1>
                    <select 
                        className={`w-full p-2 border border-gray-300 text-black rounded-lg ${isDisabled ? "cursor-not-allowed" : ""}`} 
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        disabled={isDisabled}
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-black">Due Date</h1>
                    <input 
                        type="date" 
                        className={`w-full p-2 border text-black border-gray-300 rounded-lg ${isDisabled ? "cursor-not-allowed" : ""} ${errors.dueDate ? "border-red-500" : ""}`} 
                        value={dueDate ? new Date(dueDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setDueDate(e.target.value)}
                        disabled={isDisabled}
                    />
                    {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                </div>
                <button 
                    className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" 
                    onClick={handleSubmit}
                > 
                    {isDisabled ? "Back" : isAdd ? "Add" : "Save"}
                </button>
            </div>
        </div>
    )
}

export default TaskDetails