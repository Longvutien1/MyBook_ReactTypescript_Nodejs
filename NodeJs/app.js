
import express from 'express';
import mongoose from 'mongoose';
import { checkAuth } from './middlewares/checkAuth';
import routeUser from './routes/auth';
import routerCategory from './routes/categories';
import home from './routes/home';
import routerProduct from './routes/products';
import cors from 'cors'
import routerOrder from './routes/order';
import routerComment from './routes/comment';
// bước 1: include thư viện http
// const http = require('http');
// const express = require('express');
const app = express();
// const server = http.createServer(app);

// const homeRoute = require('./routes/home');
app.use(express.json());
app.use(cors());

app.use("/",home);
app.use("/api",checkAuth,routerProduct);
app.use("/api", checkAuth, routerCategory);
app.use("/api", checkAuth,routeUser)
app.use("/api", checkAuth,routerOrder)
app.use("/api", checkAuth,routerComment)

mongoose.connect('mongodb://127.0.0.1:27017/we16308');



// bước 3: lắng nghe cổng thực thi 

app.listen(8000, () => {
    console.log("Server is running on port 8000");
})  