import { CommentType, UserType } from "../types/products";
import instance from "./instance";


export const addComment = (comment: CommentType) => {
    const url = `/comments`;
    return instance.post(url, comment)

}

export const listComment = () => {
    const url = "/comments";
    return instance.get(url)
}