import 'dotenv/config';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || '';
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "7d" });
};
export { generateToken };
//# sourceMappingURL=jwt.js.map