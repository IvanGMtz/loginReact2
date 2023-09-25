import {con} from "../../../services/connection/atlas.js";
import {body, validationResult} from 'express-validator';

let db = await con();
let collection = db.collection("user");

export const getUserV1 = async (req, res) => {
        let result = await collection.find().toArray();
        res.send(result);
}

export const postUserV1 = async (req, res) => {
    try {
        await Promise.all([
            body('name').notEmpty().run(req),
            body('password').notEmpty().run(req),
            body('email').isEmail().run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newUser = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        };

        const result = await collection.insertOne(newUser);
        res.status(201).json({ message: "User added successfully", insertedId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error adding user", error: error.message });
    }
};

export const updateUserV1 = async (req, res) => {
    const UserId = parseInt(req.params.id);

    try {
        await Promise.all([
            body('name').notEmpty().run(req),
            body('password').notEmpty().run(req),
            body('email').isEmail().run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const updateUser = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        };

        const result = await collection.updateOne({ id: UserId }, { $set: updateUser });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating User", error: error.message });
    }
};