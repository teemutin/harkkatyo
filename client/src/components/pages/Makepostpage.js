import {useEffect, useState} from 'react'

//Page for creating new posts. Takes user input in form and sends it to server
// Calls "/api/post"
function Makepostpage({}) {
    const [userData,setUserData] = useState({})
    //keeps values updated
    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }
    //creates post call on submit
    const submitData = (e) => {
        console.log("tapahtuuko mitään")
        e.preventDefault()
        console.log(userData)

        fetch("/api/post", {
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
                alert("Post created")
            })

    }

  return (
    <div className="App">

        <h1>Write a post</h1>
        <form onSubmit={submitData} onChange={handleChange}>
            <label> Header:
                    <textarea type="string" id="header"cols={60}rows={3} required/>
            </label>
            <label> Post:
                    <textarea type="string" id="post" cols={60}rows={20} required/>
            </label>
            <label>
                <input type="submit" id="submit"/>
            </label>
        </form>

        
    </div>
  )
}

export default Makepostpage