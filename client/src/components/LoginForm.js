import React, { useState } from "react";

import Auth from "../utils/auth";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Message,
} from "semantic-ui-react";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    password: "",
  });

  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // TODO Uncomment when mutations are put in
    // try {
    //   const { data } = await login({
    //     variables: { ...userFormData },
    //   });
    //   Auth.login(data.login.token);
    // } catch (e) {
    //   console.error(e);
    // }

    // check if form has everything (as per react-bootstrap docs)

    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Field
          id="form-input-control-username"
          control={Input}
          label="Username"
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <Form.Field
          id="form-input-control-password"
          control={Input}
          label="Password"
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
      </Form.Group>

      <Form.Field
        id="form-button-control-public"
        control={Button}
        content="Submit"
      />
    </Form>
  );
};
export default LoginForm;
