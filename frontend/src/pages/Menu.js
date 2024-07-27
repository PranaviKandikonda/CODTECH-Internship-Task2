import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { addCartItem } from "../redux/productSlice";

function Menu(){
    //displays the data beside slash
    const {filterby} = useParams();
    const productData = useSelector(state => state.product.productList);
    //console.log(productData);

    const [productDisplay, setProductDisplay] = useState(null);
    console.log(productDisplay);

    useEffect(() => {
        const product = productData.find(el => el._id === filterby);
        setProductDisplay(product);
    }, [filterby, productData]);

    const dispatch = useDispatch();

    const handleAddCartProduct = () => {
        dispatch(addCartItem(productDisplay));
    }

    const navigate = useNavigate();

    const handleBuy = ()=>{
        dispatch(addCartItem(productDisplay))
        navigate("/cart")
    }

    if (!productDisplay) {
        return <div className="p-2 md:p-4">Product not found or loading...</div>;
    }

    return(
        <div className="p-2 md:p-4">
            <div className="w-full max-w-4xl m-auto md:flex bg-white">
                <div className="max-w-md overflow-hidden w-full p-5">
                    <img src={productDisplay.image} className="hover:scale-105 transition-all" />
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl"> {productDisplay.name} </h3>
                    <p className="text-slate-500 font-medium text-2xl"> {productDisplay.category} </p>
                    <p className="font-bold md:text-2xl"> ₹{productDisplay.price} </p>
                    <div className="flex gap-3">
                        <button className="bg-yellow-400 hover:bg-yellow-600 px-4 py-2 my-3 rounded" onClick={handleBuy}> Buy Now </button>
                        <button className="bg-yellow-400 hover:bg-yellow-600 px-4 py-2 my-3 rounded" onClick={handleAddCartProduct}> Add to Cart </button>
                    </div>
                    <div>
                        <p className="text-slate-600 font-medium"> Description: </p>
                        <p> {productDisplay.description} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;