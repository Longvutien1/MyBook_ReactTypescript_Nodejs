import { Space, Table } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../types/products'

type UserManagerProps = {
  users: UserType[]
  onRemoveUser: (id:number) => void
}

const UserManager = ({users, onRemoveUser}: UserManagerProps) => {
  // title 
  const headings = [
    {title: 'STT', dataIndex: 'stt', key:'stt'},
    {title: 'Username', dataIndex: 'username', key:'username'},
    {title: 'Email', dataIndex: 'email', key:'email'},
   
    {title: 'Role', dataIndex: 'role', key:'role'},
    {
      title: 'Action',
      key:'action',
      render: (recore:any) => (
        <Space size="middle">
            <NavLink to={'/admin/user/edit/'+recore.id}>Edit</NavLink>
            <button  onClick={() => onRemoveUser(recore.id)}>Delete</button>
        </Space>
      )
    }

  ]

  // data
  const dataSourd = users.map((item, index) => {
    return {
      key: index + 1,
      stt: index + 1,
      username: item.username,
      email: item.email,
      role: item.role == "0" ? "User" : "Admin",
      id: item._id 
    }
  })
  return (
    
    <div>
        <button className='btnAdmin'><NavLink to="/admin/user/add">Add User</NavLink></button>
        <h1>UserManager</h1>
        <Table columns={headings} dataSource={dataSourd}></Table>
    </div>
  )
}

export default UserManager