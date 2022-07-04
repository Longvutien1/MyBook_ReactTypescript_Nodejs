import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userInfomation: {
       
        name: {
            type: String,
            required:true
        },
        phone: {
            type: String,
            required:true
        },
        address:{
            type: String,
            required:true
        },
        specificaddress: {
            type: String,
            required:true
        },
        noinhan: {
            type: String,
            required:true
        },
    },
    listproduct: [
        {
           
            id:  {
                type: String,
                required:true
            },
            img:  {
                type: String,
                required:true
            },
            itemTotal:{
                type: Number,
                required:true
            },
            price:{
                type: Number,
                required:true
            },
            name:  {
                type: String,
                required:true
            },
            quantity:{
                type: Number,
                required:true
            },
           
        }
    ],
    cartTotal: {
        type: Number,
        required:true
    }, 
    status: {
        type:String,
        required:true
    }
}, {timestamps: true})

export default mongoose.model('Order',orderSchema);