import React, { useContext } from 'react'
import carticon from "../../images/freshcart-logo.svg"
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../Context/Context'
import { CartContext } from '../../Context/Cart.context'
import { useEffect } from 'react';

export default function Navbar() {
  const {token, logOut} = useContext(UserContext)
  const {cartInfo, getCartProduct} = useContext (CartContext)
  
  useEffect (()=> {getCartProduct()}, [])

  return <>
  <nav className="bg-slate-100 shadow-lg fixed left-0 top-0 right-0 z-50">
    <div className="container flex justify-between items-center gap-12 py-3 ">
      <a href="">
        <img src={carticon} alt="freshCart logo" className='w-28' />
      </a>
      {token && (<> 
      <ul className="items-center flex gap-5 md:flex-row xl:flex lg:flex-row justify-between flex-col sm:hidden">
        <li>
          <NavLink className={({isActive})=>{
            return`relative before:absolute before:w-0 before:-bottom-1 before:left-0  before:h-0.5 before:bg-primary-800 hover:before:w-full hover:font-semibold hover:transition-[width] before:duration-300
            ${isActive ? "before:!w-full font-semibold":""}`}}
            to="/">Home</NavLink>
        </li>
        <li>
          <NavLink className={({isActive})=>{
            return`relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:-bottom-1 before:left-0 hover:before:w-full hover:font-semibold hover:transition-[width] before:duration-300
            ${isActive ? "before:!w-full font-semibold":""}`}}
          to= "/Cart">Cart</NavLink>
        </li>
        <li>
          <NavLink className={({isActive})=>{
            return`relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:-bottom-1 before:left-0 hover:before:w-full hover:font-semibold hover:transition-[width] before:duration-300
            ${isActive ? "before:!w-full font-semibold":""}`}}
          to= "/wishlist">Wish list</NavLink>
        </li>
        <li>
          <NavLink className={({isActive})=>{
            return`relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full hover:font-semibold hover:transition-[width] before:duration-300
            ${isActive? "before:!w-full font-semibold":""}`
          }} to= "Products">Products</NavLink>
        </li>
        <li>
          <NavLink className={({isActive})=>{
            return`relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full hover:font-semibold hover:transition-[width] before:duration-300
            ${isActive? "before:!w-full font-semibold":""}`}} 
          to= "/Categories">Categories</NavLink>
        </li>
        <li>
          <NavLink className={({isActive})=>{
            return`relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full hover:font-semibold hover:transition-[width] before:duration-300
            ${isActive? "before:!w-full font-semibold":""}`}} 
          to= "/brands">Brands</NavLink>
        </li>

        <li>
          <NavLink className={({isActive})=>{
            return`relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full hover:font-semibold hover:transition-[width] before:duration-300
            ${isActive? "before:!w-full font-semibold":""}`}} 
          to= "/allorders">Orders</NavLink>
        </li>
      </ul>

      <Link to="/cart" className="cart relative ml-auto cursor-pointer ">
        <i  className="fa-solid fa-cart-shopping text-lg"></i>
        <div className="cout absolute w-5 h-5 bg-primary-800 rounded-full top-0 right-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* <div className="fa-solid fa-spinner text-sm fa-spin text-white"></div> */}
          <span className="text-sm font-semibold">
            {cartInfo == null ? (
              <i className="fa-solid fa-spinner text-sm fa-spin text-white"></i>) :
              (<span className="text-sm font-semibold text-white">{cartInfo.numOfCartItems}</span>)}
              </span>
        </div>
      </Link> </>)}
      <div className='navmenu text-right xl:hidden md:hidden block '>
        <i className='fa-solid fa-bars text-[20px]'></i>
      </div>

      <ul className={`flex items-center gap-5 ${!token&& "ms-auto"}`}>
      <li>
        <a href="http://instagram.com" target="_blank">
          <i className="fa-brands fa-instagram"></i>          
        </a>
      </li>
      <li>
        <a href="http://facebook.com" target="_blank">
          <i className="fa-brands fa-facebook"></i>
        </a>
      </li>
      <li>
        <a href="http://tiktok.com" target="_blank">
          <i className="fa-brands fa-tiktok"></i>
        </a>
      </li>
      <li>
        <a href="http://twitter.com" target="_blank">
          <i className="fa-brands fa-twitter"></i>
        </a>
      </li>
      <li>
        <a href="http://linkedin.com" target="_blank">
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </li>
      <li>
        <a href="http://youtube.com" target="_blank">
          <i className="fa-brands fa-youtube"></i>
        </a>
      </li>
      
      </ul>

      {!token && (<> <ul className="flex items-center gap-5">
        <li>
          <NavLink className={({isActive})=>{
            return`relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full hover:font-semibold hover:transition-[width] before:duration-300
            ${isActive? "before:!w-full font-semibold":""}`}} 
          to= "/Signup">Sign Up</NavLink>
        </li>
        <li>
          <NavLink className={({isActive})=>{
            return`relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 before:left-0 before:-bottom-1 hover:before:w-full hover:font-semibold hover:transition-[width] before:duration-300
            ${isActive? "before:!w-full font-semibold":""}`}} 
          to= "/Login">Login</NavLink>
        </li>
      </ul> </>) }

        <div className='flex justify-center items-center cursor-pointer' onClick={logOut}>
          <i className="fa-solid fa-right-from-bracket text-lg"></i>
        </div>


      
    </div>


  </nav>
  </>
}

