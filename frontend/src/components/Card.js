import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/components/CardR.css'
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAddReservation } from '../api/carsApi';
import { useAddReservacion } from '../api/viajesApi';

export default function CardR(props) {
    const { title, info } = props
    const navigate = useNavigate()
    const { mutate: mutReserveCar, data: dataCar, isLoading, isError, error } = useAddReservation();
    const { mutate: mutReserveViaje, data: dataViaje} = useAddReservacion();

    const useGetFetchQuery = (name) => {
        const queryClient = useQueryClient();
        return queryClient.getQueryData(name);
    };
    const dataU  = useGetFetchQuery('user');
    useEffect(() => {
        console.log(dataU)
        if(!dataU){
            navigate('/')
        }
    }, [dataU])

    useEffect(() => {
        if (dataCar) {
            console.log(dataCar?.data);
        }
    }, [dataCar])

    var informacionReserva = {};
    if(info.placa){
        informacionReserva = {
            user: dataU?.data?.usuario,
            car: info
        }
    }else{
        informacionReserva = {
            user: dataU?.data?.usuario,
            viaje: info
        }
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        if(info.placa){
            console.log('reservar carro')
            informacionReserva.car.status = 1;
            console.log(informacionReserva)
            mutReserveCar(informacionReserva)

        }else{
            console.log('reservar viaje')
            informacionReserva.viaje.status = 1;
            console.log(informacionReserva)
            mutReserveViaje(informacionReserva)
        }
    }
    
    return (
        /* info.status === 0 ? ( */
        <Card style={{ width: '18rem', margin: "10px"}}>
            <Card.Body>
                <Card.Title style={{textAlign: "center"}}>{title}</Card.Title>
                <Card.Text>
                    {info.placa ? (
                        <>
                            <p>Agencia: {info.agency}</p>
                            <p>Placa: {info.placa}</p>
                            <p>Ciudad: {info.city}</p>
                            <p>Precio: ${info.price}</p>
                            {info.status !== 0 ? (
                                <p style={{color: "red"}}>Reservado</p>
                            ):(
                                <p style={{color: "green"}}>Disponible</p>
                            )}
                        </>
                    ) : (
                        <>
                            <p>Agencia: {info.agency}</p>
                            <p>Dias: {info.days}</p>
                            <p>Precio: ${info.price}</p>
                            {info.status !== 0 ? (
                                <p style={{color: "red"}}>Reservado</p>
                            ):(
                                <p style={{color: "green"}}>Disponible</p>
                            )}
                        </>
                    )}

                </Card.Text>
                <div className='c-button'>
                    <Button variant="success" onClick={handleSubmit} disabled={info.status!==0}>Reservar</Button>
                </div>
            </Card.Body>
        </Card>
        /* ) : ( <></> ) */
    )
}
