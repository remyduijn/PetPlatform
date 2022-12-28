import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../styles/Counter.css';
import styled from 'styled-components';


// const homestay = false;

// function requestColor() {
//     const [request] = useState([]);

//     request.request_type == "Homestay" ? homestay = true : homestay = false
// };

// const P = styled.div`
//     background-color: ${({ homestay }) =>
//     homestay=="Homestay" ? "'blue'" : "'green'"};
// `;



const API_URL = "http://localhost:3001/requests";

function getAPIData() {
  return axios.get(API_URL).then((response) => response.data)
}

function Counter() {

    const [requests, setRequests] = useState([]);

    useEffect(() => { 
        let mounted = true;
        getAPIData().then((items) => {
        if (mounted) {
            setRequests(items);
        }
        }); 
        return () => (mounted = false);
    }, []);  


    const [count, setCount] = useState(0);
    const KEY = `key`;
  
    useEffect(() => {
      const parsedCount = Number(localStorage.getItem(KEY) || 0)
      setCount(parsedCount)
    }, [])
    
    useEffect(() => {
      localStorage.setItem(KEY, count)
    }, [count])
  



  return (
    
    <div className='tasks'>
        <container style={{text:"center"}}>
        <h1 className='text-center task' style={{text:'center'}}>Available Tasks: </h1>
        <p>{requests.map(request => 
            <div className='text-center box'>
                {request.description}
                <br></br>
                <b>{request.request_type}</b>
            </div>)}
        </p>
        {/* <h5>Count is {count}</h5> */}
        </container>
    </div>
  );
}
export default Counter










