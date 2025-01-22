import React, { useState } from 'react';
import Hamburger from 'hamburger-react';

function Header() {

    const [isOpen, setOpen] = useState(false)

    return (
        <>

            <div className="header">

                <img className="logo" src="Images/WhatsApp Image 2024-12-26 at 12.52.58 PM.jpeg" alt="" />



                <div className="hamb">
                    <Hamburger className="ham" toggled={isOpen} toggle={setOpen} />


                </div>





                <div className="collapse navbar-collapse" id="navbarContent">

                    <ul className="navbar">

                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about" >About</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/services">Services</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="/portfolio">Portfolio</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/contact">Contact</a>
                        </li> */}

                    </ul>




                </div>

            </div>
            <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-list">
                    <li className="mobile-nav-item">
                        <a className="mobile-nav-link" href="/">Home</a>
                    </li>
                    <li className="mobile-nav-item">
                        <a className="mobile-nav-link" href="/about">About</a>
                    </li>
                    {/* <li className="mobile-nav-item">
                        <a className="mobile-nav-link" href="/services">Services</a>
                    </li> */}
                    <li className="mobile-nav-item">
                        <a className="mobile-nav-link" href="/portfolio">Portfolio</a>
                    </li>
                    {/* <li className="mobile-nav-item">
                        <a className="mobile-nav-link" href="/contact">Contact</a>
                    </li> */}
                </ul>
            </div>

        </>
    )
}

export default Header;