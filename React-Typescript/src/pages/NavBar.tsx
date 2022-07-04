import React, { useEffect } from 'react'

type Props = {}

const NavBar = (props: Props) => {

   
  return (
    <div>
         <nav className="sidebar close">
            <header>
                <div className="image-text">
                <span className="image">
                    <a  className="logo"><i className="fas fa-book text-3xl" style={{color: '#27AE60'}} /> </a>
                </span>
                <div className="text logo-text">
                    <span className="profession ">myBook</span>
                </div>
                </div>
                <i className="bx bx-chevron-right toggle" />
            </header>
            <div className="menu-bar">
                <div className="menu">
                <li className="search-box">
                    <i className="bx bx-search icon" />
                    <input type="text" placeholder="Search..." />
                </li>
                <ul className="menu-links">
                    <li className="nav-link">
                    <a href="/">
                        <i className="bx bx-home-alt icon" />
                        <span className="text nav-text">Home</span>
                    </a>
                    </li>
                    <li className="nav-link">
                    <a id="menu-category">
                        <i className="bx bx-category icon" />
                        <span className="text nav-text">Category</span>
                        <i className="bx bx-chevron-down icon icon2" />
                    </a>
                    <ul id="menu2-category">
                        <li className="nav-link">
                        <a href="/#/admin/categories/add">
                            <i className="bx bx-category icon" />
                            <span className=" nav-text">Add Category</span>
                        </a>
                        </li>
                        <li className="nav-link">
                        <a href="/admin/categories/list">
                            <i className="bx bx-category icon" />
                            <span className=" nav-text">List Category</span>
                        </a>
                        </li>
                    </ul>
                    </li>
                    <li className="nav-link">
                    <a id="menu-product">
                        <i className="bx bxl-product-hunt icon" />
                        <span className="text nav-text">Product</span>
                        <i className="bx bx-chevron-down icon icon2 " />
                    </a>
                    <ul id="menu2-product">
                        <li className="nav-link">
                        <a href="/#/admin/products/add">
                            <i className="bx bxs-plus-circle icon" />
                            <span className=" nav-text">Add Product</span>
                        </a>
                        </li>
                        <li className="nav-link">
                        <a href="/#/admin/products/list">
                            <i className="bx bxl-paypal icon" />
                            <span className=" nav-text">List Product</span>
                        </a>
                        </li>
                    </ul>
                    </li>
                    <li className="nav-link">
                    <a id="menu-user">
                        <i className="bx bx-user icon" />
                        <span className="text nav-text">User</span>
                        <i className="bx bx-chevron-down icon icon2" />
                    </a>
                    <ul id="menu2-user">
                        <li className="nav-link">
                        <a href="/#/admin/users/add">
                            <i className="bx bx-user-plus icon" />
                            <span className=" nav-text">Add User</span>
                        </a>
                        </li>
                        <li className="nav-link">
                        <a href="/admin/users/list">
                            <i className="bx bxs-user-detail icon" />
                            <span className=" nav-text">List User</span>
                        </a>
                        </li>
                    </ul>
                    </li>
                    <li className="nav-link">
                    <a id="menu-order">
                        <i className="bx bxl-product-hunt icon" />
                        <span className="text nav-text">Orders</span>
                        <i className="bx bx-chevron-down icon icon2 " />
                    </a>
                    <ul id="menu2-order">
                        <li className="nav-link">
                        <a href="/#/admin/orders/list">
                            <i className="bx bxl-paypal icon" />
                            <span className=" nav-text">List Orders</span>
                        </a>
                        </li>
                    </ul>
                    </li>
                    <li className="nav-link">
                    <a id="menu-comment">
                        <i className="bx bx-heart icon" />
                        <span className="text nav-text">Comments</span>
                        <i className="bx bx-chevron-down icon icon2 " />
                    </a>
                    <ul id="menu2-comment">
                        <li className="nav-link">
                        <a href="/#/admin/comments/list">
                            <i className="bx bx-heart icon" />
                            <span className=" nav-text">List Comments</span>
                        </a>
                        </li>
                    </ul>
                    </li>
                    <li className="nav-link">
                    <a href="#">
                        <i className="bx bx-bell icon" />
                        <span className="text nav-text">Notifications</span>
                    </a>
                    </li>
                </ul>
                </div>
                <div className="bottom-content">
                <li >
                    <a href="#">
                    <i className="bx bx-log-out icon" />
                    <span className="text nav-text">Logout</span>
                    </a>
                </li>
                <li className="mode">
                    <div className="sun-moon">
                    <i className="bx bx-moon icon moon" />
                    <i className="bx bx-sun icon sun" />
                    </div>
                    <span className="mode-text text">Dark mode</span>
                    <div className="toggle-switch">
                    <span className="switch" />
                    </div>
                </li>
                </div>
            </div>
            </nav>

    </div>
  )
}

export default NavBar