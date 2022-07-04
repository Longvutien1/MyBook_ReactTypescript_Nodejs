
import Swiper from "swiper";

import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { remove } from '../api/products';
import ShowInfo from '../components/ShowInfo';
import { ProductType } from '../types/products';
import Header from '../components/header';
import Footer from "../components/footer";
import ListProduct from "../components/ListProduct";

type HomePageProps = {
  data: ProductType[]
}

const HomePage = ({data}: HomePageProps) => {

  const [products, setProducts] = useState<ProductType[]>([]);
  const removeItem = async (id:number) => {
    // xóa trên api
    const {data} = await remove(id);
    // reRender
    data && setProducts(products.filter(item => item._id !== data._id));
  }

  useEffect(() => {
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
    const swiper = new Swiper(".books-slider", {
      loop: true,

      centeredSlides: true,
      autoplay: {
          delay: 3500,
          disableOnInteraction: false,
      },

      breakpoints: {
          0: {
              slidesPerView: 1,
          },
          768: {
              slidesPerView: 2,
          },
          1024: {
              slidesPerView: 3,
          },
      },
  });
  // Sswiper.onload();
  swiper
  
  // eslint-disable-next-line no-unused-vars
  const swiper3 = new Swiper(".arrivals-slider", {
      spaceBetween: 10,
      loop: true,
      centeredSlides: true,
      autoplay: {
          delay: 9500,
          disableOnInteraction: false,
      },
      breakpoints: {
          0: {
              slidesPerView: 1,
          },
          768: {
              slidesPerView: 2,
          },
          1024: {
              slidesPerView: 3,
          },
      },
  });
  swiper3
  // eslint-disable-next-line no-unused-vars
  const swiper4 = new Swiper(".reviews-slider", {
      spaceBetween: 10,
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      autoplay: {
          delay: 9500,
          disableOnInteraction: false,
      },
      breakpoints: {
          0: {
              slidesPerView: 1,
          },
          768: {
              slidesPerView: 2,
          },
          1024: {
              slidesPerView: 3,
          },
      },
  });
  // eslint-disable-next-line no-unused-vars
  const swiper5 = new Swiper(".blogs-slider", {
      spaceBetween: 10,
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      autoplay: {
          delay: 9500,
          disableOnInteraction: false,
      },
      breakpoints: {
          0: {
              slidesPerView: 1,
          },
          768: {
              slidesPerView: 2,
          },
          1024: {
              slidesPerView: 3,
          },
      },
  });
  
  },[])
  return (
   <div className="homeLayout">
      <section className="home" id="home">
        <div className="row2">
          <div className="content">
            <h3>upto 73% off</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi animi facere vel reprehenderit ullam reiciendis dignissimos. Quia, sint dolor.</p>
            <NavLink to="" className="btn-shop-now btn">Shop now</NavLink>
          </div>
          <div className="swiper books-slider z-0">
            <div className="swiper-wrapper" >
              <NavLink to="#" className="swiper-slide"><img src="../image/book-1.png"/> </NavLink>
              <NavLink to="#" className="swiper-slide"><img src="../image/book-2.png"/> </NavLink>
              <NavLink to="#" className="swiper-slide"><img src="../image/book-3.png"/> </NavLink>
            </div>
            <img src="../image/stand.png" className="stand" />
          </div>
        </div>
      </section>
      {/* home section end  */}
      {/* icons section starts  */}
      <section className="icons-container">
        <div className="icons">
          <i className="fas fa-shipping-fast" />
          <div className="content">
            <h3>free shipping</h3>
            <p>order over $100</p>
          </div>
        </div>
        <div className="icons">
          <i className="fas fa-lock" />
          <div className="content">
            <h3>secure payment</h3>
            <p>100 secure payment</p>
          </div>
        </div>
        <div className="icons">
          <i className="fas fa-redo-alt" />
          <div className="content">
            <h3>easy returns</h3>
            <p>10 days returns</p>
          </div>
        </div>
        <div className="icons">
          <i className="fas fa-headset" />
          <div className="content">
            <h3>24/7 support</h3>
            <p>call us anytime</p>
          </div>
        </div>
      </section>
      {/* icons section end  */}
      {/* featured section starts  */}
      
        <section className="featured" id="featured">
          <h1 className="heading"> <span>featured books</span></h1>
          <div className="swiper featured-slider" style={{zIndex: 0}}>
          <div className="swiper-wrapper products-container">

              {data?.map((item) => 
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
              )}
          </div>
          {/* <div className="swiper-button-next" />
          <div className="swiper-button-prev" /> */}
          </div>

        
      </section>

        {/* <ListProduct/> */}

      {/* featured section ends */}

      {/* newsletter section starts --*/}
      <section className="newsletter">
        <form >
          <h3>subscribe for latest updates</h3>
          <input type="email" name="" placeholder="enter your email" className="box" />
          <input type="submit" defaultValue="subscribe" className="btn" />
        </form>
      </section>
      {/* newsletter section starts --*/}
      {/* arrivals section starts  */}
      <section className="arrivals" id="arrivals">
        <h1 className="heading -z-10"> <span>new arrivals</span> </h1>
        <div className="swiper arrivals-slider ">
          <div className="swiper-wrapper ">
          <div className="swiper-slide box">
              <div className="image">
                <img src="../image/book-4.png"  />
              </div>
              <div className="content">
                <h3>Title</h3>
                <div className="price">$80.00 <span>$99.00</span></div>
                <div className="stars">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star-half-alt" />
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="swiper arrivals-slider ">
          <div className="swiper-wrapper">
              <div className="swiper-slide box">
                  <div className="image">
                    <img src="../image/book-5.png"  />
                  </div>
                  <div className="content">
                    <h3>Title</h3>
                    <div className="price">$80.00<span>$99.99</span></div>
                    <div className="stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                  </div>
                </div>

          </div>
        </div>
      </section>
      {/* arrivals section starts  */}
      {/* deal section starts  */}
      <section className="deal">
        <div className="content">
          <h3>deal of the day</h3>
          <h1>upto 50% off</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto sit, possimus molestiae unde voluptate dolorum voluptatem maiores ex.</p>
          <NavLink to="" className="btn">shop now</NavLink>
        </div>
        <div className="image">
          <img src="image/deal-img.jpg" />
        </div>
      </section>
      {/* deal section ends */}
      {/* reviews section starts  */}
      <section className="reviews" id="reviews">
        <h1 className="heading -z-10"> <span>Members reviews</span> </h1>
        <div className="swiper reviews-slider  ">
          <div className="swiper-wrapper ">
            <div className="swiper-slide box ">
              <img src="image/pic-1.png"  />
              <h3>Long Vũ Tiến</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur nihil ipsa placeat. Aperiam at sint, eos ex similique facere hic.</p>
              <div className="stars">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
              </div>
            </div>
            <div className="swiper-slide box">
              <img src="image/pic-2.png"  />
              <h3>Vũ Tiến Long</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur nihil ipsa placeat. Aperiam at sint, eos ex similique facere hic.</p>
              <div className="stars">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
              </div>
            </div>
            <div className="swiper-slide box">
              <img src="image/pic-3.png"  />
              <h3>Long Vũ Tiến</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur nihil ipsa placeat. Aperiam at sint, eos ex similique facere hic.</p>
              <div className="stars">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
              </div>
            </div>
            <div className="swiper-slide box">
              <img src="image/pic-4.png"  />
              <h3>Long Vũ Tiến</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur nihil ipsa placeat. Aperiam at sint, eos ex similique facere hic.</p>
              <div className="stars">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
              </div>
            </div>
            <div className="swiper-slide box">
              <img src="image/pic-5.png"  />
              <h3>Long Vũ Tiến</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur nihil ipsa placeat. Aperiam at sint, eos ex similique facere hic.</p>
              <div className="stars">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* reviews section ends */}
      {/* blogs section starts  */}
      <section className="blogs" id="blogs">
        <h1 className="heading -z-10"> <span>our blogs</span> </h1>
        <div className="swiper blogs-slider ">
          <div className="swiper-wrapper">
                
                  <div className="swiper-slide box">
                    <div className="image">
                      <img src="image/blog-1.jpg"  />
                    </div>
                    <div className="content">
                      <h3>blog title goes here</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, odio.</p>
                      <a href="#" className="btn">read more</a>
                    </div>
                  </div>

                  <div className="swiper-slide box">
                    <div className="image">
                      <img src="image/blog-2.jpg"  />
                    </div>
                    <div className="content">
                      <h3>blog title goes here</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, odio.</p>
                      <a href="#" className="btn">read more</a>
                    </div>
                  </div>

                  <div className="swiper-slide box">
                    <div className="image">
                      <img src="image/blog-3.jpg"  />
                    </div>
                    <div className="content">
                      <h3>blog title goes here</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, odio.</p>
                      <a href="#" className="btn">read more</a>
                    </div>
                  </div>

                  <div className="swiper-slide box">
                    <div className="image">
                      <img src="image/blog-4.jpg"  />
                    </div>
                    <div className="content">
                      <h3>blog title goes here</h3>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, odio.</p>
                      <a href="#" className="btn">read more</a>
                    </div>
                  </div>
                  
          </div>

         
        </div>
      </section>
      {/* blogs section starts  */}
      <Footer/>

    </div>

     
   


  )
}

export default HomePage;