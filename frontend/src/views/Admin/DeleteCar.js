import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from "react-bootstrap/Form";
import { useDeleteCar } from '../../api/carsApi';
import Correct from '../../components/Correct';
import Error from '../../components/Error';
import GeneralLayout from '../../layouts/GeneralLayout'

export default function DeleteCar() {
  const [showError, setShowError] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [car, setCar] = useState("");

  function validateForm() {
    return car.length > 0;
  }

  const { mutate: mutDeletCar, data, isLoading, isError, error } = useDeleteCar();

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
    //Aqui se hara la petición al backend
    const info = {
      "placa": car
    }
    //console.log(info)
    mutDeletCar(info)
  }


  return (
    <GeneralLayout logout back="/admin">
        <h2 className="ura-title">
            Eliminar carro
        </h2>
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="name" className="ura-name">
              <Form.Label>Placa del carro se eliminara</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={car}
                onChange={(e) => setCar(e.target.value)}
              />
            </Form.Group>
            
            <div className="btns">
              <Button className="SubmitBtn" block="true" size="lg" type="submit" variant="danger" disabled={!validateForm()}>
                Eliminar
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
