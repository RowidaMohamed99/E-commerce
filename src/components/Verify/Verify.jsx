import  axios  from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function Verify() {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            "resetCode":"",
        },
    onSubmit: verifyCode
    })

    async function verifyCode(values){
        try{
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
            method:"POST",
            data:values
        }
        let {data} = await axios.request(options)
            console.log(data);
            if(data.status == "Success"){
                navigate("/resetpassword")
                }
        }catch (error){
            console.log(error);
            
        }
    }


return <>
<section>
    <div className="space-y-5">
    <h2 className="font-semibold text-2xl">reset your account password</h2>
    <form onSubmit={formik.handleSubmit}>
    <input type="text" placeholder="code" 
    className="form-control"
    value={formik.values.resetCode}
    onChange={formik.handleChange}
    name="resetCode"
    />
    <button 
    type="submit"
    className="btn mt-5 bg-white border-2 border-green-600 text-green-600 text-xl hover:text-white hover:bg-green-600 ">
        verify</button>
    </form>
    </div>
    
</section>

</>
}
