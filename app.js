import express from 'express';
import "dotenv/config";
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import cors from "cors";
import "dotenv/config";
// import session from "express-session";


const app = express();
app.use(express.json());
app.use(cors());
CourseRoutes(app);
Lab5(app);
Hello(app);

// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
app.listen(process.env.PORT || 4000);