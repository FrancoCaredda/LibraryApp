const express = require('express');
const db = require("./database");
const authorsRouter = require("./routes/authors");

const app = express();

app.use("/api/authors/", authorsRouter);

app.listen(5000, () => {
    console.log("Server is listening on port 5000...");
});