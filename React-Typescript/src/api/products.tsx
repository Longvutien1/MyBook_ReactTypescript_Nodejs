import { ProductType } from "../types/products";
import { isAuthencicate } from "../utils/localstorage";
import instance from "./instance";

// gọi token and user trong localstorage 


export const addProduct = (product: ProductType, {token, user} = isAuthencicate()) => {
        const url = `/products/${user._id}`;
        return instance.post(url, product,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
}


export const list = () => {
    const url = '/products';
    return instance.get(url);

}

export const listProductSortHigh = () => {
    const url = '/products?_sort=price&_order=desc';
    return instance.get(url);
}
export const listProductSortLow = () => {
    const url = '/products?_sort=price&_order=asc';
    return instance.get(url);
}

export const top10Product = () => {
    const url = '/products?_sort=price&_order=desc&_limit=5';
    return instance.get(url);

}

export const remove = (id:number) => {
    const url = `/products/${id}`;
    return instance.delete(url)
}


export const getProductById = (id:number) => {
    const url = `/products/${id}`;
    return instance.get(url);
}


export const update = (product:ProductType) => {
    const url = `/products/${product._id}`;
    return instance.put(url, product);
}

export const getProductByName = (productName:string) => {
    const url = `/products?productName=${productName}`;
    return instance.get(url);
};
