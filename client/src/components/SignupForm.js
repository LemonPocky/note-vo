import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { Form, Input, Button, Message } from "semantic-ui-react";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  // set initial form state
  const [inputs, setinputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setinputs({ ...inputs, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...inputs },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setinputs({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      {showAlert && (
        <Message
          color="red"
          onDismiss={() => setShowAlert(false)}
          header="Authentication Error"
          content="Something went wrong with your signup!"
        />
      )}
      <Form.Group widths="equal">
        <Form.Field
          id="form-input-control-username"
          control={Input}
          label="Username"
          placeholder="Username"
          name="username"
          value={inputs.username}
          onChange={(event) => handleInputChange(event)}
          required
        />
        <Form.Field
          id="form-input-control-password"
          control={Input}
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={(event) => handleInputChange(event)}
          required
        />
      </Form.Group>

      <Form.Field
        id="form-input-control-error-email"
        control={Input}
        label="Email"
        name="email"
        value={inputs.email}
        onChange={(event) => handleInputChange(event)}
        required
      />
      <Form.Field
        id="form-button-control-public"
        control={Button}
        content="Submit"
        onClick={handleFormSubmit}
      />
    </Form>
  );
};
export default SignupForm;
