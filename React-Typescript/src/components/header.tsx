import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { CartProvider, useCart } from "react-use-cart";
type Props = {}

const Header = (props: Props) => {
  const navigate = useNavigate();
  const { isEmpty, totalUniqueItems, items, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();

  const handlerLogout = () => {
    localStorage.removeItem("user");
  }
 
  return (

    <div>
      <div className="header" id="header">
        <div className="header-1">
          <NavLink className="logo" to="/"><i className="fas fa-book" /> myBook </NavLink>
          <form className="search-form">
            <input type="search" placeholder="Search here..." id="search-box" />
            <label htmlFor="search-box" className="fas fa-search" />
          </form>
          <div className="icons">
            <div id="search-btn" className="fas fa-search" />
            <NavLink to="/cart" className="fas fa-shopping-cart"> {totalUniqueItems}</NavLink>
           
            {localStorage.getItem("user") ?
              <div className="userHover "><span><i className="fas fa-user mr-2" /></span>
                <div className="menuUser">
                  <ul>
                    <NavLink to={'/myAccount/'+JSON.parse(String(localStorage?.getItem("user"))).user._id}>
                      <li className="px-3 py-1 float-left hoverVang">Tài khoản của tôi</li>
                    </NavLink>
                    <NavLink to="" id="logout" onClick={() => handlerLogout()}>
                      <li className="px-3 py-1 float-left  hoverVang">Đăng xuất</li>
                    </NavLink>
                  </ul>
                </div>
              </div>
              :  <NavLink to="/login" className="fas fa-user" > </NavLink>
              }
            <NavLink to="" id="logout" className="text-xl"><i className="bx bx-log-out-circle bx-rotate-180" /></NavLink>


          </div>
        </div>
        <div className="header-2">
          <nav className="navbar2">
            <NavLink className="navLink" to="/">Home page</NavLink>
            <NavLink className="navLink" to="/shop">Shop</NavLink>
            <NavLink className="navLink" to="/#/">featured</NavLink>
            <NavLink className="navLink" to="/#/">arrivals</NavLink>
            <NavLink className="navLink" to="/#/">reviews</NavLink>
            <NavLink className="navLink" to="/#/">blogs</NavLink>
            <NavLink className="navLink" to="/admin">Admin</NavLink>

            <span>Hello {localStorage.getItem("user") ? `
                  ${JSON.parse(String(localStorage.getItem("user"))).user.username}
                `: ""}</span>
          </nav>  

        </div>
      </div>
      {/* header section ends */}

    </div>



  )
}

export default Header;