import { useHistory } from "react-router";
import { Container, Text, Image } from "./style";

export const Card = ({ name, redirectUrl, imageUrl }) => {
  let history = useHistory();

  function handleClick() {
    history.push(redirectUrl);
  }

  return (
    <Container onClick={handleClick}>
      <Image src={imageUrl} alt={name} />
      <Text>{name}</Text>
    </Container>
  );
};
