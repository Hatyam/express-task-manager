const pool = require("../db/database");

exports.adminMiddleware = async (req, res, next) => {
    try {
        const {id} = req.user;
    
        const res = await pool.query(`SELECT * FROM users WHERE id = $1`, 
            [id]
        );
    
        const role = res.rows[0].role;
    
        if (role != 'admin') {
            throw { status: 403, message: "Недостаточно прав"};
        }
        next();
    } catch (err) {
        next(err);
    }
}