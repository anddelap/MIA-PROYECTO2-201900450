import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from "react-bootstrap/Form";
import Correct from '../../components/Correct';
import Error from '../../components/Error';
import GeneralLayout from '../../layouts/GeneralLayout'

export default function DeleteUserAdmin() {
  const [showError, setShowError] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [user, setUser] = useState("");

  function validateForm() {
    return user.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setShowCorrect(false);
    setShowError(false);
    //Aqui se hara la petición al backend
    const info = {
      "user": user
    }
    console.log(info)
    //mutAddUser(info)
  }

  return (
    <GeneralLayout logout back="/admin">
        <h2 className="ura-title">
              Eliminar usuario
        </h2>
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="name" className="ura-name">
              <Form.Label>Usuario de quien se eliminara</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>
            
            <div className="btns">
              <Button className="SubmitBtn" block="true" size="lg" type="submit" variant="danger" disabled={!validateForm()}>
                Eliminar
              </Button>
              {/* <div className="signin">
                ¿Ya tienes cuenta? <Link to="/">Log in</Link>
              </div> */}
              <Error msg={"data?.data?.msg"}  showw={showError}/>
              <Correct msg={"data?.data?.msg"} showw={showCorrect}/>
            </div>
          </Form>
        </div>
        
      </GeneralLayout>
  )
}
