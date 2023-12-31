require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const connectToMongoDB = require('./db/db');
const userRouter = require('./routes/userRoutes');
const storyRouter = require("./routes/storyRoutes");
const chapterRouter = require("./routes/chapterRoutes")

const port = 8181 || process.env.PORT;

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(cors());
app.use(express.json());
app.use("/api/v1/story", storyRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chapter", chapterRouter);
// app.use("/api/v1/comment");

app.listen(port, async () => {
    await connectToMongoDB(process.env.MONGO_URI);
    console.log(`Server Alive On http://localhost:${port}`);
});