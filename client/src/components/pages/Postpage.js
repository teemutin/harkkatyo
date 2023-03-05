import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import WriteComment from '../WriteComment'
import CommentItem from '../CommentItem'
import Cookies from "universal-cookie"
import { useTranslation } from "react-i18next"

//renders A single post. Fetches data from db, and displays it.
//Commentitem comments, if there is any
//Provides chance to write comment if logged in and authorized
//Renders CommentItem, WriteComment
//Calls "/api/post/"+header
function Postpage() {
    const { t, i18n } = useTranslation();
    const cookies = new Cookies();
    const check = cookies.get("jwt_authorization")
    const {header} = useParams()
    const [data, setData] = useState([])
    //Fetch post with url params
    useEffect(() => {
        console.log("Fetching post")
        fetch("/api/post/"+header, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({header}),
            mode: "cors"           
        })
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.log(error))
    }, [header])

  return (
    <div className="App">
        <h2>{data.header}</h2>
        
        <textarea type="string" id="post" readOnly value={data.post} cols={60}rows={20}>
        </textarea>
        <h3>{t("Comments")}</h3>
        {data?.comments?.map((comment) => (
            <CommentItem comment={comment}/>
        ))}

        {check ? <WriteComment header={header}/> : <h3>{t("Login to comment")}</h3>}

    </div>
  )
}
//<h3>{data.post}</h3>
export default Postpage