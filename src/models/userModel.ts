import db from '../config/db.js';
import { User, CreateUserPayload } from '../types/index.js';

const getAllUsers = async (): Promise<User[]> => {
    const res = await db.query("SELECT * FROM users");
    return res.rows;
};

const createUser = async (payload: CreateUserPayload): Promise<User> => {
    const result = await db.insert("users", payload);
    return result;
};

const findUser = async (identifier: string): Promise<User | undefined> => {
    const res = await db.query(
        "SELECT * FROM users WHERE email = $1 OR phone = $1",
        [identifier]
    );
    console.log(res);
    return res.rows[0];
};

export { getAllUsers, createUser, findUser };
