import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import { useAddCars } from '../../api/carsApi';
import Correct from '../../components/Correct';
import Error from '../../components/Error';
import GeneralLayout from '../../layouts/GeneralLayout'

export default function AddCar() {
  const [showError, setShowError] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  //const typeUser = "turist";
  /* const [typeUser, setTypeUser] = useState("turist");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [ppicture, setPPicture] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState(""); */
  const [agency, setAgency] = useState("");
  const [marca, setMarca] = useState("");
  const [placa, setPlaca] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const { mutate: mutAddCar, data, isLoading, isError, error } = useAddCars();

  function validateForm() {
    return agency.length > 0 && marca.length > 0 && placa.length > 0 && model.length > 0 && price.length > 0 && city.length > 0;
  }

  useEffect(() => {
    if (data) {
      console.log(data?.data);
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
    const info = {
      "agency": agency,
      "marca": marca,
      "placa": placa,
      "model": model,
      "price": price,
      "city": city,
      "status": 0,
    }
    mutAddCar(info)
  }

  return (
    <GeneralLayout logout back="/admin">
      <h2 className="ura-title">
        Agregar carro
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
          <Form.Group size="lg" controlId="marca" className="ura-password">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="destination" className="ura-password">
            <Form.Label>Placa</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="days" className="ura-password">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="price" className="ura-password">
            <Form.Label>Ciudad en la que se encuentra el vehículo</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="price" className="ura-password">
            <Form.Label>Precio</Form.Label>
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
            <Error msg={data?.data?.msg} showw={showError} />
            <Correct msg={data?.data?.msg} showw={showCorrect} />
          </div>
        </Form>
      </div>
    </GeneralLayout>
  )
}
