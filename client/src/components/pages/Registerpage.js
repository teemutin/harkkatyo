import React from 'react'

function Registerpage() {
  return (
    <div>
        <h1>Login page</h1>
        <form onSubmit={submitData} onChange={handleChange}>
            <label> Name:
                <input type="string" id="name"/>
            </label>
            <label> Author:
                <input type="string" id="author"/>
            </label> 
            <label> Pages:
                <input type="number" id="pages"/>
            </label>
            <label>
                <input type="submit" id="submit"/>
            </label>
        </form>
    </div>
  )
}

export default Registerpage