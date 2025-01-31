import react, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../config";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";


// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const data = {
    labels: ["Pending", "In-Progress", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [10, 5, 15], // Replace with actual counts
        backgroundColor: ["#FF6384", "#FFCD56", "#36A2EB"],
      },
    ],
  };
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
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
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
<div className="bg-white p-6 w-1/2 mt-6 ml-10 h-96  rounded-4xl  border-4 border-blue-400   shadow-2xl   shadow-white">
      <h2 className="text-2xl font-bold mb-4 " >Task Overview</h2>
      <Bar data={data}  className="pb-10" width={1800} height={1000}/>
    </div>
    <div className="bg-white mt-8 m-10 lg:m-6 rounded-4xl border-4 border-blue-400   shadow-2xl   shadow-white">
   
<div className="overflow-x-auto rounded-4xl p-2  ">
<table className="w-full border-collapse rounded-lg shadow-lg bg-white text-gray-900">
<thead>
    <tr className="bg-blue-600 text-white uppercase text-sm leading-normal">
      <th className="py-3 px-6 text-left">Task Name</th>
      <th className="py-3 px-6 text-left">Description</th>
      <th className="py-3 px-6 text-center">Due Date</th>
      <th className="py-3 px-6 text-center">Status</th>
    </tr>
  </thead>
    <tbody>
        {task.map((task, index) => (
          <tr key={task.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-100`}>
            <td className="py-3 px-6">{task.name}</td>
            <td className="py-3 px-6">{task.description}</td>
            <td className="py-3 px-6 text-center">{new Date(task.dueDate).toLocaleDateString()}</td>
            <td className={`py-3 px-6 text-center ${task.status === "pending" ? "text-red-500" : "text-green-500"}`}>
              {task.status}
            </td>
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