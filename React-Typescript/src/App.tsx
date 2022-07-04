
import './App.css'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import ProductPage from './pages/product';
import AboutPage from './pages/about';
import Header from './components/header';
import WebsiteLayout from './pages/layouts/WebsiteLayout';
import AdminLayout from './pages/layouts/AdminLayout';
import DetailProduct from './pages/DetailProduct';
import { useEffect, useState } from 'react';
import { CategoryType, CommentType, OrderType, ProductType, UserType } from './types/products';
import { addProduct, list, remove, update } from './api/products';
import Login from './pages/user/login';
import ProductManager from './pages/products/ProductManager';
import AddProduct from './pages/products/add';
import EditProduct from './pages/products/edit';
import PrivateRouter from './midlerware/PrivateRouter';
import Register from './pages/user/Register';
import UserManager from './pages/user/UserManager';
import { addUser, getUserById, listUsers, removeUser, updateUser } from './api/user';
import AddUser from './pages/user/add';
import EditUser from './pages/user/edit';
import CategoryManager from './pages/category/CategoryManager';
import { addCategory, listCategory, removeCategory, updateCategory } from './api/category';
import AddCategory from './pages/category/add';
import EditCategory from './pages/category/edit';
import Shop from './pages/shop';
import Cart from './pages/Cart/cart';
import {CartProvider} from 'react-use-cart'
// import CartManager from './pages/Cart/CartManager';
import { addOrder, listOrder, removeOrder, updateOrder } from './api/order';
import OrderManager from './pages/order/OrderManager';
import DetailOrder from './pages/order/DetailOrder';
import MyAccount from './pages/MyAccount';
import toastr from "toastr";
import { addComment, listComment } from './api/comment';
// import { addComment, listComment } from './api/comment';
// import OrderManager from './pages/layouts/order/OrderManager';
// import DetailOrder from './pages/layouts/order/DetailOrder';
function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [comments, setComment] = useState<CommentType[]>([]);
  useEffect(() => {
        // get product
    const getProduct = async () => {
      const {data} = await list();
      // console.log(data);
      
      setProducts(data);

    }
    getProduct();

    // get User
    const getUsers = async () => {
      const {data} = await listUsers();
  
      
      setUsers(data)
    }
    getUsers();

    const getCategory = async () => {
      const { data } = await listCategory();
      setCategories(data);
    }
    getCategory();
  
    const getOrders = async () => {
      const { data } = await listOrder();
      setOrders(data);
    }
    getOrders();

    const getComments = async () => {
      const { data } = await listComment();
      setComment(data);
    }
    getComments();
  },[])
  

  const removeItem = async (id:number) => {
    // xóa trên api
    await remove(id);
    toastr.success("Deltete Successfully");

    // reRender
    setProducts(products.filter(item => item._id  !== id))
   
    
  }
  const onRemoveUser = async (id:number) => {
    // xóa trên api
    await removeUser(id)
    toastr.success("Deltete Successfully");
    // reRender
    setUsers(users.filter(item => item._id !== id))
  }

  const onRemoveCategory = async (id:number) => {
    // xóa trên api
    await removeCategory(id)
    toastr.success("Deltete Successfully");
    // reRender
    setCategories(categories.filter(item => item._id !== id))
  }

  const onRemoveOrder = async (id:number) => {
    // xóa trên api
    await removeOrder(id)
    toastr.success("Deltete Successfully");
    // reRender
    setOrders(orders.filter(item => item._id !== id))
  }


  const onHandleAdd = async (product:ProductType) => {
    const {data} =  await addProduct(product);
    console.log(data);
    
    setProducts([...products, data])
  }
  const onHandleOrder = async (product:OrderType) => {
    const {data} =  await addOrder(product);
    console.log(data);
    
    setOrders([...products, data])
  }
  
  const onHandlerUser = async (user: UserType) => {
    console.log(user);
    const {data} = await addUser(user);
    console.log(data);
    if (data.message) {
      alert(data.message)
    }else{
        toastr.success("Add Successfully");
        // navigate('/');
    }
    setUsers([...users, data.user])
  }

  const onHandleCategory = async (category:CategoryType) => {
    const {data} =  await addCategory(category);
    console.log(data);
    
    setCategories([...categories, data])
  }
  
  const onAddComment = async (comment:CommentType) => {
    const {data} = await addComment(comment);
    setCategories([...comments, data])
  }

  const onHandlerUpdate = async (product:ProductType) => {
    const {data} = await update(product);
    setProducts(products.map(item => item._id === data._id ? data : item ));
  }

  const onHandlerUpdateCategory = async (category:CategoryType) => {
    const {data} = await updateCategory(category);

    setCategories(categories.map(item => item._id === data._id ? data : item ));
  }
  const onUpdatUser = async (user:UserType) => {
    console.log();
    
    const {data} = await updateUser({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      password: user.password,
      phone:user.phone,
      address: user.address,
      img: user.img[0].name,
      sex:user.sex
  });
    // const {data} = await updateUser();
    console.log(data);
    
    setUsers(users.map(item => item._id === data._id ? data : item))
  }

  const onUpdatUserAdmin = async (user:UserType) => {
    // console.log();
    
    const {data} = await updateUser({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      password: user.password
  });
    // const {data} = await updateUser();
    // console.log(data);
    
    setUsers(users.map(item => item._id === data._id ? data : item))
  }

  const onUpdateOrder = async (order:OrderType) => {
    const {data} = await updateOrder(order);

    setOrders(orders.map(item => item._id === data._id ? data : item ));
  }
  return (

    <div >
      
        <main>
          <Routes>
            <Route path="/" element={<WebsiteLayout/>}>
              <Route index element={<HomePage data={products} />}/>
              <Route path="product" element={<ProductPage/>}/>
              <Route path="about" element={<AboutPage/>}/>
              <Route path="/detail/:id" element={<CartProvider><DetailProduct onAddComment={onAddComment} listComment={comments} /></CartProvider>} /> 
              <Route path="/myAccount/:id" element={<MyAccount onUpdateUser={onUpdatUser}/>}/>
            </Route>

            <Route path="/shop" element={<WebsiteLayout/>}>
              <Route index element={<CartProvider><Shop fullProduct={products} listCategory={categories} /></CartProvider>}/>
              <Route path=":id" element={<Shop fullProduct={products} listCategory={categories} />}/>
            </Route>

            <Route path="/cart" element={<WebsiteLayout/>}>
              <Route index element={<CartProvider><Cart onAddOrder={onHandleOrder}/></CartProvider>}/>
            
            </Route>

            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>

            <Route path="admin" element={<PrivateRouter><AdminLayout/></PrivateRouter>}>
                <Route index element={<Navigate to="product"/>}/>
                <Route path="product" >
                  <Route index element={<ProductManager products={products}  onRemove={removeItem} />}/>
                  <Route path="add" element={<AddProduct listCategory={categories} onAdd={onHandleAdd}/>}/>
                  <Route path="edit/:id" element={<EditProduct listCategory={categories} onUpdate={onHandlerUpdate}/>}/>
    
                </Route>
              
                {/* user manager */}
                <Route path='user'>
                  <Route index element={<UserManager users={users} onRemoveUser={onRemoveUser}/>} />
                  <Route path='add' element={<AddUser onAddUser={onHandlerUser}/>}/>
                  <Route path="edit/:id" element={<EditUser onUpdateUser={onUpdatUserAdmin}/>}/>

                </Route>

                {/* category manager */}
                <Route path="category" >
                  <Route index element={<CategoryManager categories={categories} onRemoveCategory={onRemoveCategory}/>}/>
                  <Route path="add" element={<AddCategory onAddCategory={onHandleCategory}/>}/>
                  <Route path="edit/:id" element={<EditCategory onUpdateCategory={onHandlerUpdateCategory}/>}/>
                </Route>

                 {/* order manager */}
                 <Route path="order" >
                  <Route index element={<OrderManager orders={orders} onRemoveOrder={onRemoveOrder} />}/>
                  <Route path="edit/:id" element={<DetailOrder onUpdateOrder={onUpdateOrder}/>}/>
                </Route>
            </Route>
          </Routes>


        </main>
    </div>
  )
}

export default App;
