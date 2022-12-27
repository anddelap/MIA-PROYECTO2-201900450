import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { BsArrowLeft } from 'react-icons/bs';
import { GiAirplaneDeparture } from "react-icons/gi";
import { ImTicket } from "react-icons/im";
import { useQuery, useQueryClient } from 'react-query';
import { Await, Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/layouts/GeneralLayout.css'

export default function GeneralLayout(props) {
    const {children,logout, back} = props
    /* const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {refetch} = useQuery('user')
    function useHandleLogout(event) {
        event.preventDefault();
        const res = Await.refetch()
        //queryClient.invalidateQueries('user')
        navigate("/");
    } */

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
