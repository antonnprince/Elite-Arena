import React from 'react'
import "./css/all.min.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/master.css"

const Nav = () => {
  return (
    <div>
       <header className="w-100 position-absolute start-0 top-lg-0">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="content d-flex align-items-center rounded-pill bg-transparent">
                            <a href="index.html" className="logo d-block">
                                <img src="images/mainlogo.png" alt=""/>
                            </a>
                           
                            <div className="linkes mt-0 position-relative">
                                <ul className="m-0 p-0 d-flex justify-content-end align-items-center">
                                    <li>
                                        <a className="active" href="index.html">Home</a>
                                    </li>
                                    <li>
                                        <a href="browse.html">Browse</a>
                                    </li>
                                    <li>
                                        <a href="details.html">Details</a>
                                    </li>
                                    
                                    <li>
                                        <a href="profile.html" className="rounded-pill">
                                            Profile
                                            <img src="images/profile-header.jpg" className="rounded-circle" alt=""/>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="menu position-absolute d-block d-lg-none">
                                <span className="d-block position-relative top-50 translate-middle-y"></span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Nav
