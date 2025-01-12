import React from 'react'
import amazon from '../../images/amazon-pay.png'
import american from '../../images/American-Express-Color.png'
import master from '../../images/mastercard.webp'
import paypal from '../../images/paypal.png'
import appStore from '../../images/get-apple-store.png'
import goolePlay from '../../images/get-google-play.png'

export default function Footer() {
  return <>
  <footer className="bg-slate-100 py-8 mt-10 bottom-0 left-0 right-0 sm:mx-4 md:mx-4">
    <div className="container space-y-4">
    <header className='sm:px-4 md:px-4 px-4'>
      <h3 className="text-lg ">Get the FreshCart app</h3>
      <p className="text-slate-400">We will send you a link, open it on your phone to download the app.</p>
    </header>
    <div className="flex flex-col sm:flex-row gap-3 sm:px-4 md:px-4 px-4">
      <input type="Email" placeholder='Email...'
      className="px-3 grow py-2 rounded-lg border-2 border-state-400 focus:outline-none focus:border-primary-500  focus:caret-primary-300 text-sm font-semibold" />
      <button className="bg-primary-900 px-6 py-2 hover:bg-primary-600 transition-colors duration-300 focus:outline-none rounded-lg text-white text-sm font-semibold">Share App Link</button>
    </div>
    <div className="flex flex-col px-4 sm:flex-row items-center justify-between py-4 border-y-2 border-slate-300 border-opacity-50">
      <div className="flex flex-wrap items-center gap-5 ">
      <h3 className='sm:text-base text-sm mb-3'>Payment Partener</h3>
      <img className="w-24" src={amazon} alt="amazon logo" />
      <img className="w-24" src={american} alt="american express logo" />
      <img className="w-20" src={master} alt="master card logo" />
      <img className="w-24" src={paypal} alt="paypal logo" />
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:gap-8 justify-center sm:justify-end">
        <h3 className='sm:text-base text-sm mb-3 sm:mb-0'>Get deliveries With FreshCart</h3>
        <img className="w-24" src={appStore} alt="appStore logo"/>
        <img className="w-[110px]" src={goolePlay} alt="goolePlay logo"/>
      </div>
    </div>
    </div>
  </footer>
  </>
}
