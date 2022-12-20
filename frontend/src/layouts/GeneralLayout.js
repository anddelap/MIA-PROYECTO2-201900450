import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { GiAirplaneDeparture } from "react-icons/gi";
import { ImTicket } from "react-icons/im";
import Footer from '../components/Footer';

export default function GeneralLayout(props) {
    const {children} = props
    return (
        <>
            <Navbar bg="dark">
                <Navbar.Brand>
                    <h2 className="brand">
                      AviCar <ImTicket className="brand-icon"/> 
                    </h2>
                </Navbar.Brand>
            </Navbar>
            <div className="gl-content">
                {children}
            </div>
            <Footer/>
        </>
    )
}
