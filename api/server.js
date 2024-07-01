import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import foodRouter from "./routes/foodRoute.js";

// async function insertUser(name, email,password) {
//     const res = await prisma.user.create({
//       data: {
//           name,
//           email,
//           password
//       }
//     })
//     console.log(res);
//   }
  
//   insertUser("harkirat", "harkirat@gmail.com", "admin@1")

const app = express()
const port = 8080

app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.send("Api working")
})
app.use("/api/food",foodRouter)
app.listen(port, () => { console.log(`server started at https://localhost:${port}`) })
