import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });

  const [login, { error, data }] = useMutation();

  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // check if form has everything (as per react-bootstrap docs)

    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      <form class="ui form">
        <div class="field">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username"></input>
        </div>{" "}
        <div class="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password"></input>
        </div>
      </form>
      ;
    </>
  );
};

export default LoginForm;
