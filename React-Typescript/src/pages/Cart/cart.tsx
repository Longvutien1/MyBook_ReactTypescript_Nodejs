import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { CartProvider, useCart } from "react-use-cart";
import { addOrder } from '../../api/order';
import { OrderType } from '../../types/products';
import { thanhT } from '../../utils/upload';
type CartProps = {
  onAddOrder: (product: OrderType) => void
}

type FormInputs = {

  userInfomation: {
    id?: number
    name?: string,
    phone?: string,
    address?: string,
    specificaddress?:string,
    noinhan?:string,
    
  }
}

const Cart = (props: CartProps) => {
  const { isEmpty, totalUniqueItems, items, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart } = useCart();
  const { register, handleSubmit, formState } = useForm<FormInputs>();
  console.log(items);
  
  useEffect(() => {
    // thanh toán
    const btnThanhToan = document.querySelector(".btn_thanh_toan");
    const formThanhToan = document.querySelector(".formThanhToan");
    const remove = document.querySelector(".removeform");

    thanhT(btnThanhToan, formThanhToan, remove);
  }, [])

  const onSubmit: SubmitHandler<FormInputs> = async (products) => {
    console.log(products);
    console.log(items);

    await addOrder({
      userInfomation: products.userInfomation,
      listproduct: items,
      cartTotal: cartTotal,
      status: "0" 
    }).then(() => {
      alert("Mua hàng thành công")
    })

  }
  if (isEmpty) {
    return <h1>Your cart is empty</h1>
  }
  return (
    <div>
      <section className="cart">
        <h1 style={{ padding: "0 9%" }}>Shopping Cart</h1>
        <div className="container-cart">
          <div className="list_product">
            {items.map((item, index) => {
              return (
                <div className="product_cart" key={index}>
                  <span className="del"> <button type="submit" onClick={() => removeItem(item.id)} className="btn btn-remove" style={{ padding: "5px 10px" }}><i className="fas fa-times" /></button></span>
                  <div className="image">
                    <img src={item.img} width={150} />
                  </div>
                  <div className="info-product">
                    <div>
                      <p className="name">{item.productName}</p>
                      <p className="price">${item.price}</p>
                    </div>
                    <div className="flex">
                      <button onClick={() => updateItemQuantity(item.id, Number(item.quantity) + 1)} type="submit" data-id="${item.id}" className="btn btn-increase px-3 h-10 my-auto mx-1 rounded-xl text-white border " style={{ background: '#27AE60' }}>+</button>
                      {/* <input type="text" className="h-10 my-auto w-14 text-center font-bold" style={{height:"30px", width:"80px"}} defaultValue={item.quantity} /> */}
                      <span style={{ height: "30px", width: "90px" }} >{item.quantity}</span>
                      <button onClick={() => updateItemQuantity(item.id, Number(item.quantity) - 1)} type="submit" data-id="${item.id}" className="btn btn-decrease px-3 h-10 my-auto mx-1 rounded-xl text-white border " style={{ background: '#27AE60' }}>-</button>
                    </div>
                    <p> In Stoke</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="order">
            <h2>Order summary</h2>
            <div className="don_hang">
              {items.map((item, index) => {
                return (
                  <div className="dl_don_hang" style={{ display: "flex" }}>
                    <div>
                      <div style={{ display: "flex" }}>
                        <p><img src={item.img} alt="" width={100} /></p>
                        <div>
                          <p>{item.name} <span className="text-sm font-semibold pl-4"></span></p>
                          <p>${item.price}</p>
                        </div>
                      </div>

                    </div>
                    <p>x<span> {item.quantity}</span></p>

                  </div>

                )
              })}

              <div className="dl_don_hang">
                <p>Tạm tính</p>
                <p>${cartTotal}.00</p>
              </div>
              <div className="dl_don_hang">
                <p>Phí vận chuyển</p>
                <p>$<span id="phi_vc" />.00</p>
              </div>
              <div className="dl_don_hang">
                <p>Tổng</p>
                <p>${cartTotal}.00</p>
              </div>
              <div className="flex justify-between py-4">
                <p className="font-bold">Trả tiền mặt khi nhận hàng</p>
              </div>
              <div className=" py-2">
                <button type="submit" className="btn_thanh_toan" name="thanh_toan">Thanh toán</button>
              </div>
            </div>
          </div>
          <div className="formThanhToan">
            <form className="preview" onSubmit={handleSubmit(onSubmit)}>
              <i className="removeform fas fa-times" />
              <p>Full Name</p>
              <input type="text" {...register("userInfomation.name", { required: true })} id="fullname" placeholder="Full Name" />
              <p>Phone</p>
              <input type="text" {...register("userInfomation.phone", { required: true })} id="phone" placeholder="Phone" />
              <p>Address</p>
              <input type="text" {...register("userInfomation.address", { required: true })} id="address" placeholder="Address" />
              <select id="noi-nhan"  {...register("userInfomation.noinhan", { required: true })} className="my-4 text-left" style={{ border: '1px solid #219150' }}>
                <option value="Home">Home</option>
                <option value="Company">Company</option>
              </select>
              <p>Specific address</p>
              <div className="mt-1">
                <textarea id="specific-address" {...register("userInfomation.specificaddress", { required: true })}  rows={3} className="px-2 py-1 w-full mt-1 block w-full sm:text-sm rounded-md" style={{ border: '1px solid #219150', width: "100%" }} placeholder="Specific address" defaultValue={""} />
              </div>
              <div className="buttons">
                <button type="submit" id="btn_buy_now" className="cart text-center">Buy now</button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Cart