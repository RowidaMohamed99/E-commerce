import React, { useContext, useRef, useState } from 'react'
import carticon from "../../images/freshcart-logo.svg"
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../Context/Context'
import { CartContext } from '../../Context/Cart.context'
import { useEffect } from 'react';


export default function Navbar() {
  const {token, logOut} = useContext(UserContext)
  const {cartInfo, getCartProduct} = useContext (CartContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  let [mediaDisplay, setMediaDisplay] = useState(false)
  const mediaRef = useRef()

  
  
  useEffect (()=> {getCartProduct()}, [])

  function dropMenu() {
    if (!menuOpen) {
        document.querySelector(".menuList").classList.remove("hidden")
        document.querySelector(".menuList").classList.add("flex")

        setMenuOpen(true)
    } else {
        document.querySelector(".menuList").classList.add("hidden")
        document.querySelector(".menuList").classList.remove("flex")

        setMenuOpen(false)
    }
}

function displayMedia() {
  if (!mediaDisplay) {
      document.querySelector(".media").classList.remove("h-0")
      document.querySelector(".media").classList.add("h-[60px]")
      setMediaDisplay(true)
      window.onclick = function (e) {
          if (!e.target.classList.contains("mediaRef")) {
              document.querySelector(".media").classList.add("h-0")
              document.querySelector(".media").classList.remove("h-[60px]")
              setMediaDisplay(false)
          }
      }
  } else {
      document.querySelector(".media").classList.add("h-0")
      document.querySelector(".media").classList.remove("h-[60px]")
      setMediaDisplay(false)
  }
}
useEffect(() => {
  return function () {
      window.onclick = undefined
  }
}, [])

  return <>
  <nav className="bg-slate-100 shadow-lg fixed left-0 top-0 right-0 z-50 w-full px-2">
    <div className="container flex  gap-10 py-3 ">
      <div className='flex flex-col gap-4 lg:gap-20 md:flex-row items-center'>
      <Link href="/">
        <img src={carticon} alt="freshCart logo"/>
      </Link>
      {token && <> 
      <ul className="hidden flex-col md:flex-row md:flex menuList justify-center items-center ms-auto gap-5">
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
      </>}
      </div>
      {token && <i onClick={dropMenu} className=" text-[1.3rem] pt-2 fa-solid cursor-pointer md:hidden fa-bars"></i>}
      {token && <Link to="/cart" className="cart relative ml-auto pt-2 cursor-pointer ">
        <i  className="fa-solid fa-cart-shopping text-lg"></i>
        <div className="cout absolute w-5 h-5 bg-primary-800 rounded-full top-1 right-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <span className="text-sm font-semibold">
            {cartInfo == null ? (
              <i className="fa-solid fa-spinner text-sm fa-spin text-white"></i>) :
              (<span className="text-sm font-semibold text-white">{cartInfo.numOfCartItems}</span>)}
              </span>
        </div>
      </Link>}
      {token ? <div
        onClick={displayMedia}
        ref={mediaRef}
        className="relative ms-auto mediaRef pt-1 ">
        <i className="fa-solid mediaRef fa-star fa-bounce cursor-pointer text-lg text-primary-800  "> </i>

      <ul className={`mediaRef ${!token && "ms-auto"}`}>
      <div className=" media mediaRef flex justify-center items-center absolute bg-primary-800 text-white w-fit -right-14 mt-3 transition-[height] duration-300 px-3 h-0 overflow-hidden rounded-md gap-6">
      <li>
        <a href="http://instagram.com" target="_blank">
          <i className="fa-brands fa-instagram hover:text-lg"></i>          
        </a>
      </li>
      <li>
        <a href="http://facebook.com" target="_blank">
          <i className="fa-brands fa-facebook hover:text-lg"></i>
        </a>
      </li>
      <li>
        <a href="http://tiktok.com" target="_blank">
          <i className="fa-brands fa-tiktok hover:text-lg"></i>
        </a>
      </li>
      <li>
        <a href="http://twitter.com" target="_blank">
          <i className="fa-brands fa-twitter hover:text-lg"></i>
        </a>
      </li>
      <li>
        <a href="http://linkedin.com" target="_blank">
          <i className="fa-brands fa-linkedin hover:text-lg"></i>
        </a>
      </li>
      <li>
        <a href="http://youtube.com" target="_blank">
          <i className="fa-brands fa-youtube hover:text-lg"></i>
        </a>
      </li>
      </div>
      </ul>
      </div> : null}

      {!token && (<> <ul className="flex justify-center relative ms-auto items-center gap-5">
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

        {token && <> 
        <div className='text-sm pe-3 cursor-pointer' 
        onClick={logOut}>
          <i className="fa-solid fa-right-from-bracket text-lg pt-2 "></i>
        </div>
        </>}


      
    </div>
  </nav>
  </>
}

