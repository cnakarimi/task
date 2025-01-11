import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, List, ListItem, ListItemText, Checkbox, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const ToDoPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { register, handleSubmit, reset } = useForm<{ task: string }>();

    const addTask = (data: { task: string }) => {
        setTasks([...tasks, { id: Date.now(), text: data.task, completed: false }]);
        reset();
    };

    const toggleComplete = (id: number) => {
        setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    return (
        <div className="flex flex-col items-center justify-center" style={{ padding: "16px" }}>
            <Typography variant="h4" gutterBottom>
                To-Do List
            </Typography>
            <form onSubmit={handleSubmit(addTask)} style={{ display: "flex", marginBottom: "16px" }}>
                <TextField
                    {...register("task", { required: true })}
                    label="New Task"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    style={{ marginRight: "8px" }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Task
                </Button>
            </form>
            <List style={{ width: "100%", maxWidth: "600px" }}>
                {tasks.map((task) => (
                    <ListItem key={task.id} style={{ display: "flex", alignItems: "center" }}>
                        <Checkbox
                            checked={task.completed}
                            onChange={() => toggleComplete(task.id)}
                            inputProps={{ "aria-label": "task completed" }}
                        />
                        <ListItemText
                            primary={task.text}
                            style={{ textDecoration: task.completed ? "line-through" : "none" }}
                        />
                        <IconButton edge="end" onClick={() => deleteTask(task.id)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ToDoPage;
