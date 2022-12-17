import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "../styles/views/Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(email)
    console.log(password)
  }

  return (
    <>
    <Navbar bg="dark">
      <Navbar.Brand href="#home">
        <h2 className="brand">
          Proyecto 2
        </h2>
      </Navbar.Brand>
    </Navbar>
    <h2 className="title">
          Log in
    </h2>
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email / Usuario</Form.Label>
          <Form.Control
            autoFocus
            type="user"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password" className="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="btns">
          <Button className="SubmitBtn" block="true" size="lg" type="submit" disabled={!validateForm()}>
            Log in
          </Button>
          <div className="signin">
            ¿No tienes cuenta? <Link to="signin">Sign in</Link>
          </div>
        </div>
      </Form>
    </div>
    </>
  );
}
