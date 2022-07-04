import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategoryById } from '../../api/category'
import { CategoryType } from '../../types/products';
import toastr from "toastr";
// import { getProductById, list } from '../../api/products'
// import { ProductType } from '../../types/products'

type EditCategoryProps = {
    onUpdateCategory: (category:CategoryType) => void
}
type FormInputs = {
  name:string,
}
const EditCategory = ({onUpdateCategory}: EditCategoryProps) => {

  const {register, handleSubmit, formState:{errors}, reset} = useForm<FormInputs>();

  const navigate = useNavigate();
 
  const {id} = useParams();
 
  useEffect(()=>{
    const getCategory2 = async (id:any) => {
      const {data} = await getCategoryById(id);
      console.log(data);

      // đồng bộ dữ liệu
      reset(data.categories)
      
    }
    getCategory2(id);
  },[]);
  
  const onSubmit: SubmitHandler<FormInputs> = async data => {
    // console.log(data);
    await onUpdateCategory(data);
    toastr.success("Update Successfully");
              
    setTimeout(() => {
       navigate('/admin/category')
    }, 1000); 
  }
  return (
    <div>
      <h1>EditProduct</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Category name</label>
                <input type="text" {...register('name',{required:true})}   className="form-control" style={{fontSize:'13px'}} id="exampleInputEmail1"  />
            </div>

            <button type="submit" className="btnAdmin btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default EditCategory;