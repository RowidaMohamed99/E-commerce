import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import { Helmet } from 'react-helmet';



export default function Brands() {
    const [brands, setBrands] = useState(null)

async function getBrands() {
    try{
        const options={
            url: 'https://ecommerce.routemisr.com/api/v1/brands',
            method: "GET",
        }
        let {data} = await axios.request(options);
        console.log(data)
        setBrands(data.data)
        
    }catch (error){
        console.log(error);
        
    }
}

useEffect(()=>{
    getBrands()
},[])

return <>
<Helmet>
        <title>Brands</title>
    </Helmet>
<h2 className="text-[35px] text-center text-green-700 font-bold p-8">All Brands</h2>
{brands? <div className='grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
{brands.map ((brand)=>   <div key={brand._id} className='hover:shadow-md hover:shadow-green-500 border-2'>
    <img src={brand.image} alt="" />
    <h3 className='text-center font-semibold p-5'>{brand.name}</h3>
    </div>)}
</div> : <Loading/>}
</>
}
