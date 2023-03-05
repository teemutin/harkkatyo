import {useState} from 'react'
import { useTranslation } from "react-i18next"
//renders really simple register page, takes users form data and sends it to server
//Calls "/api/user/register"
function Registerpage() {
    const { t, i18n } = useTranslation();
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
                alert("Registration succesful")
            })
        

    }
  return (
    <div className="App">
        <h1>{t("Registration")}</h1>
        <form onSubmit={submitData} onChange={handleChange}>
            <label> {t("Name")}:
                <input type="string" id="name"/>
            </label>
            <label> {t("Password")}:
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