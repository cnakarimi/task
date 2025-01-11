import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    Typography,
    IconButton,
    Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const ToDoPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

    const { register, handleSubmit, reset } = useForm<{ task: string }>();

    const { handleSubmit: handleEditSubmit, reset: resetEdit, control: editControl } =
        useForm<{ task: string }>();

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

    const startEditing = (task: Task) => {
        setEditingTaskId(task.id);
        resetEdit({ task: task.text });
    };

    const saveEdit = (data: { task: string }) => {
        if (editingTaskId !== null) {
            setTasks(
                tasks.map((t) =>
                    t.id === editingTaskId ? { ...t, text: data.task } : t
                )
            );
            cancelEdit();
        }
    };

    const cancelEdit = () => {
        setEditingTaskId(null);
        resetEdit();
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
                    style={{ marginRight: "8px" }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Task
                </Button>
            </form>
            <TableContainer component={Paper}>
                <Table style={{ width: "100%", maxWidth: "800px" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={task.completed}
                                        onChange={() => toggleComplete(task.id)}
                                        inputProps={{ "aria-label": "task completed" }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {editingTaskId === task.id ? (
                                        <form
                                            onSubmit={handleEditSubmit(saveEdit)}
                                            style={{ display: "flex", alignItems: "center" }}
                                        >
                                            <Controller
                                                name="task"
                                                control={editControl}
                                                defaultValue={task.text}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        size="small"
                                                    />
                                                )}
                                            />
                                            <IconButton
                                                type="submit"
                                                color="primary"
                                                aria-label="save"
                                            >
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={cancelEdit}
                                                color="secondary"
                                                aria-label="cancel"
                                            >
                                                <CancelIcon />
                                            </IconButton>
                                        </form>
                                    ) : (
                                        <Typography
                                            style={{
                                                textDecoration: task.completed
                                                    ? "line-through"
                                                    : "none",
                                            }}
                                        >
                                            {task.text}
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {editingTaskId !== task.id && (
                                        <>
                                            <IconButton
                                                onClick={() => startEditing(task)}
                                                color="primary"
                                                aria-label="edit"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => deleteTask(task.id)}
                                                color="secondary"
                                                aria-label="delete"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <Button
                                                onClick={() => toggleComplete(task.id)}
                                                variant="outlined"
                                                color={task.completed ? "success" : "inherit"} // Replace "default" with "inherit"
                                                style={{ marginLeft: "8px" }}
                                            >
                                                {task.completed ? "Completed" : "Mark as Complete"}
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ToDoPage;
