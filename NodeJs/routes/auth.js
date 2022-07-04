import express from "express";
import { deleteUser, getUser, signIn, signUp, updateUser, userDetail } from "../controllers/users";


const routeUser = express.Router();

routeUser.post('/signup',signUp);
routeUser.post('/signin',signIn);
// routeUser.post('/users',signIn);
routeUser.get('/users',getUser);
routeUser.get('/users/:id',userDetail);
routeUser.patch('/users/:id',updateUser);
routeUser.delete('/users/:id',deleteUser);


export default routeUser;