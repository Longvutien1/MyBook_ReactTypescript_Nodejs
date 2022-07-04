import React from 'react'
import { Navigate } from 'react-router-dom';

type PrivateRouterProps = {
    children: JSX.Element;
}

const PrivateRouter = (props: PrivateRouterProps) => {
    const isAdmin = JSON.parse(String(localStorage.getItem("user"))).user.role;
    console.log(isAdmin);
    
    if (isAdmin == 0) {
        return <Navigate to="/"/>
    }
 
  return props.children
}

export default PrivateRouter;
