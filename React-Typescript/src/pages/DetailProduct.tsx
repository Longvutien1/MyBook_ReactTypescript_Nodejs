import { Avatar, List } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swiper from 'swiper';
import { listProductByCategory } from '../api/category';
import { getProductById } from '../api/products';
import Footer from '../components/footer';
import { CommentType, ProductType } from '../types/products';
import { CartProvider, useCart } from "react-use-cart";
import { SubmitHandler, useForm } from 'react-hook-form';
import toastr from "toastr";
type DetailProductProps = {
  onAddComment: (comment:CommentType) => void,
  listComment : CommentType[]
}
type FormInputs = {
  comment: string
}

const DetailProduct = ({ listComment, onAddComment}: DetailProductProps) => {
    const {id} = useParams();
    const [products, setProduct] = useState<ProductType>();
    const [productCate, setProductCate] = useState<ProductType[]>([]);
    const { addItem } = useCart();
    const { register, handleSubmit, formState} = useForm<FormInputs>();
    const navigate = useNavigate();
    
    const abc = (aa:any) => {
      const  quantity2=   document.querySelector(aa).value;
      console.log(quantity2);
      
        return ({
          id: String(products?._id),
          img:products?.img,
          key:products?._id,
          name:products?.name,
          price:Number(products?.price),
          quantity: quantity2,
        })
    }

    const data = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];
    useEffect(() => {
        const getProduct = async (id:any) => {
            const {data} = await getProductById(id);
            setProduct(data);
            console.log(data);
            
        }
        getProduct(id);
       // eslint-disable-next-line no-unused-vars
       const swiper2 = new Swiper(".featured-slider", {
        spaceBetween: 10,
        loop: true,
        // centeredSlides: true,
        autoplay: {
            delay: 9500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            450: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });
    swiper2
      
    }, [id])
          
    // if (id) {

      // const listProductByCate = async (_id:any) => {
      //   const {data} = await listProductByCategory(products?.category);
        
      //   setProductCate(data.products);
      // }  
      // listProductByCate(id);
     
    //  }
    console.log(listComment);
    
    const onSubmit: SubmitHandler<FormInputs> = async (comment) =>{
      console.log(comment);
      // console.log( JSON.parse(String(localStorage.getItem("user"))).user);
      const userInFo = JSON.parse(String(localStorage.getItem("user"))).user;

        await onAddComment({
          comment: comment.comment,
          userInfomation: userInFo,
          product:products
        })

        toastr.success("Bình luận phẩm thành công");
              
        setTimeout(() => {
           navigate('/detail/'+id)
          //  navigate('/myAccount/'+id);
        }, 1000); 
    }
     
  return (
   <div className='detailProduct'>
      <section className="container_detail " key={products?._id}>
        <div className="image-detail">
          <div >
            <img src={products?.img}  width={350} id="main_img" />
          </div>
          <div className="mini">
            <img src="../image/book-3.png"  width={120} className="small-img" />
            <img src="../image/book-4.png"  width={120} className="small-img" />
            <img src="../image/book-5.png"  width={120} className="small-img" />
          </div>
        </div>
        <div className="product-information">
          <h1 className="text-4xl">${products?.name}</h1>
          <div className="stars">
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star-half-alt" />
          </div>
          <p className="mt-8 ">Be the first to review this product</p>
          <p className="price_now">${products?.price} <span className="price_old">${products?.price}</span></p>
          <p className="font-bold  ">QUICK OVERVIEW</p>
          <p className=" text-sm mt-1 ">Ut metus. Maecenas dapibus nibh eu est. Proin faucibus pharetra nibh. Integer aliquet tellus in felis. Quisque mi pede, imperdiet a, dapibus vel, bibendum rhoncus, nulla. Sed eu velit. Maecenas molestie, ipsum nec nonummy mattis, ipsum lectus imperdiet nibh</p>
          <div className="quantity">
            <span>Quantity: </span>
            <input type="number"  id="quantityProduct" min={0} max={100} />
          </div>
          <div className="buttons">
            <a href="#" className="buy">buy now</a>
            <button  className="cart" style={{border:"1px solid #ddd", padding:"6px 10px", background:"#27AE60", color:"#fff"}} onClick={() => addItem(abc("#quantityProduct"))} id="btnAddToCart">Add to cart</button>
          </div>
        </div>
      </section>
      {/* end product detail */}
      {/* comment  start*/}
      <section className="comment">
        <h1 className="heading"> <span>Review</span></h1>

        <List
          itemLayout="horizontal"
          dataSource={listComment}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design">{item.userInfomation.username}</a>}
                description={item.comment}
              />
            </List.Item>
          )}
        />

          
        {JSON.parse(localStorage.getItem("user") as string)  ?  <form onSubmit={handleSubmit(onSubmit)} id="formComment" style={{border: '1px solid #E8E8E8', backgroundColor: '#E8E8E8', padding: '5px 10px'}}>
       
          <input type="text" id="commentInput" {...register("comment", {required:true})} style={{border:"1px solid", width:"100%"}} className="shadow-sm border-solid px-2 py-1 w-full mt-1 border focus:ring-indigo-500 focus:border-indigo-500 flex-1 block  rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Comment's here" />
        </form>
         : <p style={{color: 'red', background: '#ddd', padding: '5px 10px'}}>Đăng nhập để bình luận về sản phẩm này</p>
        
        }
      </section>
      {/* related products start */}
      <section className="featured">
        <h1 className="heading"> <span>Related Products</span></h1>
        <div className="swiper featured-slider z-0">
          <div className="swiper-wrapper products-container ">
            {productCate?.map((item) => <div className="swiper-slide box ">
                <div className="icons">
                  <a  className="fas fa-shopping-cart" />
                  <a  className="fas fa-heart" />
                  <a href={'/detail/'+item._id} className="fas fa-eye" />
                </div>    
                <div className="image product" data-name="p-${item.id}">
                  <img src={item.img}  />
                </div>
                <div className="content">
                  <h3>{item.name}</h3>
                  <div className="price">${item.price} <span>${item.price}</span></div>
                  <a href="#" className="btn">add to cart</a>
                </div>
              </div>
              )}
          </div>
         
        </div>
    
      </section>
</div>

  )
}

export default DetailProduct