import { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";

export default function Carditem({productInfo}) {
    const {count, price, product} = productInfo;
    const {title, imageCover, category, id} = product;
    let {removeProduct, updataCount} = useContext (CartContext)

    
return <>
<div className="flex gap-3">

<div className="cart-item px-4 grow flex justify-between items-center bg-gray-100 py-6 rounded-lg">
    <img src={imageCover} alt={title} 
    className="w-24 h-24 object-cover rounded-full border-4 border-white" />
    <Link
    to= {`/product/${id}`}
    className="text-lg text-gray-700 font-semibold">
        {title}
    </Link
    >

    <h3 className="text-lg text-gray-500 font-semibold">{category.name}</h3>
    <div className="count flex gap-5 items-center">
        <span className="text-lg font-bold text-gray-600">{count}</span>
        <div className="icons space-y-2">
        <div
        onClick={()=>{updataCount({productId : id, count: count+1})}}
        className="plus w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center cursor-pointer">
            <i className="fa-solid fa-plus"></i>
        </div>
        <div 
        onClick={()=>{updataCount({productId :id, count: count-1})}}
        className="plus w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center cursor-pointer">
        <i className="fa-solid fa-minus"></i>
        </div>
        </div>
    </div>
    <span>{price} L.E</span>
</div>

<button 
onClick={()=>{removeProduct ({productId: id})}}
className=" rounded-md p-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
    <i className="fa-solid fa-xmark"></i>
</button>

</div>

</>
}
