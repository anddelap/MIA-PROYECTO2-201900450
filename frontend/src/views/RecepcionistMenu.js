import React from 'react'
import MenuItem from '../components/MenuItem'
import GeneralLayout from '../layouts/GeneralLayout'
import { RecepcionistOptions } from '../utilities/options'

export default function RecepcionistMenu() {
  return (
    <GeneralLayout logout>
        <h2 className="am-welcome">
            ¡Bienvenido!
        </h2>
        <h2 className="am-title">
            Recepcionista
        </h2>
        <div className='am-opciones'>
            {RecepcionistOptions.map((item, index) => (
                <MenuItem title={item.title} icon={item.icon} link={item.link}/>
            ))}
        </div>
    </GeneralLayout>

  )
}
