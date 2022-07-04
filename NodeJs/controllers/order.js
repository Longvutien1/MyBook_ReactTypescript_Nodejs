import Order from "../models/order";



export const addOrder = async (req, res) => {
    try {
        console.log(req.body);
        const orders = await Order(req.body).save();
        // console.log(orders);
        res.json(orders);

        // const product = await Product(request.body).save();
        // response.json(product);
    } catch (error) {
        res.status(400).json({message:"Không thêm được"});
    }
}


export const  listOrder = async (req, res) => {
    try {
        const orders = await Order.find().exec();
        res.json(orders);
    } catch (error) {
        res.status(400).json({message:"Không tìm thấy "});
    }
}


export const orderDetail = async  (request ,response) => {
    try {
       const orders = await Order.findOne({_id:request.params.id}).exec()
        response.json(orders);
    } catch (error) {
        response.status(400).json({message: "Không tìn thấy data"})
    }
    // response.json(products.find(item => item.id === +request.params.id));
}


export const updateOrder = async (req, res) => {
    try {
        const orders = await Order.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        res.json(orders);

    } catch (error) {
        res.status(400).json({message:"Không thể sửa"});
    }
  
}

export const removeOrder = async (req, res) => {
    try {
        const orders = await Order.findOneAndDelete({id:req.params._id});
        res.json(orders);
    } catch (error) {
        res.status(400).json({message:"Xóa thất bại"});
    }
}