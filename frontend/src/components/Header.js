import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { clearCart } from '../redux/productSlice';

 const Header = () => {
    const [showUserOptions, setShowUserOptions] = useState(false);

    const handleShowUserOptions =() => {
        setShowUserOptions(prev => !prev)
    }

    const userData = useSelector((state) => state.user);
    //console.log(userData)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutRedux());
        dispatch(clearCart());
        alert("Logged out successfully");
        navigate("");
    }

    const cartItemNumber = useSelector((state) => state.product.cartItem)

    return(
        <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>

            {/* For desktop version */}
            <div className='flex items-center h-full justify-between'>
                <Link to={""}>
                    <div className='h-16'>
                        <img src={logo} className='h-full' />
                    </div>
                </Link>

                <div className='flex items-center gap-4 md:gap-7'>
                    <nav className='hidden md:flex gap-4 md:gap-6 text-base md:text-lg'>
                        <Link to={""}> Home </Link>
                        <Link to={"menuPage"}> Menu </Link>
                        <Link to={"about"}> About </Link>
                        <Link to={"contact"}> Contact </Link>
                    </nav>
                    <div className='text-2xl text-slate-600 relative'>
                        <Link to={"cart"}>
                            <BsCartFill />
                            <div className='absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'> {cartItemNumber.length} </div>
                        </Link>
                    </div>
                    <div onClick={handleShowUserOptions}>
                        <div className='text-2xl cursor-pointer text-slate-600'>
                            <FaUserAlt />
                        </div>
                        {showUserOptions && <div className='absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px]'>
                            {userData.email ? 
                                <p><span className='cursor-pointer' onClick={handleLogout}> Logout </span> <br/> <b>Hi {userData.firstName}!!</b> </p> : <Link to={"login"} className='whitespace-nowrap cursor-pointer'> Login </Link>}
                            {userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"newproduct"} className='whitespace-nowrap cursor-pointer'> New Product </Link>}

                             {/* For mobile version */}
                            <nav className='text-base md:text-lg flex flex-col md:hidden'>
                                <Link to={""} className='ex-2 py-1'> Home </Link>
                                <Link to={"menuPage"} className='pe-2 py-1'> Menu </Link>
                                <Link to={"about"} className='pe-2 py-1'> About </Link>
                                <Link to={"contact"} className='pe-2 py-1'> Contact </Link>
                            </nav>
                        </div>}
                    </div>
                </div>
            </div>

        </header>
    )
 }

 export default Header;