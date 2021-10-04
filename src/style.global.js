import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Body = styled.div`
  width: 100%;
`;

export const List = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
`;

export const Nav = styled.div`
  margin: 20px;
`;

export const Main = styled.div``;

export const Text = styled.h3`

`;

export const Navbar = styled.div`
    width: 100%;
    height: 80px;
    background-color: #EC1D24;
`;