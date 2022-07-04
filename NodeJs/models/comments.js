import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    userInfomation:{
        _id:{
            type: String,
            required:true
        },
        username:{
            type: String,
            required:true
        },
        email:{
            type: String,
            required:true
        },
        role:{
            type: Number,
        }
        
        
    },
    product:{
        _id:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        }, 
        price:{
            type: Number,
            required: true
        }, 
        img: {
            type: String,
            required: true
        }, 
        category:{
            type: String,
            required: true
        }, 
        itemTotal:{
            type: Number,
        },  
        quantity:{
            type: Number,
        },  
        // quantity?: number | undefined;
    }
}, {timestamps: true})

export default mongoose.model('Comment',commentSchema);