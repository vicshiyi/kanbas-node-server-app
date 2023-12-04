import express from 'express';
import "dotenv/config";
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
// import session from "express-session";

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const app = express();
app.use(express.json());
// app.use(cors());
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
}
app.use(session(sessionOptions));
  
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
Hello(app);

// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
app.listen(process.env.PORT || 4000);