import img from "../../images/banner-4.jpeg"
import { CartContext } from "../../Context/Cart.context";
import { useContext } from "react";
import { WishlistContext } from "../../Context/Wishlist.context";


export default function WishlistItem({wishlistInfo}) {
    let {imageCover, price, title, id} =wishlistInfo
    let {addProductToCart} = useContext(CartContext)
    let {removeFromWishlist} = useContext (WishlistContext)

return <>
<section className="p-5">
<div className="card flex justify-between bg-slate-100 p-5 rounded-xl">
<div className="flex gap-8">
<img src={imageCover} alt="" className="w-[100px] object-cover" />
    <div>
        <h3 className="font-semibold">{title}</h3>
        <span className="text-green-700 font-bold pb-2 inline-block">{price} EGP</span>
        <div onClick={()=>{
            removeFromWishlist({productId: id})
        }}
        className="cursor-pointer">
        <h4 className="text-red-600 ">
        <i className="fa-solid fa-trash text-red-600 pe-3"></i>
            remove</h4>
        </div>
    </div>
</div>
    <button onClick={()=>{
            addProductToCart({productId: id})}}
    className="btn h-[50px] text-black bg-white border-green-500 border-2 text-lg">add to cart</button>
</div>
</section>
</>
}
