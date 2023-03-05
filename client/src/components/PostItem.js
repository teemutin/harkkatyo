import React from 'react'
import {Link} from "react-router-dom"
import { useTranslation } from "react-i18next"
//Simple part of the list
//Provides link to the individual postpages
function PostItem({post}) {
    const { t, i18n } = useTranslation();
    //console.log(post)
  return (
    <div>  {t("Header")}: 
        <Link to={`/post/${post.header}`}>{post.header}</Link>
    </div>
  )
}

export default PostItem