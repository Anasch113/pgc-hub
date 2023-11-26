import React from 'react'
import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    
} 
from 'chart.js'
import {Bar }from 'react-chartjs-2'
import "./chart.css"
import { useUserAuth } from '../../context/UserAuthContext'
import { useState, useEffect } from 'react';
import { db } from '../../Firebase'; // Import your Firebase configur
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend 
)


const Chart = () => {

const [chartData, setChartData]= useState({ lables: [], data:[]});
const { user } = useUserAuth();

 // Function to fetch data from Firebase
    useEffect(() => {

        const fetchData = async () => {
 // Reference to the 'Articles' collection in Firebase
          const articleRef = collection(db, 'Articles');

          
     // Query to order articles by 'createdAt' in descending order
          const q = query(articleRef, orderBy('createdAt', 'desc'));

          // Listen for real-time updates using onSnapshot
          onSnapshot(q, (snapshot) => {


 // Map the snapshot documents to an array of articles with additional ID
            const articles = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));


       // Get today's date and the dates of the last seven days
            const today = new Date();
            const lastSevenDays = [...Array(7)].map((_, index) => {
              const day = new Date(today);
              day.setDate(today.getDate() - index);
              return day.toDateString();
            });
    
  // Set the labels for the chart to the last seven days
  const labels = lastSevenDays;


          
// Count the number of articles created on each day in the last seven days
            const data = lastSevenDays.map((day) => {

                // Filter articles for the specific day and current user ID
              const assignments = articles.filter((item) => item.createdAt.toDate().toDateString() === day && item.userId === user.uid) ;


               // Return the count of assignments created on that day
              return assignments.length;
            });
    
            setChartData({ labels, data });
           
            
          });
         
        };
    
        fetchData();
      }, []);


    const options = {
        indexAxis : 'x',
        elements : {
    bar : {
        borderWidth : 2
    },
        },
    
        responsive: true,
        plugins:{
            legend :{
    position: 'right'
            },
            title :{
    display: true,
    text: 'Assignments Statistics'
            }
        }
    }
    
      
    
      const labels = chartData.labels;
    

  
    const chartDataConfig = {
      
      labels,
      datasets: [
        {
          label: 'Data',
          data: chartData.data,
          borderColor: "#2c2b6f",
          backgroundColor: '#fff'
        }
      ]
    };
   
  return (
    <div className='Chart-container'>
      <div className='chart-bar'>
        <Bar data={chartDataConfig} options={options}/>
      </div>
    </div>
  )
}

export default Chart
 