import { useContext } from 'react'
import { CartContext } from '../../Context/Cart.context'
import { Link } from 'react-router-dom'
import { WishlistContext } from '../../Context/Wishlist.context'

export default function Card({productInfo}) {
    const {imageCover, title, price, category, desription, ratingsAverage, id} = productInfo
    let {addProductToCart} = useContext(CartContext)
    let {addToWishlist}= useContext(WishlistContext)


return <>
<div className="card grid grid-cols-1 group/card rounded-lg overflow-hidden shadow-lg p-4 hover:shadow-md hover:shadow-green-500 transition-shadow duration-500">
    
    <div className="relative">
    <img src={imageCover} alt={imageCover} />
    <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 flex gap-4 justify-center items-center absolute left-0 top-0 w-full h-full bg-slate-400 bg-opacity-40 opacity-0">
        <div onClick={()=>{
            addToWishlist({productId: id})}}
        className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center">
            <i className="fa-solid fa-heart"></i>
        </div>
        <div onClick={()=>{
            addProductToCart({productId: id})}}
        className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center">
            <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <Link to={`/product/${id}`}
        className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex justify-center items-center">
            <i className="fa-solid fa-eye"></i>
        </Link>
    </div>
    </div>
    <div className="card-body space-y-3">
        <header>
        <Link to={`/product/${id}`}
        className="text-sm py-1 font-semibold text-gray-600 line-clamp-1">
            {title}
        </Link>
        <h4 className="text-primary-500 font-semibold">{category.name}</h4>
        </header>
        <p className="text-gray-400 text-sm line-clamp-2">{desription}</p>
    </div>
    <div className="flex justify-between items-center">
        <span>{price}</span>
        <div> 
            <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
            <span>{ratingsAverage}</span>
        </div>
    </div>
</div>
</>
}
