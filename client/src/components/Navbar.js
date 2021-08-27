import React, { useState } from "react";
import { Menu, Modal, Message, Button } from "semantic-ui-react";
import LoginAndSignupModal from "./LoginAndSignupModal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Auth from "../utils/auth";

const Navbar = () => {
  // Highlights the currently active link
  const [activeLink, updateActive] = useState("Homepage");
  const [open, setOpen] = useState(false);
  const handleItemClick = (e, { name }) => {
    updateActive(name);
  };

  // Logout and navigate back to homepage
  const logout = () => {
    Auth.logout();
    updateActive("noteVo");
  };

  // Render different links depending on login status
  let navigationLinks;
  if (Auth.loggedIn()) {
    navigationLinks = (
      <>
        <Menu.Item
          name="myProfile"
          active={activeLink === "myProfile"}
          //TODO: handle link to own profile?
          href="/profile"
          position="right"
          onClick={handleItemClick}
        />
        <Menu.Item
          name="logOut"
          active={activeLink === "logOut"}
          onClick={logout}
        />
      </>
    );
  } else {
    navigationLinks = (
      <Menu.Item
        name="login"
        active={activeLink === "login"}
        position="right"
        onClick={() => setOpen(true)}
      >
        Log In/Sign Up
      </Menu.Item>
    );
  }

  return (
    <>
      <Menu size="huge" color="teal" inverted stackable>
        <Menu.Item header name="noteVo" href="/" onClick={handleItemClick}>
          NoteVo
        </Menu.Item>
        {navigationLinks}
      </Menu>

      <LoginAndSignupModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
