import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from "react-bootstrap/Form";
import { useDeleteViaje } from '../../api/viajesApi';
import Correct from '../../components/Correct';
import Error from '../../components/Error';
import GeneralLayout from '../../layouts/GeneralLayout'

export default function DeleteViaje() {
  const [showError, setShowError] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [agency, setAgency] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");
  const { mutate: mutDeleteViaje, data, isLoading, isError, error } = useDeleteViaje();
  
  function validateForm() {
    return agency.length > 0 && origin.length > 0 && destination.length > 0 && days.length > 0 && price.length > 0;
  }

  useEffect(() => {
    if (data) {
      //console.log(data?.data);
      if (data.data.status === 1) {
        setShowError(false);
        setShowCorrect(true);
        //navigate("/")
      } else {
        setShowError(true);
      }
    }
  }, [data])

  function handleSubmit(event) {
    event.preventDefault();
    setShowCorrect(false);
    setShowError(false);
    const info = {
      "agency": agency,
      "origin": origin,
      "destination": destination,
      "days": days,
      "price": price
    }
    console.log(info)
    mutDeleteViaje(info)
  }

  return (
    <GeneralLayout logout back="/admin">
      <h2 className="ura-title">
        Eliminar viaje
      </h2>
      <div className="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="agency" className="ura-name">
              <Form.Label>Nombre de la agencia</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="origin" className="ura-password">
              <Form.Label>Ciudad de origen</Form.Label>
              <Form.Control
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="destination" className="ura-password">
              <Form.Label>Ciudad de destino</Form.Label>
              <Form.Control
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="days" className="ura-password">
              <Form.Label>Dias de vuelo</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="price" className="ura-password">
              <Form.Label>Precio de vuelo</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <div className="btns">
              <Button className="SubmitBtn" block="true" size="lg" type="submit" variant="danger" disabled={!validateForm()}>
                Eliminar viaje
              </Button>
              {/* <div className="signin">
                ¿Ya tienes cuenta? <Link to="/">Log in</Link>
              </div> */}
              <Error msg={data?.data?.msg}  showw={showError}/>
              <Correct msg={data?.data?.msg} showw={showCorrect}/>
            </div>
          </Form>
        </div>
    </GeneralLayout>
  )
}
