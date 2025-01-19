import Loading from '../Loading/Loading';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export default function CategorySlider() {
const [categories, setCategories] = useState();

async function getCategory(){
    const option = {
        url:"https://ecommerce.routemisr.com/api/v1/categories",
        method: "GET",   
    }
    let {data}= await axios.request(option);
    setCategories (data.data)
}
useEffect (()=>{
    getCategory()
}, [])


return <>
<section className="my-5">
{!categories ? (<Loading/>): (<Swiper slidesPerView={6} loop={true}>
    {categories.map((category)=> <SwiperSlide key={category._id}>
        <div className="h-64">
        <img className="w-full h-full object-cover" src={category.image} alt="" />
        </div>
        <h5 className='my-3 text-sm font-semibold'>{category.name}</h5>
    </SwiperSlide>)}
</Swiper>)}
</section>
</>
}