// import comments from "../models/comments";

import Comment from "../models/comments";



export const addComment = async (req, res) => {
    try {
        const comment = await Comment(req.body).save();
        res.json(comment);
    } catch (error) {
        res.status(400).json({message:"Không thêm được"});
    }
}

export const  listComment = async (req, res) => {
    try {
        const comment = await Comment.find().exec();
        res.json(comment);
    } catch (error) {
        res.status(400).json({message:"Không tìm thấy "});
    }
}