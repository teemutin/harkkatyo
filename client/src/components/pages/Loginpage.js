import {useState} from 'react'
import Cookies from "universal-cookie"
import jwt from "jwt-decode"
import { useTranslation } from "react-i18next"


//Creates simple loginpage, takes userdata from form and sends it to
//db for confirmation.
//Provides jwt-cookie for authentication
//Calls "/api/user/login"
function Loginpage({setToken, token}) {
    //take user input from the form and save it in userdata
    //send userdata to db, which sends back name and jwt
    //make a authorization cookie if succesful
    const { t, i18n } = useTranslation();
    const cookies = new Cookies();
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
                    //set jwt token to cookie and, set user state
                    setToken(data.accessToken)
                    const decoded = jwt(data.accessToken)
                    setUser(decoded)
                    cookies.set("jwt_authorization", data.accessToken)
                    alert("Login succesful")
                }
            })
        

    }
  return (
    <div className="App">
        <h3>{t("Login")}</h3>
        <form onSubmit={submitData} onChange={handleChange}>
            <label> {t("Name")}
                <input placeholder="Name" type="string" id="name"/>
            </label>
            <label> {t("Password")}
                <input placeholder="Password" type="string" id="password"/>
            </label> 
            <label>
                <input type="submit" id="submit"/>
            </label>
        </form>
    </div>
  )
}

export default Loginpage