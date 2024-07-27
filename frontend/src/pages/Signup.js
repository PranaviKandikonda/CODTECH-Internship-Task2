import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: "",
    })
    console.log(data);

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => {
            return{
                ...prev,
                [name] : value
            }
        })
    }

    console.log(process.env.REACT_APP_SERVER_DOMAIN);

    const handleSubmit = async(e) => {
        e.preventDefault();

        {/* Form Validation */}
        const {firstName, email, password, confirmpassword} = data;
        if(firstName && email && password &&confirmpassword){
            if(password === confirmpassword){
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                const dataRes = await fetchData.json();
                console.log(dataRes);

                alert(dataRes.message);

                if(dataRes.alert){
                    navigate("/login");
                }
                
            } else {
                alert("Password and Confirm Password are not same");
            }
        } else {
            alert("Please fill all the fields!");
        }
    }

    return (
        <div className="p-3 md:p-4 bgSignUp" id="bgSignup">
            <div className="w-full max-w-sm bg-white m-auto p-4 shadow-md">
                <h1 className="text-center text-2xl font-bold"> Sign Up </h1>
                <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
                    <label htmlFor="firstName"> First Name </label>
                    <input type="text"
                     id="firstName"
                     name="firstName"
                     className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded"
                     value={data.firstName}
                     onChange={handleOnChange} />

                    <label htmlFor="lastName"> Last Name </label>
                    <input type="text"
                     id="lastName"
                     name="lastName" 
                     className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded"
                     value={data.lastName}
                     onChange={handleOnChange} />

                    <label htmlFor="email"> Email </label>
                    <input type="email" 
                    id="email" 
                    name="email" 
                    className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded"
                    value={data.email}
                    onChange={handleOnChange} />

                    <label htmlFor="password"> Password </label>
                    <input type="password"
                     id="password"
                     name="password" 
                     className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded"
                     value={data.password}
                     onChange={handleOnChange} />

                    <label htmlFor="confirmpassword"> Confirm Password </label>
                    <input type="password"
                     id="confirmpassword"
                     name="confirmpassword" 
                     className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded"
                     value={data.confirmpassword}
                     onChange={handleOnChange} />

                    <button className="max-w-[120px] w-full m-auto bg-blue-500 hover:bg-blue-700 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"> Sign Up </button>
                </form>
                <p className="text-sm mt-2"> Already have an account?<Link to={"/login"} className="text-blue-700 underline"> Login </Link></p>
            </div>
        </div>
    )
}

export default Signup;