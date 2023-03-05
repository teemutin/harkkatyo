import {useState} from 'react'
import { useTranslation } from "react-i18next"

//Component for writing comments
//Takes user input and sends it to server
//Calls "/api/post/comment"
function WriteComment({header}) {
    const { t, i18n } = useTranslation();
    const [userData,setUserData] = useState({})
    //keeps values updated
    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value, header})
    }
    const submitData = (e) => {
        console.log()
        e.preventDefault()
        console.log(userData)

        fetch("/api/post/comment", {
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
                alert("Comment posted, reload page")
            })

    }
  return (
    <div>
        <form onSubmit={submitData} onChange={handleChange}>
            <label> {t("Comment")}:
                <textarea type="string" id="post" cols={60}rows={4} required/>
            </label>
            <label>
                <input type="submit" id="submit"/>
            </label>
        </form>
    </div>
  )
}

export default WriteComment