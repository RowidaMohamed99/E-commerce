import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { CartContext } from './../../Context/Cart.context';
import ReactImageGallery from 'react-image-gallery';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from './../Card/Card';
import 'swiper/css';



export default function ProductDetails() {
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);


    const {addProductToCart} = useContext(CartContext);
    let {id} = useParams();

    async function getDetails() {
        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method: "GET",
            }
            let {data} = await axios.request(options)
            setProductDetails(data.data);
            console.log(data);
        } catch (error){
            console.log(error);
        }
    }

    async function getRelatedProducts(){
        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
                method: "GET",
            };
            let {data} = await axios.request(options);
            console.log("related");
            
            setRelatedProducts(data.data);
            
        }catch (error){
        console.log(error);
        }
    }



    
    useEffect(()=>{
        getDetails()
    },[id])
    useEffect(()=>{
        if(productDetails == null) return;
        getRelatedProducts()
    },[productDetails])


        

    

return <>
{productDetails ?( <>
    <section className="grid grid-cols-12 gap-12 py-5">

<div className="image col-span-3">
    <ReactImageGallery
    showFullscreenButton={false}
    showPlayButton={false}
    showNav={false}
    autoPlay={true}
    items={productDetails.images.map((image)=>{
        return {
            original: image,
            thumbnail: image,
        }
    })}/>
</div>

<div className="details col-span-9">
    <h2 className="text-gray-600 font-semibold text-2xl">{productDetails.title}</h2>
    <h3 className="text-primary-600 font-semibold">{productDetails.category.name}</h3>
    <p className="py-4 text-gray-500">{productDetails.description}

    </p>
    <div className="flex justify-between items-center mb-5">
        <span>{productDetails.price} L.E</span>
        <div className="space-x-1">
            <i className="fa-solid fa-star fa-bounce text-yellow-500"></i>
            <span>{productDetails.ratingsAverage}</span>
        </div>
    </div>
    <button
    onClick={()=>{addProductToCart({productId: id})}}
    className="bg-primary-600 font-semibold btn w-full">Add To Cart</button>

</div>
</section>

<section>
    <h2 className="pb-5 text-2xl font-semibold text-center text-gray-600">Related Products</h2>
{relatedProducts ? <Swiper autoplay={true} loop={true} slidesPerView={6}>
    {relatedProducts.map((product)=> <SwiperSlide key={product.id}>
        <div className='px-2'>
        <Card productInfo={product}/>
        </div>
    </SwiperSlide>)}
</Swiper> : <Loading/> }
</section>
</>) : <Loading/>}

</>
}
