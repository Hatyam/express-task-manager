const jwt = require("jsonwebtoken");
const SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.accessMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({message: "Требуется токен"});
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "Требуется токен"});
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({message: "Неверный токен"});
    }
}
