import { Sidebar } from "../../components/Sidebar";
import { Container, Body, Navbar } from "../../style.global";

export const Home = () => {
  return (
    <Container>
      <Sidebar />
      <Body>
        <Navbar />
      </Body>
    </Container>
  );
};
