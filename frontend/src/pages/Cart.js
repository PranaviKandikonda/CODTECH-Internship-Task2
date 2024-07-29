import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import emptyCart from "../assets/emptyCart.gif";
import { useNavigate } from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";

function Cart() {
    const productCartItem = useSelector((state) => state.product.cartItem);
    console.log(productCartItem);

    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0);
    const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0);

    const handlePayment = async() => {
        if(user.email){
            const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
            const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/create-checkout-session`, {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                  },
                body: JSON.stringify(productCartItem)
            })
            if (res.ok) { // Check if the response was successful
                const {id} = await res.json();

                //check if stripe is loaded
                if(!stripePromise){
                    console.error("Stripe has not been loaded");
                }

                const { error } = await stripePromise.redirectToCheckout({ sessionId: id });
                if (error) {
                    console.error('Stripe Checkout error:', error);
                }
            } else {
                console.error('Error:', res.statusText);
                alert('Failed to initiate checkout. Please try again.');
            }
        }
        else {
            alert("You are not logged in")
            navigate("/login");
        }
    }

    const handleShopNow = () => {
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
                            productCartItem.map((el) => {
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