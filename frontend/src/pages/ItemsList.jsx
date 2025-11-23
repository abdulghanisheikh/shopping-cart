import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast,ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar';
import Item from "../components/Item";
import { useNavigate } from 'react-router-dom';

const ItemsList=()=>{
    const [items,setItems]=useState([]);
    const navigate=useNavigate();
    const baseUrl=import.meta.env.VITE_BASE_URL;

    async function fetchItems(){
        try{
            const {data}=await axios.get(`${baseUrl}/items`,{
                withCredentials:true
            });
            const {success,message,items}=data;
            if(success){
                setItems(items);
            }
            else{
                toast.error(message);
            }
        }
        catch(err){
            toast.error(err.response?.data?.message);
        }
    }

    async function handleLogout(){
        try{
            const {data}=await axios.post(`${baseUrl}/users/logout`,{},{
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
                toast.error(success);
            }
        }
        catch(err){
            toast.error(err.response?.data?.message);
        }
    }

    async function fetchCartItems(){
        try{
            const {data}=await axios.get(`${baseUrl}/carts/`,{
                withCredentials:true
            });
            const {success,message,items}=data;
            if(success){
                if(!items||items.length===0){
                    toast.info("Cart is Empty");
                    return;
                }
                else{
                    const itemsList=items
                    .map(function(item){
                        return `${item.name} (${item._id})`;
                    })
                    .join("\n");
                    toast.info(`Cart Items:\n ${itemsList}`,{
                        style:{whiteSpace:"pre-line"}
                    });
                }
            }
            else{
                toast.error(message);
            }
        }
        catch(err){
            toast.error(err.response?.data?.message);
        }
    }

    async function fetchOrders(){
        try{
            const {data}=await axios.get(`${baseUrl}/orders/`,{
                withCredentials:true
            });
            const {success,message,orders}=data;
            if(success){
                if(!orders||orders.length===0){
                    toast.info("No Orders Found");
                    return;
                }
                else{
                    const ordersList=orders.map(function(order){
                        return `•order id: ${order._id}`;
                    }).join("\n");
                    toast.info(`Order History:\n${ordersList}`,{
                        style: { whiteSpace: "pre-line" }
                    });
                }
            }
            else{
                toast.error(message);
            }
        }
        catch(err){
            toast.error(err.response?.data?.message);
        }
    }

    async function placeOrder(){
        try{
            const {data}=await axios.post(`${baseUrl}/orders/`,{},{
                withCredentials:true
            });
            const {success,message}=data;
            if(success){
                toast.info(message);
            }
            else{
                toast.error(message);
            }
        }
        catch(err){
            toast.error(err.response?.data?.message);
        }
    }

    async function addToCart(index){
        try{
            const itemId=items[index]._id;
            const {data}=await axios.post(`${baseUrl}/carts/`,{itemId},{
                withCredentials:true
            });
            const {success,message}=data;
            if(success){
                toast.success(message);
            }
            else{
                toast.error(message);
            }
        }
        catch(err){
            toast.error(err.response?.data?.message||"Something went wrong");
        }
    }

    useEffect(()=>{
        fetchItems();
    },[]);
    
    return(
        <section className='itemsListPage'>
            <Navbar fetchCartItems={fetchCartItems} fetchOrders={fetchOrders} placeOrder={placeOrder} handleLogout={handleLogout}/>
            <div className="items">
                <h1>LISTED ITEMS</h1>
                {items.length===0?<p>No Item Listed</p>:
                items.map(function(item,idx){
                    return <Item 
                    key={idx} 
                    name={item.name} 
                    status={item.status} 
                    addToCart={()=>addToCart(idx)}>
                    </Item>
                })}
            </div>
            <ToastContainer position='top-left'/>
        </section>
    )
}

export default ItemsList;