import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || '';
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(`jwt token is: ${authHeader}`);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized - No token Provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        req.user = decodedToken;
        next();
    }
    catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};
export default verifyToken;
//# sourceMappingURL=jwtMiddleware.js.map