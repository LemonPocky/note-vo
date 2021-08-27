import React, { useState } from "react";

import Auth from "../utils/auth";
import { Form, Input, Button } from "semantic-ui-react";

const LoginForm = ({ open, setOpen }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [valid, setValid] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleFormSubmit = () => {
    // TODO Uncomment when mutations are put in
    // try {
    //   const { data } = await login({
    //     variables: { ...userFormData },
    //   });

    //   console.log(data);
    //   Auth.login(data.login.token);
    // } catch (e) {
    //   console.error(e);
    // }

    console.log(inputs);
    setOpen(false);
  };
  return (
    <Form>
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
