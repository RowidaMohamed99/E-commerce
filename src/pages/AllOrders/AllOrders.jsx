import { useContext, useEffect, useState } from "react"
import { UserContext } from './../../Context/Context';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from './../../components/Loading/Loading';
import { Link } from "react-router-dom";

export default function AllOrders() {
    const {token} = useContext(UserContext)
    let {id} = jwtDecode(token)
    const [orders, setOrders] = useState(null)

    async function getUserOrders(){
        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: "GET",
            }
            let {data} = await axios.request(options)
            setOrders(data)
        } catch (error){
            console.log(error);
            
        }
    }
    
    useEffect(()=>{
        getUserOrders()
    }, [])
    
return <>
{orders? <section className="space-y-4">
    {orders.map ((order)=> <div key= {order.id} className="p-4 border-2 border-gray-500 border-opacity-25 rounded-lg">
        <header className="flex items-center justify-between">
            <div>
                <h2 className="text-gray-500">Order Id</h2>
                <span className="text-lg font-semibold text-gray-700">#{order.id}</span>
            </div>
            <div className="space-x-3">
            {order.isPaid? (<span className="inline-block font-cairo px-3 py-1 mx-2 bg-lime-500 text-white font-semibold rounded-xl ">
                تم الدفع</span>
            ):(
            <span className="inline-block font-cairo px-3 py-1 bg-red-500 text-white font-semibold rounded-xl ">
                غير مدفوع</span>)}

            {order.isPaid? (<span className="inline-block font-cairo px-3 py-1 mx-2 bg-lime-500 text-white font-semibold rounded-xl ">
            تم التوصيل</span>
            ):(
            <span className="inline-block font-cairo px-3 py-1 bg-blue-500 text-white font-semibold rounded-xl ">
            قيد التوصيل</span>)}
            </div>
        </header>
        <div className="grid space-x-3 mt-4 md:gab-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {order.cartItems.map((product)=> <div key={product._id} className="border-2 border-gray-700 border-opacity-30 p-3 rounded-lg">
            <img src={product.product.imageCover} alt="" className="w-full" />
            <h3 className="text-lg font-semibold line-clamp-2">
                <Link to={`/product/${product.product.id}`}>
                {product.product.title}
                </Link>
                </h3>
            <div className="flex justify-between items-center">
                <p>
                    <span className="font-bold underline">Count:</span>{product.count}
                </p>
                <span>{product.price}L.E</span>
            </div>
            </div>)}
        </div>
        <p className="pt-3 text-lg font-bold">*your total price is 
            <span className="mx-1 font-semibold text-primary-600">{order.totalOrderPrice} L.E</span></p>

    </div>)}
</section> : <Loading/>}
</>
}
