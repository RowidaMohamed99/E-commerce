import { useContext, useEffect } from "react";
import { WishlistContext } from "../../Context/Wishlist.context";
import Loading from "../../components/Loading/Loading";
import WishlistItem from "../../components/WishlistItem/WishlistItem";
import { Helmet } from 'react-helmet';



export default function Wishlist() {
    let {getWishlist, wishlistInfo} = useContext(WishlistContext)
    

    useEffect(()=>{
        getWishlist()
    },[])


return <>
<Helmet>
        <title>Wish list</title>
    </Helmet>
{wishlistInfo == null ? (<Loading/>): (<section>
    {wishlistInfo.count == 0 ? <h2 className="font-bold text-xl text-center p-5">
        your Wishlist is empty</h2>: <>
    <div>
    <h2 className="font-bold text-xl text-center p-5">My wish list</h2>
    {wishlistInfo.data.map((product)=> <WishlistItem key={product._id} wishlistInfo={product}/>)}
    </div>
    </>}
    </section>)}

</>
}
