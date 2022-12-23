import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from "react-bootstrap/Form";
import {useNavigate } from 'react-router-dom';
import { useAddViaje } from '../../api/viajesApi';
import Correct from '../../components/Correct';
import Error from '../../components/Error';
import GeneralLayout from '../../layouts/GeneralLayout'

export default function AddViaje() {
  const [showError, setShowError] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [agency, setAgency] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const { mutate: mutAddViaje, data, isLoading, isError, error } = useAddViaje();
  
  function validateForm() {
    return agency.length > 0 && origin.length > 0 && destination.length > 0 && days.length > 0 && price.length > 0;
  }


  function handleSubmit(event) {
    event.preventDefault();
    const info = {
      "agency": agency,
      "origin": origin,
      "destination": destination,
      "days": days,
      "price": price,
      "status": 0,
    }
    console.log(info)
    mutAddViaje(info)
    /* setShowCorrect(false);
    setShowError(false);
    if(password !== Cpassword){
      setShowError(true);
    } else{
      //Aqui se hara la petición al backend
      const info = {
        "name": name,
        "user": user,
        "mail": email,
        "password": password,
        "role": typeUser
      }
      console.log(info)
      //mutAddUser(info)
    } */
  }

  return (
    <GeneralLayout logout back="/admin">
        <h2 className="ura-title">
            Crear viaje
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
                autoFocus
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="destination" className="ura-password">
              <Form.Label>Ciudad de destino</Form.Label>
              <Form.Control
                autoFocus
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
              <Button className="SubmitBtn" block="true" size="lg" type="submit" disabled={!validateForm()}>
                Crear viaje
              </Button>
              {/* <div className="signin">
                ¿Ya tienes cuenta? <Link to="/">Log in</Link>
              </div> */}
              <Error msg="Las contraseñas no coinciden" showw={showError}/>
              <Correct msg={"data?.data?.msg"} showw={showCorrect}/>
            </div>
          </Form>
        </div>
    </GeneralLayout>
  )
}
