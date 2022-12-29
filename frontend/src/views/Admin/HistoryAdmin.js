import React from 'react'
import { getReservaciones } from '../../api/viajesApi'
import GeneralLayout from '../../layouts/GeneralLayout'
import  * as getCars from '../../api/carsApi'
import { useQuery } from 'react-query'
import Table from 'react-bootstrap/Table';
import '../../styles/views/Admin/HistoryAdmin.css'
export default function HistoryAdmin() {
  const {data, isLoading, error} = useQuery('viajes-res', getReservaciones)
  const {data: dataCar} = useQuery('cars-res', getCars.getReservaciones)
  if(isLoading){
    return <h3>Loading...</h3>
  }
  return (
    <GeneralLayout logout back="/admin">
        <h2 className="ura-title">
            Historial
        </h2>
        <div className='his-body'>
            <h3 className="ura-subtitle">
                Viajes
            </h3>
            <Table striped bordered hover style={{marginBottom: "30px", width:"80%"}}>
                <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Origen</th>
                      <th>Destino</th>
                      <th>Agencia</th>
                      <th>Dias</th>
                      <th>Precio</th>
                      <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.reservaciones?.map((viaje,index) => (
                        <tr key={index}>
                            <td>{viaje.user.user}</td>
                            <td>{viaje.viaje.origin}</td>
                            <td>{viaje.viaje.destination}</td>
                            <td>{viaje.viaje.agency}</td>
                            <td>{viaje.viaje.days}</td>
                            <td>{viaje.viaje.price}</td>
                            {viaje.viaje.status === 0 ? 
                              (
                                <td style={{color:"green !important"}}>Disponible</td> 
                              )
                              : 
                              (
                                viaje.viaje.status === 1 ? (
                                  <td style={{color:"red !important"}}>Reservado</td>
                                ) : (
                                  <td style={{color:"blue !important"}}>Confirmado</td>
                                )
                              )
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
            <br/>
            <h3 className="ura-subtitle">
                Carros
            </h3>
            <Table striped bordered hover style={{width:"80%"}}>
                <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Placa</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Ciudad</th>
                      <th>Precio</th>
                      <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCar?.reservaciones?.map((car,index) => (
                        <tr key={index}>
                            <td>{car.user.user}</td>
                            <td>{car.car.placa}</td>
                            <td>{car.car.marca}</td>
                            <td>{car.car.model}</td>
                            <td>{car.car.city}</td>
                            <td>{car.car.price}</td>
                            {car.car.status === 0 ?
                              (
                                <td style={{color:"green !important"}}>Disponible</td>
                              )
                              :
                              (
                                car.car.status === 1 ? (
                                  <td style={{color:"red !important"}}>Reservado</td>
                                ) : (
                                  <td style={{color:"blue !important"}}>Confirmado</td>
                                )
                              )
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    </GeneralLayout>
  )
}
