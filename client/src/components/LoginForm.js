import React, { useState, useEffect } from "react";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Form, Input, Button, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
const LoginForm = ({ open, setOpen }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // TODO Uncomment when mutations are put in

    try {
      const { data } = await login({
        variables: { ...inputs },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    console.log(inputs);
    setOpen(false);
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      {showAlert && (
        <Message
          color="red"
          onDismiss={() => setShowAlert(false)}
          header="Authentication Error"
          content="Something went wrong with your login credentials!"
        />
      )}

      <Form.Group widths="equal">
        <Form.Field
          id="form-input-control-username"
          control={Input}
          label="Username"
          name="username"
          value={inputs.username}
          onChange={(event) => handleInputChange(event)}
          placeholder="Username"
          required
        />
        <Form.Field
          id="form-input-control-password"
          control={Input}
          label="Password"
          type="password"
          name="password"
          value={inputs.password}
          onChange={(event) => handleInputChange(event)}
          placeholder="Password"
          required
        />
      </Form.Group>

      <Form.Field
        id="form-button-control-public"
        control={Button}
        content="Submit"
        onClick={handleFormSubmit}
      />
    </Form>
  );
};
export default LoginForm;
