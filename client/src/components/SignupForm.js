import React, { Component } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, TextArea, Button, Select } from "semantic-ui-react";
import Auth from "../utils/auth";

import { Grid, Column } from "semantic-ui-react";

class SignupForm extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    submittedName: "",
    submittedEmail: "",
  };

  handleChange = (e, { name, password, value }) =>
    this.setState({ [name]: value });

  handleSubmit = () => {
    const { name, password, email } = this.state;

    this.setState({
      submittedName: name,
      submittedPassword: password,
      submittedEmail: email,
    });
  };

  SignupForm = () => {
    const {
      username,
      password,
      email,
      submittedName,
      submittedPassword,
      submittedEmail,
    } = this.state;
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
}

export default SignupForm;
