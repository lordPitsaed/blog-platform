import React from "react"
import { Link, Outlet } from "react-router-dom"
import classes from "./layout.module.scss"

const Layout: React.FC = () => {
  return (
    <>
      <header>
        <Link to="/">Realworld Blog</Link>
        <Link to="/">Sign In</Link>
        <Link to="/" className={classes.signUpButton}>
          Sign Up
        </Link>
      </header>
      <Outlet />
    </>
  )
}

export default Layout
