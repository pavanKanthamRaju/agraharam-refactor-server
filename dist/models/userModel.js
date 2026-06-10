import db from '../config/db.js';
const getAllUsers = async () => {
    const res = await db.query("SELECT * FROM users");
    return res.rows;
};
const createUser = async (payload) => {
    const result = await db.insert("users", payload);
    return result;
};
const findUser = async (identifier) => {
    const res = await db.query("SELECT * FROM users WHERE email = $1 OR phone = $1", [identifier]);
    console.log(res);
    return res.rows[0];
};
export { getAllUsers, createUser, findUser };
//# sourceMappingURL=userModel.js.map