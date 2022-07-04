import React, { useState } from 'react'
import * as yup  from 'yup';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { signUp } from '../../api/user'
import {yupResolver } from '@hookform/resolvers/yup';
import { UserType } from '../../types/products';

type RegisterProps = {
  
}
const fromSchema = yup.object().shape({
  username: yup.string()
    .required("Username is required")
    .min(6, "Username length should be at least 20 characters"),
  email: yup.string()
    .required("Email is required"),
  password: yup.string()
    .required("Password is required")
    .min(6, 'Password length should be at least 4 characters'),
  confirmPassword: yup.string()
    .required("Password is required")
    .oneOf([yup.ref('password')], 'Passwords must and should match'),
})
const validation = {resolver: yupResolver(fromSchema)}
type FormInputs = {
  username: string,
  email: string,
  password: string | number,
  confirmPassword:string | number,
}


const Register = (props: RegisterProps) => {

  const {register, handleSubmit, formState} = useForm<FormInputs>(validation);
  const navigate = useNavigate();
  // console.log(register);
  const { errors } = formState
  const onSubmit: SubmitHandler<FormInputs> = async (user:UserType) => {
    console.log(user);

    try {
      const {data} = await signUp({
        username: user.username,
        email: user.email,
        password: user.password,
        role: 0
      });
      console.log(data);
      alert("Đăng kí thanh công");
      navigate('/login');
    } catch (error) {
      alert("Username is exist")
    }
     
  }
  return (
    <div>
      <div className="login-form-container">
        <form  id="formSignUp" onSubmit={handleSubmit(onSubmit)}>
          <h3>Sign Up</h3>

          <span>User Name</span>
          <input type="text" {...register('username')} id="username" className="box" placeholder="Enter your full name" />
          <div className="red">{errors.username?.message}</div>
          <span>Email Name</span>
          <input type="email"  id="email" {...register('email')} className="box" placeholder="Enter your email" />
          <div className="red">{errors.email?.message}</div>
          <span>Password</span>
          <input type="password"  id="password" {...register('password')}  className="box" placeholder="Enter your password" />
          <div className="red">{errors.password?.message}</div>
          <span>Forget Password</span>
          <input type="password" {...register('confirmPassword')}   className="box" placeholder="Enter your password again" />
          <div className="red">{errors.confirmPassword?.message}</div>
          <button className="btn">Sign Up</button>
          <p>Forget password ? <a >Click here</a></p>
          <p>Go to Sign In ! <NavLink to="/login">Sign In</NavLink></p>
        </form>
      </div>

    </div>
  )
}

export default Register