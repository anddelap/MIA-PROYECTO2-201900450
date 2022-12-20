import React from 'react'
import GeneralLayout from '../layouts/GeneralLayout'
import "../styles/views/AdministratorMenu.css"
import Table from 'react-bootstrap/Table';
import { AdminMenu } from '../utilities/options';
import MenuItem from '../components/MenuItem';

export default function AdministratorMenu() {
  return (
    <GeneralLayout>
        <h2 className="am-welcome">
            ¡Bienvenido!
        </h2>
        <h2 className="am-title">
            Administrador
        </h2>
        <div className='am-opciones'>
            {AdminMenu.map((item, index) => (
                <MenuItem title={item.title} icon={item.icon} link={item.link}/>
            ))}
        </div>
    </GeneralLayout>
  )
}
