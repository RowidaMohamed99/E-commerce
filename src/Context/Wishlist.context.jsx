import { createContext, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./Context";
import toast from "react-hot-toast";



export const WishlistContext = createContext(null)

export default function WishlistProvider ({children}){
    const {token} = useContext(UserContext)
    const [wishlistInfo, setWishlistInfo] =  useState(null)

    async function addToWishlist({productId}){
        let toastId = toast.loading("Loading product to wishlist")
        try{
            const options= {
                url: "https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "POST",
                headers: {
                    token
                },
                data: {
                    productId
                }
            }            
            let {data} =  await axios.request(options);
            console.log(data);
            toast.success("added product to wishlist")
        }catch (error){
            console.log(error);
        }finally{
            toast.dismiss(toastId)
        }
    }

    async function getWishlist(){

        try{
            const options={
                url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
                method: "GET",
                headers: {
                    token
                }
            }
            let {data} = await axios.request(options)
            setWishlistInfo(data)
            console.log(data);
        }catch (error){
            console.log(error);
        }
    }


    async function removeFromWishlist({productId}){
        let toastId = toast.loading("Removing product...")
        try{
            const options={
                url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                method: "DELETE",
                headers: {
                    token
                },
            };
            let {data} = await axios.request(options);
            if(data.status == "success"){
                getWishlist()
                toast.success("Cart Removed")
            }
        }catch (error){
            console.log(error);
        }finally{
            toast.dismiss(toastId)
        }
    }
    


return <>
(
    <WishlistContext.Provider value={{addToWishlist, getWishlist, wishlistInfo, removeFromWishlist}}>
    {children}
    </WishlistContext.Provider>
)
</>
}