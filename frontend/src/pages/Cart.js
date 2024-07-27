import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import emptyCart from "../assets/emptyCart.gif";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/productSlice";

function Cart() {
    const productCartItem = useSelector((state) => state.product.cartItem);
    console.log(productCartItem);

    const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0);
    const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleShopNow = () => {
        navigate("/");
    }

    const handlePayment = async() => {
        alert("Thank you for shopping with us");
        dispatch(clearCart());
        navigate("/");
    }

    return (
        <>
            <div className="p-2 md:p-4">
                <h2 className="text-lg md:text-2xl font-bold text-slate-600"> Your Cart Items </h2>
                
                {productCartItem[0] ?
                <div className="my-4 flex flex-col md:flex-row gap-3">
                    { /*display the items added to cart*/}
                    <div className="w-full max-w-3xl">
                        {
                            productCartItem.map(el => {
                                return (
                                    <CartProduct
                                        key={el._id}
                                        id={el._id}
                                        name={el.name}
                                        image={el.image}
                                        category={el.category}
                                        price={el.price}
                                        qty={el.qty}
                                        total={el.total}
                                    />
                                )
                            })
                        }
                    </div>

                    { /*display the total cost and no.of items*/}
                    <div className="w-full max-w-md bg-slate-300 md:ml-auto md:mt-0 mt-4 rounded">
                        <h2 className="bg-blue-400 text-white p-2 text-lg font-bold mb-9"> Bill: </h2>

                        <div className="flex w-full py-2 text-lg border-b border-t border-slate-500">
                            <p> Total Quantity : </p>
                            <p className="ml-auto w-32 font-bold"> {totalQty} </p>
                        </div>

                        <div className="flex w-full py-2 text-lg border-b border-slate-500">
                            <p> Total Amount : </p>
                            <p className="ml-auto w-32 font-bold"> <span className="text-red-400">₹</span> {totalPrice} </p>
                        </div>

                        <button className="bg-red-400 hover:bg-red-600 w-full text-lg font-bold py-2 text-white mt-4" onClick={handlePayment}>Payment </button>
                    </div>
                </div>

                :

                <>
                    <div className="flex flex-col w-full justify-center items-center">
                        <img src={emptyCart} alt="empty cart" className="w-full max-w-sm rounded" />
                        <p className="text-slate-600 font-bold text-2xl my-3"> Your cart is Empty... </p>
                        <button className="bg-red-400 hover:bg-red-600 font-bold text-white text-3xl px-4 py-2 rounded" onClick={handleShopNow}> Shop Now!! </button>
                    </div>
                </>
                }
            </div>
        </>
    )
}

export default Cart;