const express = require("express");
require("./db/mongoose");

const { reset } = require("nodemon");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

// app.use((req,res, next)=>{
//   if(req.method==='GET'){
//     res.send('GET req are disabled')
//   }else{
//     next()
//   }
// })

// app.use((req,res,next)=>{
//   res.status(503).send('Site is under maintainance ! Check back soon .')
// })

app.use(express.json());

app.use(userRouter);

app.use(taskRouter);

module.exports = app;
