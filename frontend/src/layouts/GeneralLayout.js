import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { GiAirplaneDeparture } from "react-icons/gi";
import { ImTicket } from "react-icons/im";
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/layouts/GeneralLayout.css'

export default function GeneralLayout(props) {
    const {children,logout} = props
    return (
        <>
            <Navbar bg="dark" className='nav-bar'>
                <Navbar.Brand>
                    <h2 className="brand">
                      AviCar <ImTicket className="brand-icon"/> 
                    </h2>
                </Navbar.Brand>
                {logout &&
                    <Link to={"/"} className="nav-link">
                        Log out
                    </Link>
                }
            </Navbar>
            <div className="gl-content">
                {children}
            </div>
            <Footer/>
        </>
    )
}
