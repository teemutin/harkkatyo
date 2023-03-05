import {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import Topbar from "../Topbar"
import Loginpage from './Loginpage';

//Homepage 
function Indexpage() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [token, setToken] = useState("")

  return (
    <div className="App">
        <h2>{token ? "Logged in" : ""}</h2>
        {token ? "" : <Loginpage setToken={setToken} token={token}/>}
        <h1>Code questions</h1>
        
        <Link to="/makepost">
            <button>Make a post</button>
        </Link>

        


    </div>
  )
}

export default Indexpage