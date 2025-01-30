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
        const response = await fetch (`${BASE_URL}/api/TaskRoutes/info`,{
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
    <div className="w-screen h-screen bg-gradient-to-br from-gray-900 to-gray-700">
    <div
 className="w-full max-w-screen-xl mx-auto ">
<h1>Dashboard page</h1>
<h1>username :{username}</h1>
<div className="flex flex-wrap gap-4 justify-center sm:justify-between mx-8">

<div className="shadow-2xl shadow-white w-36 border-4 border-white p-3 lg:w-64  rounded-4xl bg-purple-200">
<h1 className="mx-auto w-32 text-xl font-semibold text-black">Total Task</h1>
</div>
<div className=" shadow-2xl shadow-white w-40 border-4 border-white p-3 lg:w-64  rounded-4xl bg-purple-200">
<h1 className="mx-auto w-32 text-xl font-semibold text-black">Pending Task</h1>
</div>
<div className="shadow-2xl shadow-white  w-56 border-4 border-white pt-3 pb-3 lg:w-64  rounded-4xl bg-purple-200">
<h1 className="mx-auto w-40 text-xl font-semibold text-black">Completed Task</h1>
</div>


</div>
<div className="bg-white mt-8 m-10  rounded-4xl border-4 border-white  shadow-2xl   shadow-white">
    
<div className="overflow-x-auto rounded-4xl p-2 bg-indigo-300 ">
  <table className="text-wrap w-full rounded-4xl">
    <thead>
      <tr className=" p-3">
        <th>Task Name</th>
        <th>Description</th>
        <th>Due Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {task.map((t) => (
        <tr className="border-2 w-full text-center border-blue-300" key={t._id}>
          <td className=" p-3">{t.name}</td>
          <td className=" p-3">{t.description}</td>
          <td className=" p-3">{t.dueDate}</td>
          <td className=" p-3">{t.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

</div></div>
</div>
</>

    );
}
export default Dashboard;