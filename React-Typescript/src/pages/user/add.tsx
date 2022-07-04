
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useNavigationType } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addUser } from '../../api/user';
import { UserType } from '../../types/products';


type AddUserProps = {
    onAddUser: (user:UserType) => void
}
const formSchema = yup.object().shape({
    username: yup.string()
    .required("Username is required")
    .min(6, "Username length should be at least 20 characters"),
    email: yup.string()
    .required("Email is required"),
    password: yup.string()
    .required("Password is required")
    .min(6, 'Password length should be at least 6 characters'),
    confirmPassword: yup.string()
    .required("Password is required")
    .oneOf([yup.ref("password")], 'Passwords must and should match'),

})
const validation = {resolver: yupResolver(formSchema)}
type FormInputs = {
    id:number,
    username: string,
    email:string,
    password: string,
    confirmPassword:string,
    role?:string
}
const AddUser = ({onAddUser}: AddUserProps) => {
    const {register, handleSubmit, formState ,reset} = useForm<FormInputs>(validation);
    const navigate = useNavigate();
    const {errors} = formState;

    const onSubmit: SubmitHandler<FormInputs> = async (user:UserType) => {
        console.log(user);
        try {
            const signin = await onAddUser({
                username: user.username,
                email: user.email,
                password: user.password,
                role: user.role
            })
           
            // setTimeout(() => {
            //     navigate('/admin/user')
            // }, 1000); 
            
        } catch (error) {
            
        }
    }
  return (
    <div>
        <h1>AddUser</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="exampleInputUser" className="form-label">Username:</label>
                <input type="text" {...register('username')} className="form-control" style={{fontSize:'13px',textTransform:"none"}} id="exampleInputUser" placeholder='Username'  />
                <div className="red">{errors.username?.message}</div>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail" className="form-label">Email:</label>
                <input type="email" {...register('email')} className="form-control" style={{fontSize:'13px', textTransform:"none"}} id="exampleInputEmail" placeholder='abc@gmail.com' />
                <div className="red">{errors.email?.message}</div>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" >Password:</label>
                <input type="password" {...register('password')}  className="form-control" id="exampleInputPassword1"style={{fontSize:'13px'}} placeholder="******" />
                <div className="red">{errors.password?.message}</div>
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword2" className="form-label" >Confirm Password:</label>
                <input type="password" {...register('confirmPassword')}  className="form-control" id="exampleInputPassword2"style={{fontSize:'13px'}} placeholder="******" />
                <div className="red">{errors.confirmPassword?.message}</div>
            </div>

            <div className="mb-3">
                <select style={{border:"1px #ddd solid"}} {...register('role')} id="fruit">
                    <option value="0">User</option>
                    <option value="1">Admin</option>
                </select>
                <div className="red">{errors.role?.message}</div>
            </div>
          


            <button type="submit" className="btnAdmin btn-primary">Submit</button>
        </form>
    </div>
    
  )
}

export default AddUser