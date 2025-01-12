import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import  axios  from 'axios';




export default function ForgetPassword() {
    let navigate = useNavigate ()

    const formik = useFormik({
        initialValues:{
            "email":"",
        },
        onSubmit: forgetPassword
    })



    async function forgetPassword(){
        try{
            const options = {
                url:"https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                method: "POST",
                data: {
                    email: formik.values.email
                }
            }
            let {data} = await axios.request(options)
            console.log(data);
            if(data.statusMsg == "success"){
            navigate("/verify")
            }
            
        }catch (error){
            console.log(error);
            
        }
    }
    

return <>
<section>
    <div className="space-y-5">
    <h2 className="font-semibold text-2xl">please enter your email</h2>
    <form onSubmit={formik.handleSubmit}>
    <input type="text" placeholder="Email" 
    value={formik.values.email}
    onChange={formik.handleChange}
    name="email"
    className="form-control"/>
    <button
    type="submit"
    className="btn mt-5 bg-white border-2 border-green-600 text-green-600 text-xl hover:text-white hover:bg-green-600 ">
        verify</button>
    </form>
    </div>
    
</section>

</>
}
