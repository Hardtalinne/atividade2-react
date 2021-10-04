import {
  Column,
  Container,
  Description,
  GridColumns,
  Heading,
  Image,
  Text,
} from "./style";

export const CharacterInfo = ({ item, urlImage }) => {
  return (
    <Container>
      <Image
        src={urlImage}
        alt={item?.name}
      />
      <Heading>{item.name}</Heading>
      <Text>Description</Text>
      <Description>{item?.description}</Description>
      <GridColumns>
        <Column>
          COMICS
          {item?.comics.items.map((comic) => (
            <Text>{comic.name}</Text>
          ))}
        </Column>
        <Column>
          EVENTS
          {item?.events.items.map((event) => (
            <Text>{event.name}</Text>
          ))}
        </Column>
        <Column>
          SERIES
          {item?.series.items.map((serie) => (
            <Text>{serie.name}</Text>
          ))}
        </Column>
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
