const db = require("../database");

const getAuthors = (req, res) => {
    try {
        db.all(`
            SELECT * FROM Authors
        `, [], (err, rows) => {
            if (err) {
                throw err;
            }
            
            res.status(200).json({
                success: true,
                value: rows
            });
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            value: "Something went wrong on server"
        });
        return;
    }
};
const getAuthor = (req, res) => {
    try {
        let stmt = db.prepare("SELECT * FROM [Authors] WHERE [id] = ?;");

        let {id} = req.params;
        stmt.get([Number(id)], (err, rows) => {
            if (err) {
                throw err;
            }

            if (!rows) {
                res.status(404).json({
                    success: false,
                    value: "Resource not found"
                })

                return;
            }

            res.status(200).json({
                success: true,
                value: rows
            });
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Something went wrong on server"
        });
    }
};

const addAuthor = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            success: false,
            value: "Error: you must suply the body of a request"
        });    
        
        return;
    }
    
    try {
        db.get("SELECT MAX([id]) FROM [Authors];", [], function (err, rows) {
            if (err) {
                throw err;
            }

            let max = rows["MAX([id])"];

            let stmt = db.prepare(`INSERT INTO [Authors] ([id], [name], [last_name], [email], [rating])
            VALUES (?, ?, ?, ?, ?);`);

            let {name, lastName, email, rating} = req.body;

            if (!name || !lastName || !email || !rating) {
                res.status(400).json({
                    success: false,
                    value: "Error: you must suply name, lastName, email, rating within the body"
                });

                return;
            }

            // TODO: Chaining hell
            stmt.run([max + 1, name, lastName, email, rating], (err) => {
                if (err) {
                    throw err;
                }

                res.status(200).json({
                    success: true,
                    value: max + 1    
                });
            });
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            value: "Error: something went wrong"
        });
    }
};

module.exports = { getAuthors, getAuthor, addAuthor };