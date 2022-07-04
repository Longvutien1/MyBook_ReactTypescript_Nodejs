import React, { useEffect, useState } from 'react'
import { CategoryType, ProductType } from '../../types/products'
import { useForm, SubmitHandler} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import toastr from "toastr";
import { changImage, uploadImg } from '../../utils/upload';
type AddProductProps = {
    listCategory: CategoryType[],
    onAdd: (product: ProductType) => void
   
}

type FormInputs = {
    id?:number
    name: string,
    price: number,
    img:string,
    category?: number
}


const AddProduct = ({listCategory, onAdd}: AddProductProps) => {
   
    const { register, handleSubmit, formState} = useForm<FormInputs>();
    const navigate = useNavigate();
    useEffect(() => {
      const imgPreview = document.getElementById("img-preview");
      const imgPost = document.getElementById("file-upload");
      
     changImage(imgPost, imgPreview);
    },[])

   
    const onSubmit: SubmitHandler<FormInputs> = async (product) =>{
      const imgPost = document.querySelector("#file-upload");
      const imgLink = await uploadImg(imgPost);
           console.log(imgLink);
           try {
            if (imgLink) {
              onAdd({
                name: product.name,
                price: product.price,
                img: imgLink,
                category: product.category
              })
              toastr.success("Thêm sản phẩm thành công");
              
              setTimeout(() => {
                 navigate('/admin/product')
              }, 1000); 
            }  
           } catch (error:any) {
              toastr.error(error.response.data);
           }    
            
        console.log(product);

        //  console.log(product);
              
    }
    // listCategory.map(item => item.name)
   
  return (
    <div>
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="form-label">Product name</label>
                <input type="text" {...register('name',{required:true})} className="form-control" style={{fontSize:'13px'}} id="exampleInputEmail1"  />
            </div>
            <div className="mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
                <input type="number" {...register('price', {required:true})} className="form-control" style={{fontSize:'13px'}} id="exampleInputPassword1" />
            </div>

            <div className="mb-4">
              <label htmlFor="exampleInputPassword1" className="form-label">Image</label>
              <input className="form-control" type="file"  id="file-upload" multiple />

              <div className="mt-1 flex items-center">
                <span className="inline-block h-36 w-36 rounded-full overflow-hidden bg-gray-100">
                  <img id="img-preview" src='' style={{width:"100px"}} />
                </span> 
              </div>

            </div>

            <div className="mb-4">
                <select style={{border:"1px #ddd solid"}} {...register('category')} id="fruit">
                    {listCategory?.map((item) => (
                        <option value={item._id as number}>{item.name}</option>
                       
                    ))}
                    
                </select>
               
            </div>

         

        



            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" >Desc</label>
                <input type="text" className="form-control" id="exampleInputPassword1"style={{fontSize:'13px'}} />
            </div>
            <button type="submit" className="btnAdmin btn-primary">Submit</button>
        </form>

    </div>
  )
}

export default AddProduct;