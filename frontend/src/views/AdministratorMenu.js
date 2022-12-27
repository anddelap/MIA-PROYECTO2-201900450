import React, { useEffect } from 'react'
import GeneralLayout from '../layouts/GeneralLayout'
import "../styles/views/AdministratorMenu.css"
import Table from 'react-bootstrap/Table';
import { AdminMenu } from '../utilities/options';
import MenuItem from '../components/MenuItem';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

export default function AdministratorMenu() {
    const navigate = useNavigate();

    const useGetFetchQuery = (name) => {
        const queryClient = useQueryClient();
    
        return queryClient.getQueryData(name);
    };
    
    const dataU  = useGetFetchQuery('user');

    useEffect(() => {
        console.log(dataU?.data?.usuario);
        if(dataU){
          if (dataU.data.usuario.role !== "admin") {
            if(dataU.data.usuario.role === "recepcionist"){
                navigate("/recepcionist");
            }else if(dataU.data.usuario.role === "turist"){
                navigate("/user");
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
