import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" href="/home">InstaClick </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <Link className="nav-item nav-link " href="/home">Home </Link>
      <Link className="nav-item nav-link" href="/messages">Message</Link>
      <Link className="nav-item nav-link" href="/createPost">Create</Link>
      <Link className="nav-item nav-link" href="/profile">Profile</Link>
    </div>
  </div>
</nav>
    </div>
  )
}
