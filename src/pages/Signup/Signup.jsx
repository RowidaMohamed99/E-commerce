import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { object, ref, string } from "yup"
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate= useNavigate()

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/
  const validationSchema = object ({
    name: string().required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must not be more than 25 characters"),

    email: string().required("Email is required")
    .email("Email is invalid"),
    
    password: string().required("Password is required")
    .matches(passwordRegex, "Password should be Minimum eight characters, atleast one upper case English letter, one lower case English letter, one number and one special character"),
    
    rePassword: string().required("Repassword is required")
    .oneOf([ref("password")], "Password and rePassword should be the same"),
    
    phone: string().required("Phone Number is required")
    .matches(phoneRegex,"We accept Egyption number"),
  })
  const [accountExistError,setAccountExistError]= useState();

  async function sendDataToRegister(values) {
    const loadingToastId= toast.loading("Waiting for register")
  try{
    const options= {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      method: "POST",
      data: values,
    };
    let {data}= await axios.request(options);
    if (data.message == "success"){
      toast.success("User created successfully");
      setTimeout(()=>{
        navigate ("/Login")
      })
    }
  }catch (error) {
    toast.error(error.response.data.message);
    setAccountExistError(error.response.data.message);
  }finally{
    toast.dismiss(loadingToastId);
  }
  }

  const formik = useFormik({
    initialValues:{
        "name": "",
        "email":"",
        "password":"",
        "rePassword":"",
        "phone":""
    },
    validationSchema,
    onSubmit: sendDataToRegister
  })

  return <>
  <h1 className="text-xl text-state-700 font-semibold py-4 mt-5">Register Now</h1>
  <form className="space-y-3 mb-10" onSubmit={formik.handleSubmit}>
    <div className="name">
      <input type="text" placeholder="Type your name" 
      className="form-control" value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} name="name"
      />
      {formik.errors.name && formik.touched.name &&(
        <p className="text-red-500 mt-1 text-sm">*{formik.errors.name}</p>)}
    </div>
    <div className="email">
      <input type="text" placeholder="Email Address" 
      className="form-control" value={formik.values.email}
      onChange={formik.handleChange} name="email"
      onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email &&(
        <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>)}

      {accountExistError &&
      (<p className="text-red-500 mt-1 text-sm">*{accountExistError}</p>)}
    </div>
    <div className="password">
      <input type="password" placeholder="Password" 
      className="form-control" value={formik.values.password}
      onChange={formik.handleChange} name="password"
      onBlur={formik.handleBlur}/>
      {formik.errors.password && formik.touched.password &&(
        <p className="text-red-500 mt-1 text-sm">*{formik.errors.password}</p>)}
    </div>
    <div className="rePassword">
      <input type="password" placeholder="Confirm password" 
      className="form-control" value={formik.values.rePassword}
      onChange={formik.handleChange} name="rePassword"
      onBlur={formik.handleBlur}/>
      {formik.errors.rePassword && formik.touched.rePassword &&(
        <p className="text-red-500 mt-1 text-sm">*{formik.errors.rePassword}</p>)}
    </div>
    <div className="phone ">
      <input type="phone" placeholder="Phone number" 
      className="form-control" value={formik.values.phone}
      onChange={formik.handleChange} name="phone"
      onBlur={formik.handleBlur}/>
      {formik.errors.phone && formik.touched.phone &&(
        <p className="text-red-500 mt-1 text-sm">*{formik.errors.phone}</p>)}
    </div>
    <button type="submit" className="btn w-full">Sign UP</button>
  </form>
  </>
}
