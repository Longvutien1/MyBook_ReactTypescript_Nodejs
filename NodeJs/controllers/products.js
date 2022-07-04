import Product from '../models/product';


export const listProduct = async  (req, res) => {
    // console.log(1221);
    console.log(req.query._sort);
    console.log(req.query._limit);
    console.log(req.query._order);
    const sortBy = req.query._sort;
    const order = req.query._order;
    const limit = req.query._limit;

    const search = req.query.productName;
    try {
        let product;
        if (sortBy && order) {
             product = await Product.find().sort({ 'price': order}).limit(limit);
        }else if (search) {
             product = await Product.find({name: search})
        }else{
            product = await Product.find().exec();
        }
        
        res.json(product);

    } catch (error) {
        res.status(400).json({message: "Không tìm thấy data"})
    }
}

export const productDetail = async  (request ,response) => {
    try {
       const product = await Product.findOne({_id:request.params.id}).exec()
        response.json(product);
    } catch (error) {
        response.status(400).json({message: "Không tìn thấy data"})
    }
    // response.json(products.find(item => item.id === +request.params.id));
}

// export const get10Product = async (req, res) => {
   
//     try {
//         const product = await Product.find().sort({ 'price': order}).limit(limit);
//         // console.log(product);
//         res.json(product);
//     } catch (error) {
//         res.status(400).json({message: "Không tìn thấy data"})
//     }
// }

// export const searchProductByName = async (req, res) => {
//     console.log(req.query.productName);
    
//     try {
        
//         console.log(product);
//         res.json(product);
//     } catch (error) {
//         res.status(400).json({message: "Không tìn thấy data"})
//     }
// }

export const addProduct = async (request, response) => { 
    try {
        const product = await Product(request.body).save();
        response.json(product);
    } catch (error) {
        response.status(400).json({message:"Không thể tạo mới sản phẩm"});
    }
    // response.json(products.push(request.body));
}

export const deleteProduct = async (request, response) => {
    try {
        const product = await Product.findOneAndDelete({_id: request.params.id});
        response.json(product);
    } catch (error) {
        response.status(400).json({message:"Không thể xóa"});
    }
   
}

export const updateProduct = async (request, response) => {
    try {
        const product = await Product.findOneAndUpdate({_id: request.params.id}, request.body, {new: true});
        response.json(product);

    } catch (error) {
        response.status(400).json({message:"Không thể sửa"});
    }
  
}