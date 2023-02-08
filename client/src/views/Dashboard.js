import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const user= JSON.parse(localStorage.getItem('userInfo'))
    console.log(user?.user)
    const [orders, setOrders] = useState([])

    const [subtotal, setSubtotal] = useState(0)
    const [phoneNumber, setPhoneNumber] = useState(user?.user?.phone_number)
    const [description, setDescription] = useState("")


    const handleAddOrder = (e)=>{
        console.log(user?.token)
        e.preventDefault()
        fetch("https://orderify.onrender.com/order",{
            method:"POST",
            headers:{
                "content-type":"application/json",
                "Authorization":`Bearer ${user?.token}`
            },
            body:JSON.stringify({user_id:user?.user?._id,phone_number:phoneNumber,description:description,sub_total:subtotal})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
        setOrders([...orders,{user_id:user?.user?._id,phone_number:phoneNumber,description:description,sub_total:subtotal}])
    }
    

    useEffect(()=>{
        if(!user)navigate('/auth')
        fetch("https://orderify.onrender.com/orders",{
            method:"GET",
            headers:{
                "content-type":"application/json",
                "Authorization":`Bearer ${user?.token}`
            },
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setOrders(data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const handleLogout = ()=>{
        localStorage.removeItem("userInfo")
        navigate('/auth')
    }


    return (
        <div className="w-full flex justify-center">
            <div className="w-8/12 m-2">
                <h1 className="text-5xl mb-4">Orders</h1>
                {orders.map(item=>{
                    return (
                        <div className="w-full flex p-3 border-2 m-2">
                            <span className="text-lg m-2">Description : {item.description}</span>
                            <span className="text-lg m-2">phonr number : {item.phone_number}</span>
                            <span className="text-lg m-2">Total : {item.sub_total}</span>
                        </div>
                    )
                })}
            </div>
            <div className="w-1/4 m-2">
                <h1 className="text-5xl mb-4">Add Orders</h1>
                <div className="flex flex-wrap  w-full  relative h-15 bg-gray-50 border border-gray-300 items-center rounded mb-4">
                    <input
                    type="text"
                    className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-gray-50 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap  w-full  relative h-15 bg-gray-50 border border-gray-300 items-center rounded mb-4">
                    <input
                    type="text"
                    className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-gray-50 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                    placeholder={user?.user?.phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap  w-full  relative h-15 bg-gray-50 border border-gray-300 items-center rounded mb-4">
                    <input
                    type="text"
                    className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-gray-50 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
                    placeholder="sub total"
                    onChange={(e) => setSubtotal(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleAddOrder}
                    className="w-full m-2 text-white text-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add Order
                </button>
                <button
                    onClick={handleLogout}
                    className="w-full m-2 text-white text-lg bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Dashboard