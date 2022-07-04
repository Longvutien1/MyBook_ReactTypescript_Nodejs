import { Space, Table } from 'antd'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { OrderType } from '../../types/products'
import { statusOrder } from '../../utils/upload'
// import { OrderType } from '../../../types/products'
// import { statusOrder } from '../../../utils/upload'

type Props = {
    orders: OrderType[],
    onRemoveOrder: (id:number) => void
}

const OrderManager = ({orders, onRemoveOrder}: Props) => {

    useEffect(() => {
        const statusListOrder = document.querySelectorAll("#statusListOrder");
         statusOrder(statusListOrder)
    },[orders])
  // title 
  const headings = [
    { title: "STT", dataIndex: "stt", key: "stt"},
    { title: "Name", dataIndex: "name", key: "name"},
    { title: "Phone", dataIndex: "phone", key: "phone"},
    { title: "Address", dataIndex: "address", key: "address"},
    { 
        title: "Status",
        dataIndex: "status", 
        key: "status",
    },

    {
        title: "Action",
        key:'action',
        render:  (recore:any) => (
            <Space size="middle">
                {/* <a href='edit/:id' >Edit</a> */}
                <NavLink to={'/admin/order/edit/'+recore.id}>Detail Order</NavLink>
                <button onClick={ () => onRemoveOrder(recore.id)}>Remove</button>
                {/* <button >Delete</button> */}
            </Space>
        )
    }
]

// data
const dataSourd =  orders.map((item,index) => {
    // console.log(item.img);
    console.log(item);
    
    return {
        key: index+ 1,
        stt:  index+ 1,
        name: item.userInfomation.name,
        phone: item.userInfomation.phone,
        address: item.userInfomation.address,
        status:   <div id="statusListOrder" data-id2={item.status} className=" text-center px-2 py-1 rounded-md " />,
        id: item._id
    }
})


 return (
<div>
   
        <h1>Order Manager</h1>
   
    <Table columns={headings} dataSource={dataSourd}></Table>
    
</div>
)
}

export default OrderManager

