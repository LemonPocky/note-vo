import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function ModalExampleModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Please Login or Signup</Modal.Header>
        <Modal.Content image>
          <LoginForm />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default ModalExampleModal;
