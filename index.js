const express = require('express');
const app = express();
const cors = require("cors");

const port = 8181 || process.env.PORT;

app.use("cors");
app.use(express.json());
app.use("/api/v1/story");
app.use("/api/v1/user");
app.use("/api/v1/chapter");
app.use("/api/v1/comment");

app.listen(port, () => {
    console.log(`Server Alive On http:localhost:${port}`);
});