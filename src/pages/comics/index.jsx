import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Search } from "../../components/Search";
import { Sidebar } from "../../components/Sidebar";
import { getComics } from "../../services/get-comics";
import { Card } from "../../components/Card";
import { Body, Container, Nav, ListMedium } from "../../style.global";
import { Info } from "../../components/Info";

export const Comics = () => {
  const { id } = useParams();
  const [comic, setComic] = useState();
  const [comics, setComics] = useState([]);
  const [page, setPage] = useState(0);
  const [moreData, setMoreData] = useState(true);
  const loader = useRef(null);

  const fetchComics = async (id, value, page) => {
    const data = await getComics(id, value, page);

    setMoreData(!(data.offset >= data.total));

    if (id) {
      setComic(data.results[0]);
    } else if (!page) {
      setComics(data.results);
    } else {
      setComics((prevComics) => [...prevComics, ...data.results]);
    }
  };

  useEffect(() => {
    id && fetchComics(id);

    return () => {
      setComic(null);
      setComics([]);
      setPage(0);
    };
  }, [id]);

  useEffect(() => {
    fetchComics(null, null, page);
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
          pageName={comic ? comic.title : "Comics"}
          search={fetchComics}
          isSearchable={!comic}
        />
        <Nav>
          {!comic && comics && (
            <ListMedium>
              {comics.map(
                (comic, index) =>
                  comic.thumbnail?.path.search(/image_not_available/i) ===
                    -1 && (
                    <Card
                      key={index}
                      name={comic.title}
                      redirectUrl={`/comics/${comic.id}`}
                      imageUrl={`${comic.thumbnail?.path}/landscape_small.${comic.thumbnail?.extension}`}
                    />
                  )
              )}
              {moreData && <div ref={loader} />}
            </ListMedium>
          )}
          {comic && (
            <Info
              item={comic}
              urlImage={`${comic.thumbnail?.path}/landscape_incredible.${comic.thumbnail?.extension}`}
            />
          )}
        </Nav>
      </Body>
    </Container>
  );
};
