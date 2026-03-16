const refreshService = require("../service/refresh.service");
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.refresh = async (req, res, next) => {
    try {
        const { refresh_token } = req.cookies;
        
        const {newRefreshToken, newAccessToken} = await refreshService.updateRefreshToken(refresh_token);

        res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        
        res.json({newAccessToken});
    } catch (err) {
        next(err);
    }
}