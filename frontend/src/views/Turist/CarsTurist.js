import React from 'react'
import { useQuery } from 'react-query'
import { getCars } from '../../api/carsApi'
import CardR from '../../components/Card'
import GeneralLayout from '../../layouts/GeneralLayout'

export default function CarsTurist() {
  const {data, isLoading, error} = useQuery('viajes', getCars)
  if(isLoading){
    return <h1>Loading...</h1>
  }
  return (
    <GeneralLayout logout back="/user">
      <h2 className="ura-title">
        Reservar aútomoviles
      </h2>
      <div className='res-body'>
        {data?.cars?.map((car,index) => (
            <CardR key={index} title={car.marca+' '+car.model} info={car}/>  
        ))}
      </div>
    </GeneralLayout>
  )
}
