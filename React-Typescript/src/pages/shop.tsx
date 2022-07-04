import toastr from "toastr";
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { CategoryType, ProductType } from '../types/products'
import { List, Card, Image, Button, Select } from 'antd';
import { getProductByName, list, listProductSortHigh, listProductSortLow, top10Product } from '../api/products';
import { listProductByCategory } from '../api/category';
import { Option } from 'antd/lib/mentions';

import "toastr/build/toastr.min.css";
// import { searchByName } from '../utils/upload';
import { CartProvider, useCart } from "react-use-cart";
type ShopProps = {
  fullProduct: ProductType[],
  listCategory: CategoryType[]
}



const Shop =  ({fullProduct, listCategory}: ShopProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsTop10, setProductTop10] = useState<ProductType[]>([]);
  const { Option } = Select;
  const { addItem } = useCart();

  const handleChange = async (value:any) => {
    console.log(`selected ${value}`);
    if (value == "thap") {
      // console.log("đang ở thấp");
     const {data} =  await  listProductSortLow();
      setProducts(data);
    }else if (value == "cao") {
      const {data} =  await  listProductSortHigh();
      setProducts(data);
    }else{
      const {data} =  await  list();
      setProducts(data);
    }
  }
  const {id} = useParams();
  var dataSourd = [] ;
  
  
 useEffect(() => {
   setProducts(fullProduct);

  const getProductTop10 = async () => {
    const {data} = await top10Product();
    // console.log(data );
    
    setProductTop10(data)
}
    getProductTop10();
 }, [fullProduct])


const searchByName =  () => {
  const search = document.querySelector("#search"); 
    const getSearch = async (search:any) => {
      const {data} = await getProductByName(search.value); 
      console.log(data.length);
      
      setProducts(data)
      if (data.length == 0) {
        toastr.error("Không tìm thấy sản phẩm nào");
      }else{
        toastr.success("Tìm thấy "+ data.length +" sản phẩm")
      }
    }
    getSearch(search);
 }



 if (id) {
  const listProductByCate = async (id:any) => {
    const {data} = await listProductByCategory(id);
    setProducts(data.products);
    // console.log(data.products);
  }  
  listProductByCate(id);
  
 }
 const products2 = [
  {
    id: 1,
    name: "Malm",
    price: 9900,
    quantity: 1
  },
  {
    id: 2,
    name: "Nordli",
    price: 16500,
    quantity: 5
  },
  {
    id: 3,
    name: "Kullen",
    price: 4500,
    quantity: 1
  },
];
 dataSourd = products.map((item,index) => {
  return {
     
      id: item._id,
      name: item.name,
      img: item.img,
      price: item.price,
      quantity: 1
  }
})
 
  
  return (
    <section className="container-shop">
    <div className="left col-span-3">
    <div className="mb-8" style={{marginBottom:"22px"}}>
      <p className="text-3xl mb-2" style={{fontSize:"24px", marginBottom:"8px"}}>Sreach</p>
      <div className="w-full border border-solid flex justify-between" style={{display:"flex", justifyContent:"space-between"}}>
        <input className="w-10/12 p-1 outline-none  normal-case" style={{width:"80%", outline:"none"}} id="search" type="text" placeholder="Tìm kiếm" name="search" />
        <button  className="w-2/12  mx-auto btn_search" onClick={() => searchByName()} style={{width:"20%",margin:"auto", background:"none"}} id="btn-search" type="submit" ><i className="fas fa-search" /></button>
      </div>
    </div>
    <ul>
      <li className="border text-white pl-4 text-3xl py-2" style={{backgroundColor: '#27ae60', color: '#FFF', fontSize:"18px", paddingLeft:"16px"}}>CATEGORY</li>
      <div className="category" style={{height: 250, overflow: 'scroll'}}>
        {
        listCategory.map((item) => <div>
            <NavLink to={'/shop/'+item._id} id="btn-category"><li className="xam border px-4  py-2" style={{border: "1px solid #27ae60", color:"#000"}}>{item.name}</li></NavLink>
          </div> )
        }
        {/* <NavLink to="/#/shop/${item.id}" id="btn-category"><li className="xam border px-4  py-2" style={{border: "1px solid #27ae60", color:"#000"}}>loại 1</li></NavLink> */}
      </div>
      <li className="border px-4  py-2" style={{backgroundColor: '#27ae60', color: '#000'}}>
        <form  method="GET">
          <input className="w-full p-1 outline-none" style={{width:"100%", padding:"4px", outline:"none"}} type="text" name="search_loai" placeholder="Từ khóa tìm kiếm" />
        </form>
      </li>
    </ul>
    <ul>
      <li className="border text-white pl-4 text-3xl py-2 mt-8" style={{backgroundColor: '#27ae60', color: '#fff', fontSize:"18px", paddingLeft:"16px"}}>FAVORITE PRODUCTS</li>
     <div>
        {productsTop10?.map((item) => <div>
          <li className="border px-4  py-2 flex gap-4" style={{border: '1px solid #27ae60', display:"flex", gap:"16px"}}>
            <NavLink to={'/detail/'+item._id}><img src={item.img}  width={120} /></NavLink>
            <div>
              <NavLink className="text-md" to={'/detail/'+item._id}>{item.name}</NavLink>
              <p className="text-gray-400 text-md font-semibold line-through" style={{textDecoration:"line-through", color:"gray"}}>${item.price}</p>
              <p className="text-yellow-500 text-md font-semibold" style={{color:"orange"}}>${item.price}</p>
            </div>
          </li>
          </div>
          )}
       

      </div>

      <li className="border px-4  py-2" style={{backgroundColor: '#27ae60'}}>
        <p className="p-3" />
     
      </li>
    </ul>
  </div>
  <div className="right col-span-9">
    <h4 className="italic text-3xl text-center text-red-200" style={{marginTop:"17px"}}>Sản Phẩm Của Chúng Tôi</h4>
    <Select defaultValue="all" style={{ width: 150 , marginBottom: 20}} onChange={handleChange}>
      <Option value="all">All</Option>
      <Option value="cao">Cao xuống thấp</Option>
      <Option value="thap">Thấp tới cao</Option>
    </Select>
    {/* <div id="product" className="product-shop sm:grid sm:grid-cols-1 sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-3 gap-8 mt-8 "> */}
    <List
      grid={{ gutter: 16, column: 3 }}
      size={'default'}
      dataSource={dataSourd}
      pagination={{
        onChange: page => {
          // console.log(page);
        },
        pageSize: 9,
      }}
      renderItem={item => (
        <List.Item>
          
          <Card key={item.id} title={<Image width={150} style={{textAlign:"center"}}  src={item.img} />}>
              <p>{item.name}   <p> ${item.price}</p></p>
              <button  data-id="${item.id}" className="btn" onClick={() => addItem(item)} id="btnAddToCart">add to cart</button>
          </Card>
        </List.Item>
      )}
    />,
    {/* </div> */}
    {/*end all sản phẩm  */}
    {/* end danh sách sản phẩm */}
  </div>
</section>

  )
  }
export default Shop