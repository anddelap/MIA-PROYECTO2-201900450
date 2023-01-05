import React from 'react'
import { useQuery } from 'react-query'
import { getReservaciones } from '../../api/carsApi'
import CardRevision from '../../components/CardRevision'
import GeneralLayout from '../../layouts/GeneralLayout'

export default function ViajeRecepcionist() {
  const {data, isLoading, error} = useQuery('viajes-res', getReservaciones)
  if(isLoading){
    return <h3>Loading...</h3>
  }
  return (
    <GeneralLayout logout back="/recepcionist">
      <h2 className="ura-title">
        Revisar viajes
      </h2>
      <div className='res-body'>
        {data?.reservaciones?.map((viaje,index) => (
            <CardRevision key={index} title={viaje?.viaje?.origin+' - '+viaje?.viaje?.destination} info={viaje?.viaje} user={viaje?.user}/>
            //console.log(viaje) 
        ))}
      </div>
    </GeneralLayout>
  )
}
