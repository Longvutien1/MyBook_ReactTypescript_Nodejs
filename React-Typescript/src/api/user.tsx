import { UserType } from "../types/products";
import instance from "./instance";


export const signUp = (user:UserType) => {
    const url = "/signup";
    return instance.post(url, user)
}

export const signIn = (user:UserType) => {
    const url = "/signin";
    return instance.post(url, user)
}
export const listUsers = () => {
    const url = '/users';
    return instance.get(url);
}

export const getUserById = (id:Number) => {
    const url = `/users/${id}`;
    return instance.get(url);
}

export const addUser = (user:UserType) => {
    const url = `/signup`;
    return instance.post(url, user);
}
export const updateUser = (user:UserType) => {
    const url = `/users/${user._id}`;
    return instance.patch(url, user);
}

export const removeUser = (id:number) => {
    const url = `/users/${id}`;
    return instance.delete(url);
}
