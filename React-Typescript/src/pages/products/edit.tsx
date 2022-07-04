import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById, list } from '../../api/products'
import { CategoryType, ProductType } from '../../types/products'
import { changImage, uploadImg } from '../../utils/upload'
import toastr from "toastr";
type EditProductProps = {
    onUpdate: (product:ProductType) => void,
    listCategory: CategoryType[],
}
type FormInputs = {
  
  name:string,
  price:number,
  category: number,
  img?:string
}
const EditProduct = ({onUpdate, listCategory}: EditProductProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const {register, handleSubmit, formState:{errors}, reset} = useForm<FormInputs>();

  const navigate = useNavigate();
 
  const {id} = useParams();
 
  useEffect(()=>{
    const getProduct2 = async (id:any) => {
      const {data} = await getProductById(id);
      console.log(data);

      setProducts(data);
      // đồng bộ dữ liệu
      reset(data)
      
    }
    getProduct2(id);

    const imgPreview = document.getElementById("img-preview");
    const imgPost = document.getElementById("file-upload");
    
   changImage(imgPost, imgPreview);
  },[]);

    console.log(products);
    
  const onSubmit: SubmitHandler<FormInputs> = async data => {
    const imgPost = document.querySelector("#file-upload");
    const imgLink = await uploadImg(imgPost);
         console.log(imgLink);
         try {
        
            await onUpdate({
              _id: id,
              name: data.name,
              price: data.price,
              img: imgLink || products.img,
              category: data.category
            })
            toastr.success("Sửa sản phẩm thành công");
            
            setTimeout(() => {
               navigate('/admin/product')
            }, 1000); 
           
         } catch (error:any) {
            toastr.error(error.response.data);
         }    
          
    // console.log(data);

  }
  return (
    <div>
      <h1>EditProduct</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Product name</label>
                <input type="text" {...register('name',{required:true})}   className="form-control" style={{fontSize:'13px'}} id="exampleInputEmail1"  />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
                <input type="number" {...register('price', {required:true})} className="form-control" style={{fontSize:'13px'}} id="exampleInputPassword1" />
            </div>

            <div className="mb-4">
              <label htmlFor="exampleInputPassword1" className="form-label">Image</label>
              <input className="form-control" type="file"  id="file-upload" multiple />

              <div className="mt-1 flex items-center">
                <span className="inline-block h-36 w-36 rounded-full overflow-hidden bg-gray-100">
                  <img id="img-preview" src={products.img} style={{width:"100px"}} />
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
                <label htmlFor="exampleInputPassword1" className="form-label">Desc</label>
                <input type="text" className="form-control" id="exampleInputPassword1" style={{fontSize:'13px'}} />
            </div>

            <button type="submit" className="btnAdmin btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default EditProduct;