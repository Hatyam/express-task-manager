const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/db/tasks.db", (err) => {
    if (err) {
        console.error("Ошибка подклюения к БД", err.message);
    } else {
        console.log('Подключение к SQLite успешно!');
    }
});

db.serialize(() => {
    // db.run(`DROP TABLE IF EXISTS notes`, (err) => {
    //     if (err) console.error(err.message);
    //     else console.log('Таблица notes удалена');
    // });

    // db.run(`DROP TABLE IF EXISTS users`, (err) => {
    //     if (err) console.error(err.message);
    //     else console.log("Таблица users удалена");
    // });

    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
        )`, () => {
            console.log("Таблица users создана")
        })

    db.run(`CREATE TABLE notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`, () => {
            console.log('Таблица notes создана');
        })
})

module.exports = db;
