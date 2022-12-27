import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import "../styles/views/Login.css";
import { Link, useNavigate } from "react-router-dom";
import GeneralLayout from "../layouts/GeneralLayout";
import { useUserLogin } from "../api/usersApi";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import Error from "../components/Error";

const queryClient = new QueryClient();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const useGetFetchQuery = (name) => {
    const queryClient = useQueryClient();

    return queryClient.getQueryData(name);
  };

  const { mutate: mutLogin, data, isLoading, isError, error } = useUserLogin();
  const dataU  = useGetFetchQuery('user');

  /* useEffect(() => {
    console.log(dataU?.data?.usuario);
    if(dataU){
      if (dataU.data.usuario.role === "admin") {
        navigate("/admin");
      } else if (dataU.data.usuario.role === "turist") {
        navigate("/user");
      } else if (dataU.data.usuario.role === "recepcionist") {
        navigate("/recepcionist");
      }
    }
  }, []) */

  useEffect(() => {
    if (data) {
      if (data.data.status === 1) {
        setShowError(false);
        if (data.data.usuario.role === "admin") {
          navigate("/admin");
        } else if (data.data.usuario.role === "turist") {
          navigate("/user");
        } else if (data.data.usuario.role === "recepcionist") {
          navigate("/recepcionist");
        }
      } else {
        setShowError(true);
      }
    }
  }, [data])
  
  function handleSubmit(event) {
    event.preventDefault();
    queryClient.invalidateQueries('user');
    setShowError(false);
    const info = {
      "user": email,
      "password": password,
    }
    mutLogin(info)
    /* console.log(data.data.status); */
    /* if (data) {
      if (data.data.status === 1) {
        setShowError(false);
        if (data.data.usuario.role === "admin") {
          navigate("/admin");
        } else if (data.data.usuario.role === "turist") {
          navigate("/user");
        } else if (data.data.usuario.role === "recepcionist") {
          navigate("/recepcionist");
        }
      } else {
        setShowError(true);
      }
    } */
  }

  return (
    <GeneralLayout>
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
            <Error msg={data?.data?.msg} showw={showError} />
          </div>
        </Form>
      </div>
    </GeneralLayout>
  );
}
