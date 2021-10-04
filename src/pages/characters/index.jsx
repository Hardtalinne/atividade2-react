import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Search } from "../../components/Search";
import { Sidebar } from "../../components/Sidebar";
import { getCharacters } from "../../services/get-characters";
import { Card } from "../../components/Card";
import { CharacterInfo } from "../../components/CharacterInfo";
import { Body, Container, List, Nav } from "../../style.global";

export const Characters = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState();
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(0);
  const loader = useRef(null);

  const fetchCharacters = async (id, value, page) => {
    const data = await getCharacters(id, value, page);

    if (id) {
      setCharacter(data.results[0]);
    } else if (!page) {
      setCharacters(data.results);
    } else {
      setCharacters((prevCharactes) => [...prevCharactes, ...data.results]);
    }
  };

  useEffect(() => {
    id && fetchCharacters(id);

    return () => {
      setCharacter(null);
      setCharacters([]);
      setPage(0);
    };
  }, [id]);

  useEffect(() => {
    fetchCharacters(null, null, page);
  }, [page]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 100);
    }
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, []);

  return (
    <Container>
      <Sidebar />
      <Body>
        <Search
          pageName={character ? character.name : "Characters"}
          search={fetchCharacters}
          isSearchable={!character}
        />
        <Nav>
          {!character && characters && (
            <List>
              {characters.map(
                (character, index) =>
                  character.thumbnail?.path.search(/image_not_available/i) ===
                    -1 && (
                    <Card
                      key={index}
                      name={character.name}
                      redirectUrl={`characters/${character.id}`}
                      imageUrl={`${character.thumbnail?.path}/landscape_small.${character.thumbnail?.extension}`}
                    />
                  )
              )}
              {characters.length >= 100 && <div ref={loader} />}
            </List>
          )}
          {character && (
            <CharacterInfo
              item={character}
              urlImage={`${character.thumbnail?.path}/landscape_incredible.${character.thumbnail?.extension}`}
            />
          )}
        </Nav>
      </Body>
    </Container>
  );
};
