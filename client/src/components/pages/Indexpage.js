import {useEffect, useState} from 'react'
import {Link} from "react-router-dom";

//Homepage 
function Indexpage() {


  return (
    <div className="App">
        <h1>Code questions</h1>
        <Link to="/makepost">
            <button>Make a post</button>
        </Link>


    </div>
  )
}

export default Indexpage