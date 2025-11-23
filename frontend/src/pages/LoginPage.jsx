import React, { useState } from 'react';
import {useNavigate,Link} from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";
import axios from "axios";

const LoginPage=()=>{
    const navigate=useNavigate();
    const [loginData,setLoginData]=useState({
        username:"",
        password:""
    });

    function handleChange(name,value){
        setLoginData(function(prev){
            return{...prev,[name]:value}
        });
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const baseUrl=import.meta.env.VITE_BASE_URL;
            const {data}=await axios.post(`${baseUrl}/users/login`,loginData,{
                withCredentials:true
            });
            const {success,message,user}=data;
            if(success){
                localStorage.setItem("loggedInUser",JSON.stringify(user));
                toast.success(message);
                setTimeout(function(){
                    navigate("/items-list");
                },2000);
            }
            else{
                toast.error(message);
            }
        }
        catch(err){
            toast.error(err.response?.data?.message||"Something went wrong");
        }
    }

    return(
        <section className='loginPage'>
            <header>
                <img src="trolley.png" alt="" />
                <h1>Shopping Cart</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <div className='top'>
                    <h1>Welcome Back!</h1>
                    <h2>Enter your username and password</h2>
                </div>
                <div className='bottom'>
                    <label>
                        Username 
                        <input onChange={function(e){
                            handleChange("username",e.target.value);
                        }} type="text" value={loginData.username} name='username' required/>
                    </label>
                    <label>
                        Password 
                        <input onChange={function(e){
                            handleChange("password",e.target.value);
                        }} type="password" value={loginData.password} name='password' required/>
                    </label>
                </div>
                <button type='submit' className='loginButton'>Login</button>
                <p>Don't have an account? <span><Link to="/signup">Create Account</Link></span></p>
            </form>
            <ToastContainer position='top-left'/>
        </section>
    )
}

export default LoginPage;