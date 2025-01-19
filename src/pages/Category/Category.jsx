import { useEffect, useState } from "react";
import img1 from "../../images/banner-4.jpeg"
import  axios  from 'axios';
import Loading from "../../components/Loading/Loading";
import { Helmet } from 'react-helmet';




export default function Categories() {
    const [categories,setCategories] = useState(null)
    const [subCategories,setSubCategories] = useState(null)
    const [subName,setSubName] = useState(null)
    
    
    
    async function getCategory(){
        try{
            const options={
                url: `https://ecommerce.routemisr.com/api/v1/categories`,
                method: "GET",
            }
            let {data} = await axios.request(options)
            setCategories(data.data)
        }catch (error){
            console.log(error);
        }
    }

    async function getSubCategories(id, name) {
        const options={
            url: `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
            method:"GET",
        }
        let{data}= await axios.request(options);
        setSubName(name)
        setSubCategories(data.data)
    }

    useEffect (()=>{
        getCategory()
    }, [])



return <>
<Helmet>
        <title>Categories</title>
    </Helmet>
{categories ? <>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 bottom-1">

    {categories.map((category)=> <div key={category._id} 
    onClick={(()=>{
        getSubCategories(category._id, category.name)
    })}
    className="border-2 hover:shadow-md hover:shadow-green-700 transition-shadow duration-500 m-5">
    <img src={category.image} alt=""
    className="w-[100%] h-[200px] object-cover" />
    <h2 className="p-5 font-semibold text-green-700 text-2xl text-center">{category.name}</h2>
</div>
    )}
    </div>

    {subCategories? <>
        <h2 className="my-5 font-semibold text-center text-green-600 text-[30px] ">
            {subName} SubCategory</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 rounded-lg ">
        {subCategories.map((e)=> <div key={e._id} className="p-4 text-center border hover:shadow-md  hover:shadow-green-500 transition-all duration-500">
            <h2 className="font-semibold text-[20px]">{e.name}</h2>
        </div>)}
    </div>
    </> :null }
</> : <Loading/>}
</>
}
