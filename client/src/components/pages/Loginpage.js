import {useState} from 'react'

function Loginpage({setToken, token}) {
    //take user input from the form and save it in userdata
    //send userdata to db
    const [user, setUser] = useState({})
    const [userData,setUserData] = useState({})
    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }
    //on submit, make a call to server "/api/user/register" for registration
    const submitData = (e) => {
        e.preventDefault()
        //console.log(userData)
        
        fetch("/api/user/login", {
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
                if(data.accessToken) {
                    setToken(data.accessToken)
                }
            })
        

    }
  return (
    <div className="App">
        <h3>Login</h3>
        <form onSubmit={submitData} onChange={handleChange}>
            <label> 
                <input placeholder="Name"type="string" id="name"/>
            </label>
            <label> 
                <input placeholder="Password"type="string" id="password"/>
            </label> 
            <label>
                <input type="submit" id="submit"/>
            </label>
        </form>
    </div>
  )
}

export default Loginpage