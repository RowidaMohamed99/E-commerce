import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Context/Cart.context'
import Loading from '../Loading/Loading'
import Carditem from './../Cartitem/Carditem';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  let {getCartProduct, cartInfo, clearCart} = useContext(CartContext)

useEffect (()=>{
  getCartProduct()}, [])

  return <>
  <Helmet>
        <title>Cart page</title>
      </Helmet>
  {cartInfo == null? (<Loading/>) :(
  <section>
    <div className="flex gap-8 items-center mt-4">
      <i className="fa-brands fa-opencart text-3xl "></i>
      <h2 className="text-xl text-slate-600 font-semibold pl-4 relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2 ">
      your Shopping Cart</h2>

    </div>
    {cartInfo.numOfCartItems == 0 ? (
      <div className="mt-6 bg-gray-100 p-5 rounded-md shadow flex justify-center items-center flex-col gap-3">
        <h2 className='text-center'>
          Oops! Your cart is empty. Start shopping now by clicking the buttom below and find something you love
        </h2>
        <Link to="/" className="btn bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 mt-4 rounded-lg text-center">
        Back to home</Link>
      </div>
    ) : (
      <>
      <div className="space-y-4 mt-6 px-4">
        {cartInfo.data.products.map((product)=> <Carditem key={product._id} productInfo={product}/>)}
      </div>
      
      <div className="my-5 px-4 flex justify-between items-center">
        <p className="text-xl">
          <i className="fa-solid fa-dollar-sign text-xl mr-2 text-primary-600"></i>
          Your Total Cart Price <span className="text-primary-600 font-bold">
            {cartInfo.data.totalCartPrice} L.E</span>
            
        </p>
        <button 
        onClick={clearCart}
        className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <i className="fa-solid fa-trash mr-2"></i>
              Clear Cart
            </button>

      </div>
      
      <Link 
      to="/checkout"
      className="btn w-[90%] sm:w-full inline-block text-center mx-4 mb-5  py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white"
      >
      Payment
      </Link>
      </>
      )}
  </section>)
  }
  </>
}
