import { data } from "autoprefixer";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import axios from "axios";
import Card from "../../components/Card/Card"


export default function Home() {
  const [products, setProducts]= useState();

  async function getProducts(){
    const option= {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    }
    let {data} = await axios.request(option);
    setProducts (data.data)
  }
  useEffect (()=>{
    getProducts()
  }, [])
  return <>
  <HomeSlider/>
  <CategorySlider/>
  {!products? <Loading/> : <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
  {products.map((product)=> <Card productInfo={product} key={product.id}/>)}
  </div>}
  
  </>
}
