import React from 'react'
import { Outlet } from 'react-router-dom'
import { CartProvider } from 'react-use-cart'
import Footer from '../../components/footer'
import Header from '../../components/header'

type Props = {}

const WebsiteLayout = (props: Props) => {
  return (
    <div className='container2'>      
        <CartProvider><Header/></CartProvider>
        
        <main>
            <Outlet/>
        </main>
    
    </div>
  )
}

export default WebsiteLayout;