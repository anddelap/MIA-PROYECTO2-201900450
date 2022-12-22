import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from "react-bootstrap/Form";
import {useNavigate } from 'react-router-dom';
import Correct from '../../components/Correct';
import Error from '../../components/Error';
import GeneralLayout from '../../layouts/GeneralLayout'

export default function AddCar() {
  const [showError, setShowError] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  //const typeUser = "turist";
  const [typeUser, setTypeUser] = useState("turist");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [ppicture, setPPicture] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
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
            Agregar carro
        </h2>
        <div className="Login">
          <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="name" className="ura-name">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="usuario" className="ura-password">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="email" className="ura-password">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password" className="ura-password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password" className="ura-password">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                value={Cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="role"  className="ura-password">
                <Form.Label>Rol</Form.Label>
                <Form.Select as="select" value={typeUser} onChange={(e) => setTypeUser(e.target.value)}>
                    <option value="turist">Turista</option>
                    <option value="recepcionist">Recepcionista</option>
                    <option value="admin">Administrador</option>

                </Form.Select>
            </Form.Group>
            <div className="btns">
              <Button className="SubmitBtn" block="true" size="lg" type="submit">
                Crear usuario
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
