import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Api working");
});

app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
