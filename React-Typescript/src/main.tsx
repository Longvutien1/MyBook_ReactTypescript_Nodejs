import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
// const myName:string = "Vũ Tiến Long";
// const age:number = 20;
// const phone:string = "0392127565"
// const arr: {name:string, age:number} = {name:"long", age: 20}

// type ShowProps = {
//   name: string
// }

// function show(props:ShowProps):any {
//   console.log(props.name);
  
// }
// function Show(props:ShowProps):any {
//   console.log('props',props);
//   console.log(props.name);
//   return null
  
// }
// ReactDOM.render(
//   <div><h1>Hello {myName}</h1> 
//       <div>Age: {age}</div>
//       <div>Arr: {arr.name}</div>
//       <div>{show({name:"Long chanh thôn"})}</div>
//       <div><Show name={myName} /></div>
//   </div>, document.querySelector('#root')
// )
 
// ReactDOM.render(<App /> ,document.getElementById("root"))
ReactDOM.render( <BrowserRouter> <App /></BrowserRouter> , document.getElementById("root"));