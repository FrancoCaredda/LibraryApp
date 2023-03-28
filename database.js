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
            [rating] DECIMAL(10, 2) NOT NULL  
        );
    `);

    db.exec(`
        CREATE TABLE [Books]
        (
            [id] INT PRIMARY KEY NOT NULL,
            [name] NVARCHAR(50) NOT NULL,
            [price] DECIMAL(10, 2) NOT NULL,
            [page_count] INT NOT NULL,
            [author_id] INT NOT NULL,
            FOREIGN KEY([author_id]) REFERENCES [Authors]([id])
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

    db.exec(`
        INSERT INTO [Books] ([id], [name], [price], [page_count], [author_id])
        VALUES (2001, 'Grammatica avanzata della lingua italiana', 19.95, 200, 1001),
               (2002, 'Grammatica practica della lingua italiana', 31.11, 288, 1001);
    `);

    db.on("error", (err) => {
        console.log(err);
    })
});

module.exports = db;