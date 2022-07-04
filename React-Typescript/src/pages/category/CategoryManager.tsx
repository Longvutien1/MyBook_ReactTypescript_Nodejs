import { Space, Table } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { CategoryType, ProductType } from '../../types/products'

type CategoryManagerProps = {
    categories: CategoryType[],
    onRemoveCategory: (_id:number) => void
}

const CategoryManager =   ( { categories, onRemoveCategory }: CategoryManagerProps) => {

    // title 
    const headings = [
        { title: "STT", dataIndex: "stt", key: "stt"},
        { title: "Name", dataIndex: "name", key: "name"},
        // { title: "Id", dataIndex: "id", key: "id"},
        {
            title: "Action",
            key:'action',
            render:  (recore:any) => (
                <Space size="middle">
                    {/* <a href='edit/:id' >Edit</a> */}
                    <NavLink to={'/admin/category/edit/'+recore.id}>Edit</NavLink>
                    {/* <button onClick={ () => onRemove(id)}>Remove</button> */}
                    <button  onClick={() => onRemoveCategory(recore.id)}>Delete</button>
                </Space>
            )
        }
    ]

    // data
    const dataSourd =  categories.map((item,index) => {
        return {
            key: index+ 1,
            stt: item._id,
            name: item.name,
            id: item._id,
        }
    })


     return (
    <div>
        <button className='btnAdmin'><NavLink to="/admin/category/add">Add Category</NavLink></button>
            <h1>CategoryManager</h1>
       
        <Table columns={headings} dataSource={dataSourd}></Table>
        
    </div>
  )
}

export default CategoryManager