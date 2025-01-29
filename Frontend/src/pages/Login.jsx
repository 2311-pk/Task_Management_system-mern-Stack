import react, { useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
function Login()
{
    const [username,setUser]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
const handle = async (e) => {
  e.preventDefault(); // Prevent page refresh

  try {
    const response = await fetch(`${BASE_URL}/api/TaskRoutes/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert("Login successful");
      navigate("/dashboard",{ state:{username}});
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Login unsuccessful");
  }
};

 const h0=(e)=>{
    setUser(e.target.value);
 }
 const h1=(e)=>{
    setPassword(e.target.value);
}

return(<><div className="">
<div className="mt-36 p-4 border-2 border-gray-400 w-96 mx-auto shadow-2xl ">
<h1 className="text-3xl mx-auto w-28 p-2 text-gray-400">Sign in</h1>
<form className="flex flex-col space-y-6">
    <p className="flex p-2">
        <label className="text-gray-500">username</label>
    <input type="text"
    value={username}
   onChange={(e)=>setUser(e.target.value)}
    className="ml-2 border-2 rounded-md border-gray-300"></input>
    </p><p className="ml-2">
    <label className="text-gray-500">Password</label>
    <input type="text"
    value={password}
   onChange={(e)=>setPassword(e.target.value)}
    className=" ml-3 border-2 rounded-md border-gray-300"></input>
    </p>
    <p className="w-full mx-auto">
        <button 
        onClick={handle}
        className="ml-7 w-72 mx-auto bg-amber-300 p-1 rounded-xl font-medium text-white"> 
            Sign in 
        </button>
    </p>
</form></div>
</div>
</>
    );
}
export default Login;