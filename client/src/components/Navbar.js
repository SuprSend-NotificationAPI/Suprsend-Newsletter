import React from 'react'

export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-dark" style={{background:"#7d34eb",height:"4rem"}}>
        <a className="navbar-brand" href="/">
            <img className="mx-3" src="https://www.sendinblue.com/wp-content/uploads/2020/02/how_to_create_a_newsletter_t.png" width="30" height="30" alt="" />
             <strong className='mx-2'>NewsLetter</strong>
        </a>
        </nav>
    </div>
  )
}
