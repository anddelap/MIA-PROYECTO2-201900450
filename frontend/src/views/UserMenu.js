import React from 'react'
import MenuItem from '../components/MenuItem'
import GeneralLayout from '../layouts/GeneralLayout'
import { UserOptions } from '../utilities/options';

export default function UserMenu() {
  return (
    <GeneralLayout logout>
        <h2 className="am-title">
            ¡Bienvenido!
        </h2>
        <div className='am-opciones'>
            {UserOptions.map((item, index) => (
                <MenuItem title={item.title} icon={item.icon} link={item.link}/>
            ))}
        </div>
    </GeneralLayout>
  )
}
