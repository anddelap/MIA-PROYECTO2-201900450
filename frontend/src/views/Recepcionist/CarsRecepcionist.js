import React from 'react'
import { useQuery } from 'react-query'
import { getReservaciones } from '../../api/carsApi'
import CardRevision from '../../components/CardRevision'
import GeneralLayout from '../../layouts/GeneralLayout'

export default function CarsRecepcionist() {
  const {data, isLoading, error} = useQuery('cars-res', getReservaciones)
  console.log(data)
  if(isLoading){
    return <h1>Loading...</h1>
  }
  return (
    <GeneralLayout logout back="/recepcionist">
      <h2 className="ura-title">
        Revisar aútomoviles
      </h2>
      <div className='res-body'>
        {data?.reservaciones?.map((car,index) => (
            <CardRevision key={index} title={car?.car?.marca+' '+car?.car?.model} info={car?.car} user={car?.user}/>
            //console.log(viaje) 
        ))}
      </div>
    </GeneralLayout>
  )
}
