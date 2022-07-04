
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useNavigationType, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addUser, getUserById, updateUser } from '../../api/user';
import { UserType } from '../../types/products';
import toastr from "toastr";

type EditUserProps = {
    onUpdateUser: (user:UserType) => void
}
const formSchema = yup.object().shape({
    username: yup.string()
    .required("Username is required")
    .min(6, "Username length should be at least 20 characters"),
    email: yup.string()
    .required("Email is required"),

})
const validation = {resolver: yupResolver(formSchema)}
type FormInputs = {
    id:number,
    username: string,
    email:string,
    password: string,
    role?:string
}
const EditUser = ({onUpdateUser}: EditUserProps) => {
    const {register, handleSubmit, formState, reset} = useForm<FormInputs>(validation);
    const navigate = useNavigate();
    const {errors} = formState;
    const {id} = useParams();
    // console.log(id);
    
    useEffect(()=>{
        const getUser = async (id:any) => {
            const {data} = await getUserById(id);
            // console.log(data);
            
            // đồng bộ dự liệu
            reset(data);
            // console.log(data);
            
        }
        getUser(id);
    },[]);
    

    const onSubmit: SubmitHandler<FormInputs> = async (user:UserType) => {
        console.log("user"+ user._id);
        
          await  onUpdateUser(
                {
                _id:user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
            );
            toastr.success("Update Successfully");
              
            setTimeout(() => {
                navigate('/admin/user')
            }, 1000); 
       
    }
  return (
    <div>
        <h1>EditUser</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="exampleInputUser" className="form-label">Username:</label>
                <input type="text" {...register('username')} className="form-control" style={{fontSize:'13px', textTransform:'none'}} id="exampleInputUser" placeholder='Username'  />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail" className="form-label">Email:</label>
                <input type="email" {...register('email')} className="form-control" style={{fontSize:'13px', textTransform:'none'}} id="exampleInputEmail" placeholder='abc@gmail.com' />
            </div>

            {/* <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" >Password:</label>
                <input type="text" {...register('password')} className="form-control"  style={{fontSize:'13px'}} placeholder="******" />
            </div> */}

        
            <div className="mb-3">
                <select style={{border:"1px #ddd solid"}} {...register('role')} id="fruit">
                    <option value="0">User</option>
                    <option value="1">Admin</option>
                </select>
            </div>
          
            <button type="submit" className="btnAdmin btn-primary">Submit</button>
        </form>
    </div>
    
  )
}

export default EditUser