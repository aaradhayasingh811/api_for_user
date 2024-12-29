import express from "express"
const app = express();
import cors from "cors"
import { router } from "./routes/user.route.js";

app.use(express.json());
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))

app.use(cors({
    origin: "*",
    credentials :true
}))


// Routes
app.use("/api/v1",router);



export {app}