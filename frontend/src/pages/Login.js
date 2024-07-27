import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginRedux } from "../redux/userSlice";

function Login(){
    const navigate = useNavigate();

    const userData = useSelector(state => state);

    const dispatch = useDispatch();

    const [data, setData] = useState({
        email: "",
        password: "",
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

    const handleSubmit = async(e) => {
        e.preventDefault();

        {/* Form Validation */}
        const {email, password} = data;
        if(email && password){
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
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
                dispatch(loginRedux(dataRes));
                navigate("/");
            }
        }
        else {
            alert("Please fill all the fields!");
        }
    }
    console.log(userData);

    return(
        <div className="p-3 md:p-4 bgSignUp" id="bgLogin">
            <div className="w-full max-w-sm bg-white m-auto p-4 shadow-md">
                <h1 className="text-center text-2xl font-bold"> LogIn </h1>
                <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
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

                    <button className="max-w-[120px] w-full m-auto bg-blue-500 hover:bg-blue-700 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"> Login </button>
                </form>
                <p className="text-sm mt-2"> Don't have an account?<Link to={"/signup"} className="text-blue-700 underline"> Sign Up </Link></p>
            </div>
        </div>
    )
}

export default Login;