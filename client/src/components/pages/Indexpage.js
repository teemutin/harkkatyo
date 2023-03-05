import {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import Topbar from "../Topbar"
import Loginpage from './Loginpage';
import PostItem from '../PostItem';
import Cookies from "universal-cookie"
import { useTranslation } from "react-i18next"

//Homepage 
//Renders login components if not logged in
//Creates Postitems from all the posts in db
//Provides link for writing post if logged in
//Renders Loginpage, PostItem
//Calls "/api/allposts"
function Indexpage() {
    const { t, i18n } = useTranslation();
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const [token, setToken] = useState("")
    const cookies = new Cookies();
    const check = cookies.get("jwt_authorization")

    //fetches all posts and saves it in posts
    useEffect(() => {
        fetch("/api/allposts")
        .then(response => response.json())
        .then(json => setPosts(json))
      }, [token])
      //conditional rendering, whether jwt-cookie is in place
  return (
    <div className="App">
        <h2>{check ? "Logged in" : ""}</h2>
        {check ? "" : <Loginpage setToken={setToken} token={token}/>}
        <h1>{t("Code questions")}</h1>
        {posts.map((post) => (
            <PostItem post={post}/>
        ))}
        {check ? 
        <Link to="/makepost">
            <button>{t("Make a post")}</button>
        </Link>
        : <h3>{t("Login to make a post")}</h3>
        }



    </div>
  )
}

export default Indexpage