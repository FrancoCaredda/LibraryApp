const db = require("../database");

// GET
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

// POST Web Form
const addAuthor = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            success: false,
            value: "Error: you must suply the body of a request"
        });    
        
        return;
    }
    
    try {
        db.serialize(() => {
            db.get("SELECT MAX([id]) FROM [Authors];", [], (err, rows) => {
                if (err) {
                    throw err;
                }
    
                let max = rows["MAX([id])"];
                
                
                let {name, lastName, email, rating} = req.body;

                if (!name || !lastName || !email || !rating) {
                    res.status(400).json({
                        success: false,
                        value: "Error: you must suply name, lastName, email, rating within the body"
                    });

                    return;
                }

                db.run(`INSERT INTO [Authors] ([id], [name], [last_name], [email], [rating])
                        VALUES (?, ?, ?, ?, ?);`, 
                        [max + 1, name, lastName, email, rating], 
                        (err) => {
                    if (err) {
                        throw err;
                    }

                    res.status(200).json({
                        success: true,
                        value: max + 1    
                    });
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

// PUT Web Form
const updateAuthor = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            success: false,
            value: "You have to provide the body of a request"
        });

        return;
    }

    try {
        let { id } = req.params;

        let { name, lastName, email, rating } = req.body;

        if (!name || !lastName || !email || !rating) {
            res.status(400).json({
                success: false,
                value: "You have to provide all data in the body of a request"
            });

            return;
        }

        db.run(`UPDATE [Authors]
                SET [name]=?,
                    [last_name]=?,
                    [email]=?,
                    [rating]=?
                WHERE [id] = ?`,
                [name, lastName, email, Number(rating), Number(id)],
                (err) => {
                    if (err) {
                        throw err;
                    }

                    res.status(200).json({
                        success: true,
                        value: "Success"
                    })
                });
    } catch (e) {
        res.status(500).json({
            success: false,
            value: "Something went wrong on the server"
        })
    }
};

// DELETE
const deleteAuthor = (req, res) => {
    let { id } = req.params;

    try {
        db.run(`
            DELETE FROM [Authors] WHERE [id] = ?   
        `, [Number(id)], (err) => {
            if (err) {
                throw err;
            }

            res.status(200).json({
                success: true,
                value: "Record is deleted"
            });
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            value: "Something went wrong on the server"
        });
    }
};

module.exports = { getAuthors, getAuthor, addAuthor, updateAuthor, deleteAuthor };