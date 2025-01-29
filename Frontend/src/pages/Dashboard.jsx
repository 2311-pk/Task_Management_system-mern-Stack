import react, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../config";
function Dashboard()
{
    const location =useLocation();
    const username = location.state.username;
    const [task,setTasks]=useState([]);

  const fetchData = async()=>{
    try{
        const response = await fetch (`${BASE_URL}/TaskRoutes/info`,{
            method:"POST",
           headers: {
              "Content-Type":"application/json",
           },
           body:JSON.stringify({username}),
        })
        if(response.ok)
        { const data=await response.json();
          console.log(data);
          if(Array.isArray(data)){
            setTasks(data);
          }
          else{
            setTasks([]);
          }
        } else{
            console.log("response is not okay");
        }
    } catch(error){
           console.log(error);
    }
  }
  useEffect(()=>{
 fetchData();
  },[]);

    return(<>
<h1>Dashboard page</h1>
<h1>username :{username}</h1>
<div className="flex flex-wrap gap-4 justify-center sm:justify-between mx-8">

<div className="w-36 border-2 border-cyan-200 p-3 lg:w-64 ">
<h1>Total Task</h1>
</div>
<div className="w-36 border-2 border-cyan-200 p-3 lg:w-64 ">
<h1>Total Task</h1>
</div>
<div className="w-36 border-2 border-cyan-200 p-3 lg:w-64 ">
<h1>Total Task</h1>
</div>
<div className="w-36 border-2 border-cyan-200 p-3 lg:w-64 ">
<h1>Total Task</h1>
</div>
</div>
<div>
    
<table className="text-wrap">
  <thead><tr>
<th>taskname</th>
<th>description</th>
<th>dueDate</th>
<th>status</th></tr>
  </thead>
  <tbody>
    {task.map((t)=>
  <tr className="border-2 w-full text-center border-blue-300"
key={t._id}>
    <td className="border-2 border-cyan-300 p-3">{t.taskname}</td>
    <td className="border-2 border-cyan-300 p-3">{t.description}</td>
    <td className="border-2 border-cyan-300">{t.dueDate}</td>
    <td className="border-2 border-cyan-300">{t.status}</td>
    </tr>
)}
  </tbody>
</table>

</div>
</>

    );
}
export default Dashboard;