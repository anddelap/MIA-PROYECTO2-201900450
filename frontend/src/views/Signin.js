import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "../styles/views/Login.css";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import GeneralLayout from "../layouts/GeneralLayout";

//EN SIGN IN SOLO SE PUEDEN REGISTRAR TURISTAS

export default function Signin() {
  const [showError, setShowError] = useState(false);
  const typeUser = "turista";
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [ppicture, setPPicture] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && name.length > 0 && user.length > 0 && Cpassword.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setShowError(false);
    if(password !== Cpassword){
      setShowError(true);
    } else{
      //Aqui se hara la petición al backend
      console.log(name);
      console.log(user);
      console.log(ppicture);
      console.log(email);
      console.log(password);
      console.log(Cpassword);
      console.log(typeUser);
    }
  }

  return (
    <GeneralLayout>
      <h2 className="title">
            Sign in
      </h2>
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="usuario">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password" className="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password" className="password">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              value={Cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </Form.Group>
          <div className="btns">
            <Button className="SubmitBtn" block="true" size="lg" type="submit" disabled={!validateForm()}>
              Sign in
            </Button>
            <div className="signin">
              ¿Ya tienes cuenta? <Link to="/">Log in</Link>
            </div>
            <Error msg="Las contraseñas no coinciden" showw={showError}/>
          </div>
        </Form>
      </div>
    </GeneralLayout>
  );
}
