import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

function FilterProduct({category, onClick, isActive}) {
    function formatString(input) {
        // Insert spaces before uppercase letters (except the first one)
        let spacedString = input.replace(/([a-z])([A-Z])/g, '$1 $2');
    
        // Replace "And" with ","
        let formattedString = spacedString.replace(/ And /g, ', ');
    
        return formattedString;
    }  

    return (
        <div className="flex justify-center items-center" onClick={onClick}>
            <div className = {`w-40 text-3xl p-5 rounded-full flex flex-col justify-center items-center cursor-pointer ${isActive ? "bg-red-600 text-white" : "bg-yellow-500"}`}>
                <CiForkAndKnife className="" />
                <p className="text-center text-base font-medium my-1 capitalize"> {formatString(category)} </p>
            </div>
        </div>
    )
}

export default FilterProduct;