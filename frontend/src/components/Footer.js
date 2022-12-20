import React from 'react'
import '../styles/components/Footer.css'
import { FaGithubSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='Footer'>
        <div>
            Luis Andrés de la Peña Pineda
            <br/>
            201900450
        </div>
        <div>
            <a target="_blank" href="https://github.com/anddelap" style={{color: 'white'}}>
                <FaGithubSquare size={35}/>
            </a>
        </div>
    </div>
  )
}
