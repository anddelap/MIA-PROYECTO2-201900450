import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { BsArrowLeft } from 'react-icons/bs';
import { GiAirplaneDeparture } from "react-icons/gi";
import { ImTicket } from "react-icons/im";
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/layouts/GeneralLayout.css'

export default function GeneralLayout(props) {
    const {children,logout, back} = props
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
            {back &&

                <Link to={back} className="ura-back">
                    <pre>
                        <BsArrowLeft size={25}/> Regresar
                    </pre>
                </Link>
            }
            <div className="gl-content">
                {children}
            </div>
            <Footer/>
        </>
    )
}
