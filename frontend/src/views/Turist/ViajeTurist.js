import React from 'react'
import { useQuery } from 'react-query'
import { getViajes } from '../../api/viajesApi'
import Card from '../../components/Card'
import GeneralLayout from '../../layouts/GeneralLayout'

export default function ViajeTurist() {
  const {data, isLoading, error} = useQuery('viajes', getViajes)
  //console.log(data)
  if(isLoading){
    return <h1>Loading...</h1>
  }
  return (
    <GeneralLayout logout back="/user">
      <h2 className="ura-title">
        Reservar viaje
      </h2>
      <div className='res-body'>
        {data?.viajes?.map((viaje,index) => (
            <Card key={index} title={viaje.origin+' - '+viaje.destination} info={viaje}/>  
        ))}
      </div>
    </GeneralLayout>
  )
}
