import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";
import axios from "axios";

const SignupPage=()=>{
    const navigate=useNavigate();
    const [userData,setUserData]=useState({
        username:"",
        password:""
    });

    function handleChange(name,value){
        setUserData(function(prev){
            return{...prev,[name]:value}
        });
    }

    async function handleSignup(e){
        e.preventDefault();
        try{
            const baseUrl=import.meta.env.VITE_BASE_URL;
            const {data}=await axios.post(`${baseUrl}/users`,userData,{
                withCredentials:true
            });
            const {success,message}=data;
            if(success){
                toast.success(message);
                setTimeout(function(){
                    navigate("/");
                },2000);
            }
            else{
                toast.error(message);
            }
            setUserData({
                username:"",
                password:""
            });
        }
        catch(err){
            toast.error(err.response?.data?.message||"Something went wrong");
        }
    }

    return(
        <section className='signupPage'>
            <form onSubmit={handleSignup}>
                <div className='top'>
                    <h1>Sign up to Shopping Cart</h1>
                    <h2>Set username and password</h2>
                </div>
                <div className='bottom'>
                    <label>
                        Username 
                        <input type="text" onChange={function(e){
                            handleChange("username",e.target.value);
                        }} value={userData.username} name='username' required/>
                    </label>
                    <label>
                        Password 
                        <input type="password" onChange={function(e){
                            handleChange("password",e.target.value);
                        }} value={userData.password} name='password' required/>
                    </label>
                </div>
                <button type='submit' className='signupButton'>Sign Up</button>
                <p>Already have an account? <span><Link to="/">Login</Link></span></p>
            </form>
            <ToastContainer position='top-left'/>
        </section>
    )
}
export default SignupPage;