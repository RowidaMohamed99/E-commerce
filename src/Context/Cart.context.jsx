import { useContext, useState } from "react";
import { createContext } from "react";
import { UserContext } from "./Context";
import axios from 'axios';
import toast from "react-hot-toast";


export const CartContext = createContext(null);

export default function CartProvider ({children}){
const {token}= useContext(UserContext)
const [cartInfo, setCartInfo]= useState(null);

    async function addProductToCart({productId}){
        let toastId = toast.loading("Adding....")
    try{
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/cart",
            method: "POST",
            headers: {
                token
            },
            data: {
                productId
            }
        }
        let {data} = await axios.request(options);
        if(data.status == "success"){
            toast.success(data.message)
            getCartProduct()
        }
        console.log(data);
    }catch (error){
        console.log (error);
    } finally{
        toast.dismiss(toastId)
    }
    }

    async function getCartProduct(){        
    try {
        const options= {
            url:"https://ecommerce.routemisr.com/api/v1/cart",
            method: "GET",
            headers: {
                token
            }
        }
        let {data}= await axios.request(options)
        setCartInfo (data)
        if(data.status == "success"){
        }
        
    } catch (error) {
        console.log (error);
    }
    }

    async function removeProduct({productId}){
        let toastId = toast.loading("Deleting....")
    try {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method: "DELETE",
            headers: {
                token,
            }, 
        };
        let {data}= await axios.request(options);
        console.log(data);
        if(data.status == "success"){
            setCartInfo(data)
            toast.success("Cart Removed")
        }
    } catch (error) { 
        console.log(error);
    } finally{
        toast.dismiss(toastId)
    }
    }

    async function clearCart(){
        let toastId = toast.loading("Clearing....")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "DELETE",
                headers: {
                    token,
                },
            };
            let {data} = await axios.request(options)
            console.log(data);
            if(data.message == "success"){
                setCartInfo ({numOfCartItems : 0});
                toast.success("Cart Deleted")
            }
        } catch (error){
            console.log(error);
        } finally{
            toast.dismiss(toastId)
        }
    }

    async function updataCount({productId, count}) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "PUT",
                headers: {
                    token
                },
                data: {
                    count
                }, 
            }
            let {data} = await axios.request (options)
            console.log(data);
            if(data.status == "success"){
                setCartInfo (data)
            }
            
        } catch (error){
            console.log(error);
        }
    }


return <>
<CartContext.Provider 
value={
    {addProductToCart, getCartProduct, cartInfo, removeProduct, clearCart, updataCount}
    }>
    {children}
</CartContext.Provider>
</>
}