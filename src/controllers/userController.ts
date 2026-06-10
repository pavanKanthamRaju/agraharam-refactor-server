import { Request, Response } from 'express';
import * as User from '../models/userModel.js';

const getUsers = async (req: Request, res: Response): Promise<void> => {
    console.log("user controller hits....");
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, phone, role } = req.body;
    try {
        const createdUser = await User.createUser({ name, email, password, phone, role });
        res.status(200).json({ user: createdUser });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export { getUsers, createUser };
