import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Search } from "../../components/Search";
import { Sidebar } from "../../components/Sidebar";
import { Card } from "../../components/Card";
import { getSeries } from "../../services/get-series";
import { Body, Container, Nav, ListMedium } from "../../style.global";
import { Info } from "../../components/Info";


export const Series = () => {
  const { id } = useParams();
  const [serie, setSerie] = useState();
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(0);
  const [moreData, setMoreData] = useState(true);
  const loader = useRef(null);

  const fetchSeries = async (id, value, page) => {
    const data = await getSeries(id, value, page);

    setMoreData(!(data.offset >= data.total));

    if (id) {
      setSerie(data.results[0]);
    } else if (!page) {
      setSeries(data.results);
    } else {
      setSeries((prevSeries) => [...prevSeries, ...data.results]);
    }
  };

  useEffect(() => {
    id && fetchSeries(id);

    return () => {
      setSerie(null);
      setSeries([]);
      setPage(0);
    };
  }, [id]);

  useEffect(() => {
    fetchSeries(null, null, page);
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
          pageName={serie ? serie.title : "Series"}
          search={fetchSeries}
          isSearchable={!serie}
        />
        <Nav>
          {!serie && series && (
            <ListMedium>
              {series.map(
                (serie, index) =>
                  serie.thumbnail?.path.search(/image_not_available/i) ===
                    -1 && (
                    <Card
                      key={index}
                      name={serie.title}
                      redirectUrl={`/series/${serie.id}`}
                      imageUrl={`${serie.thumbnail?.path}/landscape_small.${serie.thumbnail?.extension}`}
                    />
                  )
              )}
              {moreData && <div ref={loader} />}
            </ListMedium>
          )}
          {serie && (
            <Info
              item={serie}
              urlImage={`${serie.thumbnail?.path}/landscape_incredible.${serie.thumbnail?.extension}`}
            />
          )}
        </Nav>
      </Body>
    </Container>
  );
};
