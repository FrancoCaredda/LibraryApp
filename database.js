const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
        console.log("Database is not opened!");
    }
});

db.serialize(() => {
    db.exec(`
        CREATE TABLE [Authors]
        (
            [id] INT PRIMARY KEY NOT NULL,
            [name] NVARCHAR(20) NOT NULL,
            [last_name] NVARCHAR(20) NOT NULL,
            [email] NVARCHAR(50) NOT NULL,
            [rating] FLOAT NOT NULL  
        );
    `);

    db.exec(`
        INSERT INTO [Authors] ([id], [name], [last_name], [email], [rating])
        VALUES (1001, 'Susanna', 'Nocchi', 'snocchi@gmail.com', 4.5);
    `);

    db.exec(`
        INSERT INTO [Authors] ([id], [name], [last_name], [email], [rating])
        VALUES (1002, 'George', 'Martin', 'george_martin@gmail.com', 5.0);
    `);

    db.on("error", (err) => {
        console.log(err);
    })
});

module.exports = db;