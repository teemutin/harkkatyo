import {useEffect, useState} from 'react'

function Makepostpage() {
  return (
    <div className="App">
        <h1>Write a post</h1>
        <label> Header:
                <textarea type="string" id="header"cols={60}rows={3}/>
        </label>
        <label> Post:
                <textarea type="string" id="post" cols={60}rows={20}/>
        </label>
        <button>Submit</button>

        
    </div>
  )
}

export default Makepostpage