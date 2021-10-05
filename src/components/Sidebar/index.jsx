import React from "react";
import { Container, Divider, Image, Link, Nav } from "./style";

export const Sidebar = () => {
  return (
    <Container>
      <Nav>
        <Image
          src="https://logodownload.org/wp-content/uploads/2017/05/marvel-logo-4.png"
          alt="logo marvel"
        />
        <Divider />
        <Link to="/characters">CHARACTERS</Link>
        <Link to="/comics">COMICS</Link>
        <Link to="/series">SERIES</Link>
        <Link to="/events">EVENTS</Link>
      </Nav>
    </Container>
  );
};
