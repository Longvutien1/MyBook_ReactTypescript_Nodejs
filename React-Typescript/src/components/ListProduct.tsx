import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Swiper from 'swiper'
import { list } from '../api/products'
import { ProductType } from '../types/products'

type Props = {}

const ListProduct =  (props: Props) => {

 
    const [products, setProducts] = useState<ProductType[]>([]);
  
    useEffect(() => {
    
        const getProduct = async () => {
          const {data} = await list();
          setProducts(data);
        }
        getProduct();

        
      },[])

      console.log(products);
      
  return  <section className="featured" id="featured">
  <h1 className="heading"> <span>featured books</span></h1>
  <div className="swiper featured-slider" style={{zIndex: 0}}>
  <div className="swiper-wrapper products-container">

      {products?.map((item) => 
          <div className="swiper-slide box">
              <div className="icons">
                  <NavLink to="" className="fas fa-shopping-cart" > </NavLink>
                  <NavLink to="" className="fas fa-heart"> </NavLink>
                  <NavLink to={'detail/'+item._id} className="fas fa-eye" > </NavLink>
              </div>    
              <div className="image product" data-name="p-${item.id}">
                  <img src={item.img} />
              </div>
              <div className="content">
                  <h3>{item.name}</h3>
                  <div className="price">$ {item.price} <span>$99.00</span></div>
                  <a data-id="${item.id}" className="btn" id="btnAddToCart">add to cart</a>
              </div>
          </div>
      ).join("")}
  </div>
  <div className="swiper-button-next" />
  <div className="swiper-button-prev" />
  </div>

  
</section>
  
}

export default ListProduct