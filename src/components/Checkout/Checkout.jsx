import { useFormik } from "formik"
import { useContext, useState } from "react";
import { CartContext } from "../../Context/Cart.context";
import { UserContext } from "../../Context/Context";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import { object , string } from "yup";

export default function Checkout() {
  const {cartInfo} = useContext(CartContext)
  const {token} = useContext(UserContext)
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState(null)

  // const phoneRegex = /^(02)?01[0125][0-9]{8}$/
  // const validationSchema = object({
  //   city: string().
  //         required ("City is required"),
  //   phone: string().
  //         required("Phone is required").
  //         matches(phoneRegex, "We only accept Egyption numbers"),
  // })
  
  const formik = useFormik({
    initialValues: {
      "shippingAddress":{
          "details": "",
          "phone": "",
          "city": "",
          },
        },
        // validationSchema,
        onSubmit: (values)=>{
    if (paymentMethod == "cash") createCashOrder(values);
    else handleOnlinePayment(values)
    console.log(formik);
    
    
  },
  })
console.log(formik);

  async function createCashOrder(values){
    try{
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token
        },
        data: values
      }
      let {data} = await axios.request(options)
      console.log(data);
      if(data.status == "success") {
        setTimeout(()=>{
          navigate("/allorders")
        }, 2000)
      }
      
    } catch (error){
      console.log(error);
      
    }
  }

  async function handleOnlinePayment(values){
    try{
      const options= {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token
        },
        data: values
      }
      let {data} = await axios.request(options)
      console.log(data);
      if(data.status == "success"){
        setTimeout(()=>{
          location.href = data.session.url
        }, 2000)
      }
    } catch (error){
      console.log(error);
      
    }
  }

  
  return <>
<section>
  <h1 className="py-5 text-xl text-gray-600 font-semibold">Shipping Address</h1>
  <form className="space-y-3 mb-5" onSubmit={formik.handleSubmit}>
    <div>
      <input 
      className="city w-full  form-control"
      type="text"
      placeholder="City"
      value={formik.values.shippingAddress.city}
      onChange={formik.handleChange}
      name="shippingAddress.city"
      // onBlur={formik.handleBlur}
      />
      {/* {formik.errors.city || formik.touched.city ?
      (<p className="text-red-500 mt-1 text-sm">*{formik.errors.city}</p>): null} */}
    </div>

    <div>
      <input 
      className="phone w-full  form-control"
      type="tel"
      placeholder="Phone"
      value={formik.values.shippingAddress.phone}
      onChange={formik.handleChange}
      name="shippingAddress.phone"
      // onBlur={formik.handleBlur}
      />
      {/* {formik.touched.phone || formik.errors.phone? 
      (<p className="text-red-500 mt-1 text-sm">
        *{formik.errors.phone}</p>): null } */}

    </div>

    <div>
      <textarea 
      className="datails w-full  form-control"
      placeholder="Details"
      value={formik.values.shippingAddress.details}
      onChange={formik.handleChange}
      name="shippingAddress.details"
      />
    </div>

    <button type="submit" 
    onClick={(()=>{
      setPaymentMethod ("cash")
    })}
    className="btn bg-blue-600 hover:bg-blue-500 text-white font-semibold mr-3">
      Cash Order
    </button>
    <button type="submit" 
    onClick={(()=>{
      setPaymentMethod("online")
    })}
    className="btn bg-lime-600 hover:bg-lime-500 text-white font-semibold">Online Payment</button>
  </form>
</section>
  </>
}

