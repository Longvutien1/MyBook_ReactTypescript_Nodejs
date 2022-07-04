import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import { orderDetail } from '../../api/order';
import { OrderType } from '../../types/products';
// import { orderDetail } from '../../../api/order';
// import { OrderType } from '../../../types/products';
import toastr from "toastr";
type DetailOrderProps = {
  onUpdateOrder: (order: OrderType) => void
}
type FormInputs = {
  _id?:number,
    createdAt?:Date,
    userInfomation: {
        name?: string,
        phone?: string,
        address?: string,
        specificaddress?:string,
        noinhan?:string
    },
    listproduct: [
        {
            key?:number,
            id?: string,
            img?: string,
            itemTotal?: number
            price?: number,
            name?: string,
            quantity?: number,
        }
    ],
    cartTotal: number,
    status: string
}
const DetailOrder = ({onUpdateOrder}: DetailOrderProps) => {
  const [orders, setOrders] = useState<OrderType>();
  const {id} = useParams();
  const {register, handleSubmit, formState:{errors}, reset} = useForm<FormInputs>();
  const navigate = useNavigate();
  useEffect(()=>{
    const getProduct2 = async (id:any) => {
      const {data} = await orderDetail(id);
      // console.log(data);

      setOrders(data);
      reset(data)
    }
    getProduct2(id);
  },[]);

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    console.log(data._id);
    await onUpdateOrder(data);
   
    toastr.success("Update Successfully");
              
    setTimeout(() => {
      navigate('/admin/order');
    }, 1000); 
  }
  
  return (
    <div>

      <section className="home-admin">
        <div className="dashboard py-4 px-4 pb-8" style={{backgroundColor: '#fff'}}>
          <h1 className=" text-4xl my-4">Detail Order</h1>
          
          {/* thong tin  order */}
          <h2 className="text-center p-3 mb-2 text-xl">Đơn hàng: {orders?._id}, Status: {orders?.status}</h2>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-8 " style={{display:"grid" , gridTemplateColumns:"7fr 5fr", gap:"30px",}}>
              <div className="col-span-7 p-8 don_hang2" style={{padding:"32px"}}>
                <p className="text-3xl font-bold" style={{fontSize:"18px", fontWeight:"600"}}>Thông tin giao hàng</p>
                <div>
                  <div style={{display:"flex", justifyContent:"space-between",padding:"4px 0", marginTop:"16px",borderBottom: '1px solid #ddd'}}>
                    <p>Họ tên người mua hàng: </p>
                    <p>{orders?.userInfomation.name}</p>
                  </div>
                  <div  style={{display:"flex", justifyContent:"space-between", marginTop:"16px",borderBottom: '1px solid #ddd'}}>
                    <p>Số điện thoại: </p>
                    <p>{orders?.userInfomation.phone}</p>
                  </div>
                  <div  style={{display:"flex", justifyContent:"space-between", marginTop:"16px",borderBottom: '1px solid #ddd'}}>
                    <p>Địa chỉ: </p>
                    <p>{orders?.userInfomation.address}</p>
                  </div>

                  <div  style={{display:"flex", justifyContent:"space-between", marginTop:"16px",borderBottom: '1px solid #ddd'}}>
                    <p>Địa chỉ cụ thể: </p>
                    <p>{orders?.userInfomation.specificaddress}</p>
                  </div>

                  <div  style={{display:"flex", justifyContent:"space-between", marginTop:"16px",borderBottom: '1px solid #ddd'}}>
                    <p>Loại địa chỉ: </p>
                    <p>{orders?.userInfomation.noinhan === "Home" ? "Nhà riêng" : "Văn phòng"}</p>
                  </div>

                  <div  style={{display:"flex", justifyContent:"space-between", marginTop:"16px",borderBottom: '1px solid #ddd'}}>
                    <p>Ngày mua: </p>
                    <p>{orders?.createdAt}</p>
                  </div>

                  <div>
                    <div className="float-right py-4 " style={{float:"right", padding:"16px 0"}}>
                      <select {...register("status", {required:true})} id="confirmOrder" className="mr-4 h-9 my-auto" style={{border: '1px solid #000', height:"32px", marginRight:"16px"}}>
                        <option value={1}>Duyệt</option>
                        <option value={2}>Giao hàng</option>
                        <option value={3}>Giao hàng thành công</option>
                        <option value={4}>Hủy đơn</option>
                      </select>
                      <button type="submit" className="btn_thanh_toan2" name="cap_nhat">Cập nhật</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-5 p-8 don_hang2"  style={{padding:"32px"}}>
                <p className="text-3xl font-bold" style={{fontSize:"18px", fontWeight:"600"}}>Đơn Hàng</p>
                <div>
                  <div className="flex justify-between py-2 mt-4" style={{display:"flex", justifyContent:"space-between",marginTop:"16px"}}>
                    <p>Sản phẩm </p>
                    <p>Số lượng</p>
                  </div>
                  {orders?.listproduct.map((item,index) => {
                    return(
                      <div className="dl_don_hang" key={index} style={{ display: "flex" }}>
                        <div> 
                          <div style={{ display: "flex" }}>
                            <p><img src={item.img} alt="" width={70} /></p>
                            <div>
                              <p>{item.name} <span className="text-sm font-semibold pl-4"></span></p>
                              <p>${item.price}</p>
                            </div>
                          </div>

                        </div>
                        <p>x<span> {item.quantity}</span></p>

                      </div>
                    )
                  })
                  }
                 

                  <div className="flex justify-between py-2" style={{display:"flex", justifyContent:"space-between",borderBottom: '1px solid #ddd'}}>
                    <p>Phí vận chuyển</p>
                    <p>$2</p>
                  </div>
                  <div className="flex justify-between py-2 font-bold" style={{display:"flex", justifyContent:"space-between",borderBottom: '1px solid #ddd'}}>
                    <p>Tổng</p>
                    <p>{orders?.cartTotal}</p>
                  </div>
                  <div className="flex justify-between py-2">
                    <p className="font-bold" style={{fontWeight:"600"}}>Trả tiền mặt khi nhận hàng</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div></section>


    </div>
  )
}

export default DetailOrder