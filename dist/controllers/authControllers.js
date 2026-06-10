import bcrypt from "bcrypt";
import * as User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";
import { OAuth2Client } from "google-auth-library";
import { AppError } from "../middlewares/errorHandler.js";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const signUp = async (req, res) => {
    console.log("signup hit.... " + JSON.stringify(req.body));
    const { name, email, phone, role, password } = req.body;
    console.log("signup hit.... " + name);
    if (!name || !email || !phone || !role || !password) {
        throw new AppError("All fields are required", 400);
    }
    const existingUser = await User.findUser(email) || await User.findUser(phone);
    if (existingUser) {
        if (existingUser.email === email) {
            throw new AppError("User with this email already exists", 409);
        }
        if (existingUser.phone === phone) {
            throw new AppError("User with this phone number already exists", 409);
        }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser({
        name,
        email,
        phone,
        role,
        password: hashedPassword
    });
    res.status(201).json({
        message: "user successfully created",
        user: newUser
    });
};
const login = async (req, res) => {
    const { identifier, password } = req.body;
    console.log("credentials", JSON.stringify(req.body));
    if (!identifier || !password) {
        throw new AppError("email/phone number and password should not be empty", 400);
    }
    const user = await User.findUser(identifier);
    if (!user)
        throw new AppError("invalid credentials Please provide valid email", 401);
    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch)
        throw new AppError("Password is incorrect", 401);
    const token = generateToken(user);
    res.status(200).json({
        message: "Login successful..",
        user,
        token
    });
};
const googleLogin = async (req, res) => {
    const { userInfo } = req.body;
    if (!userInfo || !userInfo.email) {
        throw new AppError("Invalid Google User information provided", 400);
    }
    const { email, name, picture, sub } = userInfo;
    let user = await User.findUser(email);
    if (!user) {
        try {
            user = await User.createUser({
                name,
                email,
                phone: "",
                role: "user",
                password: null,
                profile_image: picture || null,
                provider: "google",
                google_id: sub
            });
        }
        catch (err) {
            console.error("Critical error during Google User creation:", err);
            throw new AppError("Account creation failed, please try again later.", 500);
        }
    }
    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', { expiresIn: "7d" });
    res.status(200).json({
        user,
        token: jwtToken,
        message: "Google login successful"
    });
};
export { signUp, login, googleLogin };
//# sourceMappingURL=authControllers.js.map