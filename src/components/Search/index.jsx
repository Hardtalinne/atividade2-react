import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Container, Divider, Input, Nav, Text } from "./style";

export const Search = ({ pageName, search, isSearchable = true }) => {
  const [value, setValue] = useState("");

  const handleInput = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    search(null, value);
  }, [value]);

  return (
    <Container>
      {isSearchable ? (
        <Nav>
          <Text>{pageName}</Text>
          <Divider />
          <Input type="text" value={value} onChange={handleInput} />
          <BiSearchAlt color="white" size="40" />
        </Nav>
      ) : (
        <Nav>
          <Text>{pageName}</Text>
        </Nav>
      )}
    </Container>
  );
};
