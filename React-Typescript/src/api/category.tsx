import { CategoryType } from "../types/products";
import instance from "./instance";


export const listCategory = () => {
    const url = "/categories";
    return instance.get(url)
}

export const addCategory = (product: CategoryType) => {
    const url = `/categories`;
    return instance.post(url, product)

}

export const getCategoryById = (id:number) => {
    const url = `/categories/${id}`;
    return instance.get(url);
}
export const updateCategory = (category:CategoryType) => {
    const url = `/categories/${category._id}`;
    return instance.put(url, category);
}

export const removeCategory = (id:number) => {
    const url = `/categories/${id}`;
    return instance.delete(url);
}

export const listProductByCategory = (id:any) => {
    const url = `/categories/${id}`;
    return instance.get(url);
}

