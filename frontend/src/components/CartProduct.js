import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteCartItem, increaseQty, decreaseQty } from "../redux/productSlice";

function CartProduct({ id, name, image, category, price, qty, total }) {
    const dispatch = useDispatch();

    return (
        <div className="bg-slate-200 p-2 flex gap-5 rounded border border-slate-300">
            <div className="p-3 bg-white rounded overflow-hidden flex items-center">
                <img src={image} className="h-28 w-40 object-cover" />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between">
                    <h3 className="font-bold text-red-400 capitalize text-lg md:text-xl"> {name} </h3>
                    <MdDelete className="cursor-pointer text-slate-800 hover:text-red-400 mt-2 text-lg" onClick={() => dispatch(deleteCartItem(id))} />
                </div>
                <p className="text-slate-500 font-medium"> {category} </p>
                <p className="font-bold md:text-lg"> ₹{price} </p>

                <div className="flex justify-between">
                    <div className="flex gap-3 items-center">
                        <button className="bg-slate-400 hover:bg-slate-500 px-3 py-2 my-3 rounded text-sm" onClick={() => dispatch(increaseQty(id))}> <FaPlus /> </button>
                        <p className="font-semibold"> {qty} </p>
                        <button className="bg-slate-400 hover:bg-slate-500 px-3 py-2 my-3 rounded text-sm" onClick={() => dispatch(decreaseQty(id))}> <FaMinus /> </button>
                    </div>

                    <div className="flex items-center gap-2 font-bold">
                        <p className="text-slate-700 font-semibold"> Total: </p>
                        <p className="text-slate-800"> ₹{total} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct;