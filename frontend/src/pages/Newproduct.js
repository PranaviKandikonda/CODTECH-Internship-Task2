import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";

function NewProduct(){
    const [data, setData] = useState({
        name: "",
        category: "",
        image: "",
        price: "",
        description: ""
    });

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => {
            return{
                ...prev,
                [name] : value
            }
        })
    }

    const uploadImage = async(e)=>{
        const data = await ImagetoBase64(e.target.files[0]);
        //console.log(data);
        setData((prev) => {
            return{
                ...prev,
                image : data
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(data);

        const {name, category, image, price} = data;
        if(name && category && image && price){
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`, {
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(data)
            })
            const fetchRes = await fetchData.json();
            console.log(fetchRes);
            alert(fetchRes.message);

            setData(() => {
                return {
                    name: "",
                    category: "",
                    image: "",
                    price: "",
                    description: ""
                }
            })
        }
        else{
            alert("Please fill the required fields");
        }
    }

    return(
        <div className="p-4" id="bgNewProduct">
            <form className="m-auto w-full max-w-md shadow-lg flex flex-col bg-white p-3" onSubmit={handleSubmit}>
                <label htmlFor="name"> Name of the Product: </label>
                <input type="text" name="name" className="bg-slate-300 p-1 my-2" value={data.name} onChange={handleOnChange} />

                <label className="mt-2" htmlFor="category"> Category </label>
                <select className="bg-slate-300 p-1 my-2" id="category" name="category" value={data.category} onChange={handleOnChange}>
                    <option value={"other"}> Select a category </option>
                    <option value={"fruits"}> Fruits </option>
                    <option value={"vegetables"}> Vegetables </option>
                    <option value={"dairyAndEggs"}> Dairy and Eggs</option>
                    <option value={"grocery"}> Grocery </option>
                    <option value={"bakeryAndBread"}> Bakery and Bread </option>
                    <option value={"snacks"}> Snacks and Confectionary</option>
                    <option value={"beverages"}> Beverages </option>
                    <option value={"ingredients"}> Baking and Cooking Ingredients </option>
                    <option value={"healthAndBeauty"}> Health and Beauty </option>
                </select>

                <label htmlFor="image"> Image 
                    <div className="h-40 w-full bg-slate-300 my-3 rounded flex items-center justify-center cursor-pointer">
                        {
                            data.image ? <img src={data.image} className="h-full" /> : <span className="text-5xl"> <BsCloudUpload /> </span>
                        }
                        <input type="file" id="image" accept="image/*" onChange={uploadImage} className="hidden" />
                    </div>
                </label>

                <label className="mt-2" htmlFor="price"> Price </label>
                <input type="text" name="price" value={data.price} className="bg-slate-300 p-1 my-2" onChange={handleOnChange}/>

                <label htmlFor="description"> Description </label>
                <textarea rows={3} className="bg-slate-300 p-1 my-2 resize-none" name="description" value={data.description} onChange={handleOnChange}></textarea>

                <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2"> Save </button>
            </form>
        </div>
    )
}

export default NewProduct;