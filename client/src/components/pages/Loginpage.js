import {useState} from 'react'

function Loginpage() {
    //take user input from the form and save it in userdata
    //send userdata to db
    const [userData,setUserData] = useState({})
    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }
    const submitData = (e) => {
        e.preventDefault()
        console.log(userData)
        /*
        fetch("/api/book", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
        */

    }






  return (
    <div className="App">
        <h1 className="App">Login</h1>
        <form onSubmit={submitData} onChange={handleChange}>
            <label> Name:
                <input type="string" id="name"/>
            </label>
            <label> Author:
                <input type="string" id="author"/>
            </label> 
            <label> Pages:
                <input type="number" id="pages"/>
            </label>
            <label>
                <input type="submit" id="submit"/>
            </label>
        </form>
    </div>
  )
}

export default Loginpage