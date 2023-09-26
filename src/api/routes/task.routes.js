import { Router } from 'express';
import {
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask,
} from '../controllers/v1/task.controller.js';
import { auth } from '../middlewares/validateToken.js';

const appTask = Router();


appTask.get("/", auth, getTasks);

appTask.post("/", auth, createTask);

appTask.get("/:id", auth, getTask);

appTask.put("/:id", auth, updateTask);

appTask.delete("/:id", auth, deleteTask);

export default appTask;