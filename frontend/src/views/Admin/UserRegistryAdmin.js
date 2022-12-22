import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "../../styles/views/Admin/UserRegistryAdmin.css";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/Error";
import GeneralLayout from "../../layouts/GeneralLayout";
import { useAddUser } from "../../api/usersApi";
import Correct from "../../components/Correct";
import {BsArrowLeft} from "react-icons/bs";

// REGISTRO DE USUARIOS DEL ADMINISTRADOR
export default function UserRegistryAdmin() {
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
  
    function validateForm() {
      return email.length > 0 && password.length > 0 && name.length > 0 && user.length > 0 && Cpassword.length > 0;
    }
  
    const { mutate: mutAddUser, data, isLoading, isError, error } = useAddUser();
  
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
      setShowCorrect(false);
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
        //console.log(info)
        mutAddUser(info)
      }
    }
  
    return (
      <GeneralLayout logout back="/admin">
        <h2 className="ura-title">
            Registrar usuario
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
              <Button className="SubmitBtn" block="true" size="lg" type="submit" disabled={!validateForm()}>
                Crear usuario
              </Button>
              {/* <div className="signin">
                ¿Ya tienes cuenta? <Link to="/">Log in</Link>
              </div> */}
              <Error msg="Las contraseñas no coinciden" showw={showError}/>
              <Correct msg={data?.data?.msg} showw={showCorrect}/>
            </div>
          </Form>
        </div>
      </GeneralLayout>
    );
}
