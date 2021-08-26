import React, { Component } from "react";
import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";

import { Form } from "semantic-ui-react";

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

  render() {
    const {
      username,
      password,
      email,
      submittedName,
      submittedPassword,
      submittedEmail,
    } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Username"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <Form.Button content="Submit" />
          </Form.Group>
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ username, password, email }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>
          {JSON.stringify(
            { submittedName, submittedPassword, submittedEmail },
            null,
            2
          )}
        </pre>
      </div>
    );
  }
}

export default SignupForm;
