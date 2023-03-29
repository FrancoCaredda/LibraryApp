const express = require('express');
const db = require("./database");
const path = require("path");
const authorsRouter = require("./routes/authors");

const app = express();

app.use(express.static(path.resolve(__dirname, "public")));
app.use("/api/authors/", authorsRouter);

app.listen(5000, () => {
    console.log("Server is listening on port 5000...");
});