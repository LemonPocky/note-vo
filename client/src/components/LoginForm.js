import React from "react";
import { Form, Input, TextArea, Button, Select } from "semantic-ui-react";

const LoginForm = () => {
  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Field
          id="form-input-control-username"
          control={Input}
          label="Username"
          placeholder="Username"
        />
        <Form.Field
          id="form-input-control-password"
          control={Input}
          label="Password"
          placeholder="Password"
        />
      </Form.Group>

      <Form.Field
        id="form-input-control-error-email"
        control={Input}
        label="Email"
        placeholder="joe@schmoe.com"
        error={{
          content: "Please enter a valid email address",
          pointing: "below",
        }}
      />
      <Form.Field
        id="form-button-control-public"
        control={Button}
        content="Submit"
      />
    </Form>
  );
};
export default LoginForm;
