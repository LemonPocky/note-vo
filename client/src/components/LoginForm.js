import React from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Message,
} from "semantic-ui-react";

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
        id="form-button-control-public"
        control={Button}
        content="Submit"
      />
    </Form>
  );
};
export default LoginForm;
