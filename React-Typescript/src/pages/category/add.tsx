import React, { useState } from 'react'
import { useForm, SubmitHandler} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { CategoryType } from '../../types/products';
import toastr from "toastr";
type AddCategoryProps = {
    onAddCategory: (category: CategoryType) => void
}

type FormInputs = {
    id:number
    name: string,
}
const AddCategory = (props: AddCategoryProps) => {
    const { register, handleSubmit, formState} = useForm<FormInputs>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<FormInputs> = async (data) =>{
        await props.onAddCategory(data);
         console.log(data);

         toastr.success("Thêm sản phẩm thành công");
       
         setTimeout(() => {
            navigate('/admin/category')
         }, 1000); 
    }
    
  return (
    <div>
        <h1>Add Category</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Category name</label>
                <input type="text" {...register('name',{required:true})} className="form-control" style={{fontSize:'13px'}} id="exampleInputEmail1"  />
            </div>
          
            <button type="submit" className="btnAdmin btn-primary">Submit</button>
        </form>

    </div>
  )
}

export default AddCategory;