const db = require("../db/database");

exports.getOneNote = (id, user_id) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM notes WHERE id = ? AND user_id = ?`,
            [id, user_id],
            (err, row) => {
                if (err) return reject(err);
                
                resolve(row);
            }
        );
    })
};

exports.getAllNotes = (user_id) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM notes WHERE user_id = ?`,
            [user_id],
            (err, rows) => {
                if (err) return reject(err);
                
                resolve(rows);
            }
        );
    })
};

exports.createNote = (title, content, user_id) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)`,
            [title, content, user_id],
            function (err) {
                if (err) return reject(err);
    
                resolve({
                    id: this.lastID,
                    title,
                    content,
                });
            }
        );
    })
};

exports.updateNote = (id, title, content, user_id) => {
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?`,
            [title, content, id, user_id],
            function (err) {
                if (err) return reject(err);

                if (this.changes === 0) {
                    return resolve(null);
                }
    
                resolve({
                    id: id,
                    title: title,
                    content: content,
                });
            }
        );
    })
};

exports.deleteNote = (id, user_id) => {
    return new Promise((resolve, reject) => {
        db.run(
            `DELETE FROM notes WHERE id = ? AND user_id = ?`,
            [id, user_id],
            function (err) {
                if (err) return reject(err);
    
                resolve(this.changes);
            }
        );
    })
};
