import { Link as LinkRouter } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  width: 15%;
  height: 100vh;
`;

export const Link = styled(LinkRouter)`
  text-decoration: none;
  color: #ec1d24;
  font-size: 32px;
  font-family: Teko, sans-serif;
`;

export const Divider = styled.hr`
  background-color: #ddd;
  border: none;
  margin-bottom: 10px;
  height: 1px;
  width: 100%;
`;

export const Image = styled.img`
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
