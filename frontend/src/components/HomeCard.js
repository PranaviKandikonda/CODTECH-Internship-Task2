import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";

function HomeCard({ name, image, category, price, id }) {
    const dispatch = useDispatch();

    const handleAddCartProduct = () => {
        dispatch(addCartItem({
            _id: id,
            name: name,
            price: price,
            category: category,
            image: image
        }
        ))
    }

    return (
        <div className="w-full min-w-[200px] max-w-[250px] bg-white hover:shadow-lg drop-shadow-lg pt-5 px-4 h-70 rounded cursor-pointer flex flex-col">
            <Link to={`menu/${id}`}>
                <div className="h-28 flex flex-col justify-center items-center">
                    <img src={image} className="h-full p-4 border-2 border-slate-500 rounded" />
                </div>
            </Link>

            <h3 className="font-semibold text-slate-600 capitalize text-lg mt-9"> {name} </h3>
            <p className="text-slate-500 font-medium"> {category} </p>
            <p className="font-bold"> ₹ {price}</p>
            <button className="bg-yellow-400 hover:bg-yellow-600 py-1 my-3 rounded w-full" onClick={handleAddCartProduct}> Add to Cart </button>
        </div>
    )
}

export default HomeCard;