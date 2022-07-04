import { Breadcrumb, Menu } from 'antd'
import Layout, { Content, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import SubMenu from 'antd/lib/menu/SubMenu'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { UserOutlined,CommentOutlined ,DollarOutlined, LaptopOutlined } from '@ant-design/icons';
type Props = {}

const AdminLayout = (props: Props) => {
  
  return (
    <Layout style={{width:"100%"}}>
       <Header className="header" >
          <div className="logo">
              <NavLink aria-current="page" className="logo active" to="/"><i className="fas fa-book"></i> myBook </NavLink>
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><NavLink to='/admin'>Admin</NavLink></Menu.Item>
            <Menu.Item key="2"><NavLink to='/'>Home</NavLink></Menu.Item> 
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>

        <Layout>
          <Sider width={200} className="site-layout-background">
          <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}style={{ height: '100%', borderRight: 0 }} >

            <SubMenu key="sub1" icon={<LaptopOutlined />} title="Product">
              <Menu.Item key="1"><NavLink to='/admin/product'>List Product</NavLink></Menu.Item>
              <Menu.Item key="2"><NavLink to='/admin/product/add'>Add Product</NavLink></Menu.Item>
            </SubMenu>

            <SubMenu key="sub2" icon={<DollarOutlined />} title="Category">
              <Menu.Item key="9"><NavLink to='/admin/category'>List Category</NavLink></Menu.Item>
              <Menu.Item key="10"><NavLink to='/admin/category/add'>Add Category</NavLink></Menu.Item>
            </SubMenu>

            <SubMenu key="sub3" icon={<UserOutlined />} title="User">
              <Menu.Item key="3"><NavLink to='/admin/user'>List User</NavLink></Menu.Item>
              <Menu.Item key="4"><NavLink to='/admin/user/add'>Add User</NavLink></Menu.Item>
            </SubMenu>
           
            <SubMenu key="sub4" icon={<CommentOutlined />} title="Order">
              <Menu.Item key="5"><NavLink to='/admin/order'>List Order</NavLink></Menu.Item>
            </SubMenu>

            <SubMenu key="sub5" icon={<DollarOutlined />} title="Salary">
              <Menu.Item key="7">List Salary</Menu.Item>
              <Menu.Item key="8">Detail Salary</Menu.Item>
            </SubMenu>
         
            

          </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
             <aside><Outlet/></aside>
            </Content>
          </Layout>
        </Layout>
        
        {/* <main>Main</main> */}
    </Layout>


  )

 
}

export default AdminLayout