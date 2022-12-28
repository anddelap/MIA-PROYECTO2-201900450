import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAcceptReservacion } from '../api/viajesApi';
import { useAcceptReservation } from '../api/carsApi';

export default function CardRevision(props) {
    const { user, info, title } = props;
    const navigate = useNavigate()
    const useGetFetchQuery = (name) => {
        const queryClient = useQueryClient();
        return queryClient.getQueryData(name);
    };
    const dataU  = useGetFetchQuery('user');

    const { mutate: mutAcceptViaje, data: dataViaje} = useAcceptReservacion();
    const { mutate: mutAcceptCar, data: dataCar} = useAcceptReservation();

    useEffect(() => {
        if(!dataU){
            navigate('/')
        }
    }, [dataU])

    var informacionReserva = {};
    if(info.placa){
        informacionReserva = {
            user: user,
            car: info
        }
    }else{
        informacionReserva = {
            user: user,
            viaje: info
        }
    }

    function handleAccept(event) {
        event.preventDefault();
        console.log('aceptar')
        if(info.placa){
            console.log('carro')
            informacionReserva.car.status = 2;
            console.log(informacionReserva)
            mutAcceptCar(informacionReserva)

        }else{
            console.log('viaje')
            informacionReserva.viaje.status = 2;
            console.log(informacionReserva)
            mutAcceptViaje(informacionReserva)
        }
    }

    function handleReject(event) {
        event.preventDefault();
        console.log('rechazar')
        if(info.placa){
            console.log('carro')
            informacionReserva.car.status = 0;
            console.log(informacionReserva)
            mutAcceptCar(informacionReserva)

        }else{
            console.log('viaje')
            informacionReserva.viaje.status = 0;
            console.log(informacionReserva)
            mutAcceptViaje(informacionReserva)
        }

    }

    return (
    <Card style={{width: "45%", margin: '10px' }}>
        {/* <Card.Header>Reservación</Card.Header> */}
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
                <p>Reservación hecha por: {user.name} </p>
                {info.placa ? (
                    <>
                    <p>Agencia: {info.agency}</p>
                    <p>Placa: {info.placa}</p>
                    <p>Ciudad: {info.city}</p>
                    <p>Precio: ${info.price}</p>
                    {info.status === 1 ? (
                        <p style={{color: "orange"}}>Necesita gestion</p>
                    ):(
                        info.status === 2 ? (
                            <p style={{color: "green"}}>Aceptado</p>
                        ):(
                            <p style={{color: "red"}}>Rechazado</p>
                        )
                    )}
                </>
            ) : (
                <>
                    <p>Agencia: {info.agency}</p>
                    <p>Dias: {info.days}</p>
                    <p>Precio: ${info.price}</p>
                    {info.status === 1 ? (
                        <p style={{color: "orange"}}>Necesita gestion</p>
                    ):(
                        info.status === 2 ? (
                            <p style={{color: "green"}}>Aceptado</p>
                        ):(
                            <p style={{color: "red"}}>Rechazado</p>
                        )
                    )}
                </>
                )}
            </Card.Text>
            <Button variant="success" style={{marginRight: "10px"}} onClick={handleAccept} disabled={info.status!==1}>Aceptar</Button>
            <Button variant="danger" onClick={handleReject}>Rechazar</Button>
        </Card.Body>
    </Card>
    )
}
