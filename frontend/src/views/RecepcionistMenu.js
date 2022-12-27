import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import MenuItem from '../components/MenuItem'
import GeneralLayout from '../layouts/GeneralLayout'
import { RecepcionistOptions } from '../utilities/options'

export default function RecepcionistMenu() {
    const navigate = useNavigate();

    const useGetFetchQuery = (name) => {
        const queryClient = useQueryClient();
    
        return queryClient.getQueryData(name);
    };
    
    const dataU  = useGetFetchQuery('user');

    useEffect(() => {
        console.log(dataU?.data?.usuario);
        if(dataU){
          if (dataU.data.usuario.role !== "recepcionist") {
            if(dataU.data.usuario.role === "admin"){
                navigate("/admin");
            }else{
                navigate("/");
            }
          }
        }else{
            navigate("/");
        }
    }, [])
    
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
