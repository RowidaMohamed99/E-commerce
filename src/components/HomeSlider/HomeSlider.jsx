import img1 from "../../images/slider-image-3.jpeg"
import img2 from "../../images/slider-image-2.jpeg"
import img3 from "../../images/slider-image-1.jpeg"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export default function HomeSlider() {
return <>
<section className="grid grid-cols-12 m-8">
    <div className="col-span-8">
        <Swiper loop={true}>
            <SwiperSlide>
            <img className="w-full h-full object-cover" src={img1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
            <img className="w-full h-full object-cover" src={img1} alt="" />
            </SwiperSlide>
        </Swiper>
        
    </div>
    <div className="col-span-4">
        <img src={img2} alt="" className="w-full" />
        <img src={img3} alt="" className="w-full" />
    </div>
</section>
</>
}
