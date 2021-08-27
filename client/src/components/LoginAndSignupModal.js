import React, { useState } from "react";
import { Button, Header, Image, Modal, Message } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function LoginAndSignupModal({ open, setOpen }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        // trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>{showLogin ? "Login" : "Signup"}</Modal.Header>
        <Modal.Content>
          {showLogin ? (
            <LoginForm />
          ) : (
            <SignupForm open={open} setOpen={setOpen} />
          )}
          <Message>
            {showLogin ? "New to us? " : "Already have an account? "}

            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => setShowLogin((prevState) => !prevState)}
            >
              {showLogin ? "Sign up" : "Login"} Here
            </button>
          </Message>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default LoginAndSignupModal;
