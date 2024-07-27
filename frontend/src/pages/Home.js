import React, { useEffect, useRef, useState } from "react";
import HomeCard from "../components/HomeCard";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import FilterProduct from "../components/FliterProduct";
import { Link } from "react-router-dom";
import freshOrganic from "../assets/Fresh&Organic.png";
import Delivery from "../assets/Delivery.png";
import Payment from "../assets/Payment.webp";

function Home() {
    const productData = useSelector((state) => state.product.productList);
    //console.log(productData);
    const homeProductCartListVegetables = productData.filter(el => el.category == "vegetables");
    //console.log(homeProductCartListVegetables);

    const slideProductRef1 = useRef(null);
    const slideProductRef2 = useRef(null);

    const nextProduct = (ref) => {
        ref.current.scrollLeft += 200
    }

    const prevProduct = (ref) => {
        ref.current.scrollLeft -= 200
    }

    const categoryList = [...new Set(productData.map(el => el.category))];
    //console.log(categoryList);

    //displaying filtered data
    const [filterBy, setFilterBy] = useState("");
    const [dataFilter, setDataFilter] = useState(productData);

    const handleFilterProduct = (category) => {
        setFilterBy(category);
        const filter = productData.filter(el => el.category === category)
        setDataFilter(() => {
            return[
                ...filter
            ]
        })
    }

    return (
        <>
            <div className="p-2 md:p-4">
                <div className="home" id="home">
                    <div className="content w-1/3 m-5">
                        <h3 className="text-5xl font-bold"> Fresh and <span className="text-red-400">Organic</span> products for you </h3>
                        <p className="text-slate-900 text-xl mt-9 mb-5"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <button className="text-xl font-bold text-white rounded px-3 py-2 bg-red-400 hover:bg-red-700"> Order now </button>
                    </div>
                </div>

                <div id="features">
                    <h1 className="text-center p-5 m-5 text-5xl font-bold"> Our <span className="text-red-400"> Features </span> </h1>

                    <div className="box-container flex flex-wrap justify-center align-center">
                        <div className="box w-full md:w-1/4 m-4 p-3 rounded bg-white shadow-md cursor-pointer hover:border-2 border-blue-400">
                            <img src={freshOrganic} alt="feature-1" className="border-2 border-slate-600 rounded p-2" />
                            <h3 className="text-2xl font-bold text-red-400 text-center my-2"> Fresh and Organic </h3>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut, sed do eiusmod tempor incididunt ut....<Link to={"about"} className="text-blue-500 underline"> Read More </Link></p>
                        </div>

                        <div className="box w-full md:w-1/4 m-4 p-3 bg-white shadow-md rounded cursor-pointer hover:border-2 border-blue-400">
                            <img src={Delivery} alt="feature-2" className="border-2 border-slate-600 rounded p-2" />
                            <h3 className="text-2xl font-bold text-red-400 text-center my-3"> Fast Delivery </h3>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut, sed do eiusmod tempor incididunt ut....<Link to={"about"} className="text-blue-500 underline"> Read More </Link></p>
                        </div>

                        <div className="box w-full md:w-1/4 m-4 p-3 bg-white shadow-md rounded cursor-pointer hover:border-2 border-blue-400">
                            <img src={Payment} alt="feature-1" className="border-2 border-slate-600 rounded p-2" />
                            <h3 className="text-2xl font-bold text-red-400 text-center my-3"> Easy Payments </h3>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut, sed do eiusmod tempor incididunt ut....<Link to={"about"} className="text-blue-500 underline"> Read More </Link></p>
                        </div>
                    </div>
                </div>

                <div className="">
                    <h1 id="products" className="text-center p-5 m-5 text-5xl font-bold"> Our <span className="text-red-400">Products</span> </h1>

                    <div className="my-5">
                        <div className="flex w-full items-center">
                            <h2 className="text-2xl font-bold text-slate-800 my-5"> Fresh Vegetables </h2>
                            <div className="ml-auto flex gap-4">
                                <button onClick={() => prevProduct(slideProductRef1)} className="bg-slate-300 hover:bg-slate-400 text-xl p-1 rounded"> <GrPrevious /> </button>
                                <button onClick={() => nextProduct(slideProductRef1)} className="bg-slate-300 hover:bg-slate-400 text-xl p-1 rounded"> <GrNext /> </button>
                            </div>
                        </div>

                        <div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transiton-all" ref={slideProductRef1}>
                            {
                                homeProductCartListVegetables.map(el => {
                                    return(
                                        <HomeCard
                                            key = {el._id + "vegetables"}
                                            id = {el._id}
                                            name = {el.name}
                                            category = {el.category}
                                            price = {el.price}
                                            image = {el.image}
                                         />
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="my-5">
                        <div className="flex w-full items-center">
                            <h2 className="text-2xl font-bold text-slate-800 my-5"> Search your products </h2>
                            <div className="ml-auto flex gap-4">
                                <button onClick={() => prevProduct(slideProductRef2)} className="bg-slate-300 hover:bg-slate-400 text-xl p-1 rounded"> <GrPrevious /> </button>
                                <button onClick={() => nextProduct(slideProductRef2)} className="bg-slate-300 hover:bg-slate-400 text-xl p-1 rounded"> <GrNext /> </button>
                            </div>
                        </div>

                        <div className="flex gap-4 overflow-scroll scrollbar-none scroll-smooth transition-all" ref={slideProductRef2}>
                            {
                                categoryList[0] && categoryList.map(el => {
                                    return(
                                        <FilterProduct category={el} isActive={el === filterBy} key={el} onClick={() => handleFilterProduct(el)} />
                                    )
                                })
                            }
                        </div>

                        <div className="flex flex-wrap justify-center gap-5 mt-5 mb-10">
                            {
                                dataFilter.map(el => {
                                    return(
                                        <HomeCard
                                            key = {el._id}
                                            id = {el._id}
                                            image={el.image}
                                            name={el.name}
                                            category={el.category}
                                            price={el.price}
                                         />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div id="categories" className="categories">
                    <h1 className="text-center p-5 m-5 text-5xl font-bold"> Our <span className="text-red-400">Categories</span> </h1>
                    <div className="flex flex-wrap justify-center align-center">
                        <div className="w-40 h-20 shadow-md rounded bg-white text-center cursor-pointer hover:border-2 border-blue-400 m-2">
                            <h1 className="my-5 text-2xl font-bold"> Fruits </h1>
                        </div>

                        <div className="w-40 h-20 shadow-md rounded bg-white text-center cursor-pointer hover:border-2 border-blue-400 m-2">
                            <h1 className="my-5 text-2xl text-red-400 font-bold"> Vegetables </h1>
                        </div>

                        <div className="w-40 h-20 shadow-md rounded bg-white text-center cursor-pointer hover:border-2 border-blue-400 m-2">
                            <h1 className="my-5 text-xl font-bold"> Dairy and Eggs </h1>
                        </div>

                        <div className="w-40 h-20 shadow-md rounded bg-white text-center cursor-pointer hover:border-2 border-blue-400 m-2">
                            <h1 className="my-5 text-2xl text-red-400 font-bold"> Grocery </h1>
                        </div>

                        <div className="w-40 h-20 shadow-md rounded bg-white text-center cursor-pointer hover:border-2 border-blue-400 m-2">
                            <h1 className="my-3 text-xl font-bold"> Bakery and Bread </h1>
                        </div>

                        <div className="w-40 h-20 shadow-md rounded bg-white text-center cursor-pointer hover:border-2 border-blue-400 m-2">
                            <h1 className="my-3 text-xl text-red-400 font-bold"> Snacks and Confectionary </h1>
                        </div>

                        <div className="w-40 h-20 shadow-md rounded bg-white text-center cursor-pointer hover:border-2 border-blue-400 m-2">
                            <h1 className="my-5 text-2xl font-bold"> Beverages </h1>
                        </div>

                        <div className="w-40 h-20 shadow-md rounded bg-white text-center cursor-pointer hover:border-2 border-blue-400 m-2">
                            <h1 className="my-3 text-lg text-red-400 font-bold"> Baking & Cooking Ingredients </h1>
                        </div>

                        <div className="w-40 h-20 shadow-md rounded bg-white text-center cursor-pointer hover:border-2 border-blue-400 m-2">
                            <h1 className="my-3 text-xl font-bold"> Health and Beauty </h1>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 id="reviews" className="text-center p-5 m-5 text-5xl font-bold"> Customer's <span className="text-red-400">Reviews</span> </h1>
                    <div className="flex flex-wrap justify-center align-center">
                        <div className="box w-full md:w-1/5 m-4 p-4 rounded bg-white shadow-md cursor-pointer hover:border-2 border-blue-400">
                            <p className="text-center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            <h3 className="text-2xl font-bold text-red-400 text-center mt-4"> Christopher </h3>
                            <div className="flex flex-wrap justify-center align-center mt-2">
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStarHalfAlt className="text-yellow-500 text-xl mx-1" />
                            </div>
                        </div>

                        <div className="box w-full md:w-1/5 m-4 p-4 bg-white shadow-md rounded cursor-pointer hover:border-2 border-blue-400">
                            <p className="text-center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            <h3 className="text-2xl font-bold text-red-400 text-center mt-4"> Stephan </h3>
                            <div className="flex flex-wrap justify-center align-center mt-2">
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                            </div>
                        </div>

                        <div className="box w-full md:w-1/5 m-4 p-4 bg-white shadow-md rounded cursor-pointer hover:border-2 border-blue-400">
                            <p className="text-center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            <h3 className="text-2xl font-bold text-red-400 text-center mt-4"> Sophie </h3>
                            <div className="flex flex-wrap justify-center align-center mt-2">
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaRegStar className="text-yellow-500 text-xl mx-1" />
                            </div>
                        </div>

                        <div className="box w-full md:w-1/5 m-4 p-4 bg-white shadow-md rounded cursor-pointer hover:border-2 border-blue-400">
                            <p className="text-center"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            <h3 className="text-2xl font-bold text-red-400 text-center mt-4"> Andrew </h3>
                            <div className="flex flex-wrap justify-center align-center mt-2">
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStar className="text-yellow-500 text-xl mx-1" />
                                <FaStarHalfAlt className="text-yellow-500 text-xl mx-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer bg-red-200 mt-3 p-3 flex flex-wrap justify-center align-center">
                <div className=" w-full md:w-1/4 mx-4">
                    <h3 className="text-2xl font-bold my-3"> E-commerce </h3>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut, sed do eiusmod. </p>
                    <div className="flex flex-wrap mt-4">
                        <FaFacebook className="text-2xl me-2" />
                        <FaInstagram className="text-2xl mx-2" />
                        <FaLinkedin className="text-2xl mx-2" />
                    </div>
                </div>

                <div className=" w-full md:w-1/4 mx-4">
                    <h3 className="text-2xl font-bold my-3"> Contact info </h3>
                    <ul>
                        <li className="my-1"> +123-456-7890 </li>
                        <li className="my-1"> +123-456-7890 </li>
                        <li className="my-1"> ecommerce@gmail.com </li>
                        <li className="my-1"> Hyderabad, India--500041 </li>
                    </ul>
                </div>

                <div className=" w-full md:w-1/4 mx-4">
                    <h3 className="text-2xl font-bold my-3"> Quick links </h3>
                    <ul>
                        <li className="my-1"> <a href="#home" className="hover:text-blue-600"> Home </a> </li>
                        <li className="my-1"> <a href="#features" className="hover:text-blue-600"> Features </a> </li>
                        <li className="my-1"> <a href="#products" className="hover:text-blue-600"> Products </a> </li>
                        <li className="my-1"> <a href="#categories" className="hover:text-blue-600"> Categories </a> </li>
                        <li className="my-1"> <a href="#reviews" className="hover:text-blue-600"> Reviews </a> </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Home;