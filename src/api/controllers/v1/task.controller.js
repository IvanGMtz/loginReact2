import { con } from "../../../services/connection/atlas.js";
import { body, validationResult } from 'express-validator';
import { ObjectId } from "mongodb";

let db = await con();
let collection = db.collection("task");

export const getTasks = async (req, res) => {
    try {
        const tasks = await collection.find({ user: new ObjectId(req.user.id) }).toArray();
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        await Promise.all([
            body('title').notEmpty().run(req),
            body('description').isString().run(req),
            body('date').isISO8601().toDate().run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newTask = {
            title: req.body.title,
            description: req.body.description,
            date: new Date(req.body.date),
            user: new ObjectId(req.user.id),
        }

        const result = await collection.insertOne(newTask);

        newTask.id = result.insertedId;
        newTask.createdAt = new Date();

        res.status(201).json({
            message: "Task added successfully", TaskInfo: [{
                id: newTask.id,
                title: newTask.title,
                description: newTask.description,
                date: newTask.date,
                createdAt: newTask.createdAt
            }]
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0)
            return res.status(404).json({ message: "Task not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        await Promise.all([
            body('title').notEmpty().run(req),
            body('description').isString().run(req),
            body('date').isISO8601().toDate().run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const updatedTask = {
            title: req.body.title,
            description: req.body.description,
            date: new Date(req.body.date)
        };
        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedTask }
        );

        if (result.matchedCount === 0)
            return res.status(404).json({ message: "Task not found" });

        updatedTask.id = req.params.id;
        return res.json({
            message: "Task updated successfully", TaskInfo: [{
                id: updatedTask.id,
                title: updatedTask.title,
                description: updatedTask.description,
                date: updatedTask.date
            }]
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!task) return res.status(404).json({ message: "Task not found" });
        return res.json(task);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
