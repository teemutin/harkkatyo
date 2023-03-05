import {useState} from 'react'
//renders register page with form
function Registerpage() {
    //take user input from the form and save it in userdata
    //send userdata to db
    const [userData,setUserData] = useState({})
    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }
    //on submit, make a call to server "/api/user/register" for registration
    const submitData = (e) => {
        e.preventDefault()
        console.log(userData)
        
        fetch("/api/user/register", {
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
        

    }
  return (
    <div className="App">
        <h1>Registration</h1>
        <form onSubmit={submitData} onChange={handleChange}>
            <label> Name:
                <input type="string" id="name"/>
            </label>
            <label> Password:
                <input type="string" id="password"/>
            </label> 
            <label>
                <input type="submit" id="submit"/>
            </label>
        </form>
    </div>
  )
}

export default Registerpage