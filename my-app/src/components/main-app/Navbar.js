import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import eventLogo from "../../styles/eventLogo.png";
import { LinksDiv, Links, Nav, Logo, H1 } from "../../styles";

function NavBar() {
  return (
    <Nav>
      <Logo>
        <Links to="/">Home</Links>
      </Logo>
      <H1>Potluck Planner</H1>
      <LinksDiv>
        <Links to="/login">Log In</Links>
        <Links to="/signup">Sign Up</Links>
      </LinksDiv>
    </Nav>
  );
}

export default NavBar;
