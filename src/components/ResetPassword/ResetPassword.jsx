import { useFormik } from 'formik';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const navigate= useNavigate()

    const formik = useFormik({
        initialValues:{
            "email":"",
            "newPassword":"",
        },
        onSubmit: resetPassword
    })

    async function resetPassword(){
        try{
            const options={
                url:"https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                method:"PUT",
                data:{
                    email:formik.values.email,
                    newPassword: formik.values.newPassword
                }
            }
            let {data} = await axios.request(options);
            if(data.token){
                navigate("/Login")
            }
        }catch (error){



        }
    }

return <>
<h1 className="text-xl text-state-700 font-semibold py-4 mt-5">Update your password</h1>
<form className="space-y-3 mb-10" onSubmit={formik.handleSubmit}>
    <div className="email">
    <input type="text" placeholder="Email Address" 
    className="form-control" value={formik.values.email}
    onChange={formik.handleChange} name="email"
    />
    </div>
    <div className="password">
    <input type="password" placeholder="Password" 
    className="form-control" value={formik.values.newPassword}
    onChange={formik.handleChange} name="newPassword"/>
    </div>
    <button type="submit" className="btn w-fit h-[50px] text-lg font-medium">Update password</button>

</form>
</>
}
