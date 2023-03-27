const db = require("../database");

const getAuthors = (req, res) => {
    try {
        db.all(`
            SELECT * FROM Authors
        `, [], (err, rows) => {
            if (err) {
                throw err;
            }
            
            res.status(200).json(rows);
        });
    } catch (e) {
        res.status(500).send(e);
        return;
    }
};  

module.exports = { getAuthors };