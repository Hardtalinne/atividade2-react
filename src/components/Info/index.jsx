import {
  Column,
  Container,
  Description,
  GridColumns,
  Heading,
  Image,
  Text,
} from "./style";

export const Info = ({ item, urlImage }) => {
  return (
    <Container>
      <Image
        src={urlImage}
        alt={item?.title}
      />
      <Heading>{item.title}</Heading>
      <Text>Description</Text>
      <Description>{item?.description}</Description>
      <GridColumns>
        <Column>
          STORIES
          {item?.stories.items.map((storie) => (
            <Text>{storie.name}</Text>
          ))}
        </Column>
      </GridColumns>
    </Container>
  );
};
