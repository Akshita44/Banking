import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./customer.css"
import {Link} from "react-router-dom"
function Customers(){
  const [users,setusers]=useState([]);
  const [request,setrequest]=useState(false);
  const [transactions,settransactions]=useState([]);
  const [SenderEmail,setsenderemail]=useState("");
  const [RecieverEmail,setrecieveremail]=useState("");
  const [Amount,setamount]=useState("");
  var k=1
  useEffect(()=>{
    const getusers=async()=>{
        const user=await axios.get("/users")
        console.log(user.data);
        setusers(user.data)
    }
    getusers();
  },[request])

  const transactionhistory=async()=>{
    const data=await axios.get("/transaction")
    if(data.status===200)
    {
        const t=data.data
        t.reverse()
        settransactions(t)
    }
    else{
        alert(data.data)
    }
   }
  const sendmoney=async()=>{
    try{
        if (SenderEmail === RecieverEmail)
        {
            alert("Sender and Reciever cannot be same")
        }
        else{
    const data=await axios.put("/updateuser",{SenderEmail,RecieverEmail,Amount:Number(Amount)})
      if(data.status===201)
      {
        alert("Transaction performed successfully")
        setrequest(false)
      }
      else{
        alert("Some Error Occured")
      }
    }}
    catch(err){
        alert(err.message)
    }
  }
  return (
    <>
    <div className='customerbox'>
        <div className='buttons'>
            <button onClick={()=>{setrequest(true)}}>Send Money</button>
            <button onClick={transactionhistory}>Search All Transactions</button>
        </div>
        {transactions.length!==0 && (
            <div className="transactionbox">
            <div className='transactionn'>
            <h1>Transaction History</h1>
            <button onClick={()=>{settransactions([])}}><i class="fa-solid fa-xmark"></i></button>
                {transactions.map((transaction)=>(
                    <div className='transaction'>
                        <h2> <span>Sender's Email:</span>{` ${transaction.SenderEmail}`}</h2>
                        <h2><span>Reciever's Email:</span>{` ${transaction.RecieverEmail}`}</h2>
                        <h2><span>Amount:</span>{` ${transaction.Amount}`}</h2>
                        <h2><span>Time: </span> {` ${(transaction.createdAt)}`}</h2>
                    </div>
                ))}
            </div>
            </div>
        )}
            <Link to="/"><button className='gethome'>Home</button></Link>
        {request && (
            <div className='reqbox'>
              <div className='req'>
                <h2>Send Money</h2>
                <input type="text" placeholder="Enter Sender's Email" onChange={(e)=>{setsenderemail(e.target.value)}}></input>
                <input type="text" placeholder="Enter Reciever's Email" onChange={(e)=>{setrecieveremail(e.target.value)}}></input>
                <div className='amount'>
                <span>₹</span><input type="text" placeholder="Enter amount" onChange={(e)=>{setamount(e.target.value)}}></input>
                </div>
                <div className='reqbuttons'>
                <button onClick={()=>{setrequest(false)}}>Close</button>
                <button onClick={sendmoney}>Send Money</button>
                </div>
              </div>
            </div>
        )}
        <div>
            <table className='customers'>
                <tr>
                    <th>Serial No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Balance</th>
                </tr>
                {users.map((user)=>(
                    <tr>
                        <td>{k++}</td>
                        <td>{user.Name}</td>
                        <td>{user.Email}</td>
                        <td>{user.Balance}</td>
                    </tr>
                ))}
            </table>
        </div>
    </div>
    </>
  )
}

export default Customers