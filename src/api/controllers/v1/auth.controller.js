import { con } from "../../../services/connection/atlas.js";
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

let db = await con();
let collection = db.collection("user");

export const register = async (req, res) => {
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

        const userFound = await collection.findOne({ email: req.body.email });

        if (userFound)
            return res.status(400).json({
                message: "The email is already in use",
            });
        
        const password = await bcrypt.hash(req.body.password, 10)

        const newUser = {
            name: req.body.name,
            password: password,
            email: req.body.email
        };

        const result = await collection.insertOne(newUser);
        res.status(201).json({
            message: "User added successfully", UserInfo: [{
                id: result.insertedId,
                name: req.body.name,
                email: req.body.email,
                createdAt: new Date()
        }]  });
    } catch (error) {
        res.status(500).json({ message: "Error adding user", error: error.message });
    }
} 

export const login = async (req, res)=>{

} 