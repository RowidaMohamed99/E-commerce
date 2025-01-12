import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import { object, ref, string } from "yup"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserContext } from './../../Context/Context';

export default function Login() {
let {setToken} = useContext (UserContext)


  const [incorrectEmailOrPassword, setIncorrectEmailOrPassword]= useState();
  const navigate = useNavigate()
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  const validationSchema = object ({
    email: string().required("Email is required")
    .email("Email is invalid"),
    
    password: string().required("Password is required")
    .matches(passwordRegex, "Password should be Minimum eight characters, atleast one upper case English letter, one lower case English letter, one number and one special character"),
  })

  async function sendDataToLogin(values) {
    const loadingToastId= toast.loading("Waiting...")
  try{
    const options= {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
      method: "POST",
      data: values,
    };
    let {data}= await axios.request(options);
    if (data.message == "success"){
      localStorage.setItem ("token", data.token);
      setToken (data.token);
      toast.success("User Logged in successfully");
      setTimeout(()=>{
        navigate("/");
      },2000);
    }
  }catch(error) {
    setIncorrectEmailOrPassword(error.response.data.message);
    console.log(error)
  }finally{
    toast.dismiss(loadingToastId);
  }
  }
  const formik = useFormik({
    initialValues:{
        "email":"",
        "password":"",
    },
    validationSchema,
    onSubmit: sendDataToLogin
  })


  



  return <>
  <h1 className="text-xl text-state-700 font-semibold py-4 mt-5">Login</h1>
  <form className="space-y-3 mb-10" onSubmit={formik.handleSubmit}>
    <div className="email">
      <input type="text" placeholder="Email Address" 
      className="form-control" value={formik.values.email}
      onChange={formik.handleChange} name="email"
      onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email &&(
        <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>)}
    </div>
    <div className="password">
      <input type="password" placeholder="Password" 
      className="form-control" value={formik.values.password}
      onChange={formik.handleChange} name="password"
      onBlur={formik.handleBlur}/>
      {formik.errors.password && formik.touched.password &&(
        <p className="text-red-500 mt-1 text-sm">*{formik.errors.password}</p>)}

    {incorrectEmailOrPassword && 
    <p className="text-red-500 mt-1 text-sm">*{incorrectEmailOrPassword}</p>}
    </div>
    
    <div className="flex justify-between pt-5">
      <Link 
      to="/forgetpassword"
      className="font-semibold hover:text-green-700 cursor-pointer">
        forget your password ?</Link>
      <button type="submit" className="btn w-fit h-[50px] text-lg font-medium">Login now</button>
    </div>
  </form>
  </>
}
