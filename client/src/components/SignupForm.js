import React, { useState } from "react";

import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Message,
} from "semantic-ui-react";

const SignupForm = ({ open, setOpen }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [validEmail, setValidEmail] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleFormSubmit = () => {
    const validEmail = validateEmail(inputs.email);
    if (!validEmail) {
      setValidEmail("error");

      return;
    } else {
      setValidEmail("");
    }
    console.log(validEmail);
    setOpen(false);
  };

  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Field
          id="form-input-control-username"
          control={Input}
          label="Username"
          placeholder="Username"
          name="username"
          value={inputs.username}
          onChange={(event) => handleInputChange(event)}
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
        />
      </Form.Group>

      <Form.Field
        id="form-input-control-error-email"
        control={Input}
        label="Email"
        name="email"
        value={inputs.email}
        onChange={(event) => handleInputChange(event)}
        // className={`${validateEmail(inputs.email) ? "" : "error"}`}
        className={validEmail}
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
