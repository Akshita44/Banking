import React from 'react'
import {Link} from "react-router-dom"
function Home() {
  return (
    <>
    <div className='home'>
    <div className='innerhome'>
    <h1>Welcome To SF Bank</h1>
    <Link to="/customers"><button>View Customers</button></Link>
    </div>
    </div>

    </>
  )
}

export default Home