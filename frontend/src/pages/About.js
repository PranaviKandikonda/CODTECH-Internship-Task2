import React from "react";
import aboutUs from "../assets/aboutUs.jpg";
import freshOrganic from "../assets/Fresh&Organic.png";
import Delivery from "../assets/Delivery.png";
import Payment from "../assets/Payment.webp";

function About() {
    return (
        <div className="p-2 md:p-4">
            <div className="md:flex gap-5 bg-slate-200 drop-shadow-lg p-3">
                <img className="w-2xl rounded-lg" src={aboutUs} alt="About Us" />

                <div className="flex flex-col justify-center items-center m-3">
                    <h1 className="font-bold text-2xl md:text-5xl text-slate-800 mb-3"> Welcome to <span className="text-red-400"> E-Commerce </span>!!</h1>
                    <p className="text-slate-700 text-medium text-lg md:text-xl">At <span className="text-red-400">E-Commerce</span>, we are dedicated to providing our customers with the 
                    finest selection of high-quality products, paired with exceptional customer service.Our journey began with a simple idea: to make shopping a seamless, enjoyable, and 
                    rewarding experience for everyone.</p>

                    <h1 className="font-bold text-xl md:text-3xl text-slate-800 mt-5 mb-3"> Our Mission: </h1>
                    <p className="text-slate-700 text-medium text-lg md:text-xl"> Our mission is to provide you with high-quality produce and groceries that enhance your everyday life. 
                        Whether you’re shopping for fresh vegetables and fruits, pantry staples, snacks, or beverages, we are dedicated to offering a diverse selection of top-notch items 
                        that meet your needs and exceed your expectations.</p>
                </div>
            </div>

            <div className="my-9 py-5 flex flex-col justify-center items-center">
                <h1 className="font-bold text-2xl md:text-5xl text-red-600 mb-3 py-3"> Why Choose Us? </h1>
                
                <div className="md:flex items-center w-3/4 md:mr-auto my-5 p-3 bg-yellow-200 cursor-pointer shadow-md hover:drop-shadow-lg rounded">
                    <img className="max-w-[300px] md:mx-5" src={freshOrganic} alt="fresh and organic" />

                    <div className="md:flex flex-col">
                        <h1 className="font-bold text-slate-800 text-xl md:text-3xl mb-3"> Fresh and Organic </h1>
                        <p className="text-lg md:text-xl"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra sit amet aliquam id. Posuere lorem ipsum dolor sit amet consectetur adipiscing.
                            Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Accumsan in nisl nisi scelerisque eu ultrices vitae. Justo donec enim diam vulputate ut pharetra sit amet. Ac tortor vitae purus faucibus ornare.
                            Dictum fusce ut placerat orci nulla pellentesque. </p>
                    </div>
                </div>

                <div className="md:flex items-center w-3/4 md:ml-auto my-5 p-3 bg-red-200 cursor-pointer shadow-md hover:drop-shadow-lg rounded">
                    <img className="max-w-[300px] md:mx-5 bg-white" src={Delivery} alt="Delivery" />

                    <div className="md:flex flex-col">
                        <h1 className="font-bold text-slate-800 text-xl md:text-3xl mb-3"> Fast Delivery </h1>
                        <p className="text-lg md:text-xl"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra sit amet aliquam id. Posuere lorem ipsum dolor sit amet consectetur adipiscing.
                            Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Accumsan in nisl nisi scelerisque eu ultrices vitae. Justo donec enim diam vulputate ut pharetra sit amet. Ac tortor vitae purus faucibus ornare.
                            Dictum fusce ut placerat orci nulla pellentesque. </p>
                    </div>
                </div>

                <div className="md:flex items-center w-3/4 md:mr-auto my-5 p-3 bg-yellow-200 cursor-pointer shadow-md hover:drop-shadow-lg rounded">
                    <img className="max-w-[300px] md:mx-5 bg-white" src={Payment} alt="Easy Payments" />

                    <div className="md:flex flex-col">
                        <h1 className="font-bold text-slate-800 text-xl md:text-3xl mb-3"> Easy Payments </h1>
                        <p className="text-lg md:text-xl"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra sit amet aliquam id. Posuere lorem ipsum dolor sit amet consectetur adipiscing.
                            Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Accumsan in nisl nisi scelerisque eu ultrices vitae. Justo donec enim diam vulputate ut pharetra sit amet. Ac tortor vitae purus faucibus ornare.
                            Dictum fusce ut placerat orci nulla pellentesque. </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
