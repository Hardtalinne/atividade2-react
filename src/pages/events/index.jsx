import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Search } from "../../components/Search";
import { Sidebar } from "../../components/Sidebar";
import { getEvents } from "../../services/get-events";
import { Card } from "../../components/Card";
import { Body, Container, List, Nav } from "../../style.global";
import { Info } from "../../components/Info";

export const Events = () => {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const loader = useRef(null);

  const fetchEvents = async (id, value, page) => {
    const data = await getEvents(id, value, page);

    if (id) {
      setEvent(data.results[0]);
    } else if (!page) {
      setEvents(data.results);
    } else {
      setEvents((prevEvents) => [...prevEvents, ...data.results]);
    }
  };

  useEffect(() => {
    id && fetchEvents(id);

    return () => {
      setEvent(null);
      setEvents([]);
      setPage(0);
    };
  }, [id]);

  useEffect(() => {
    fetchEvents(null, null, page);
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
          pageName={event ? event.title : "Events"}
          search={fetchEvents}
          isSearchable={!event}
        />
        <Nav>
          {!event && events && (
            <List>
              {events.map(
                (event, index) =>
                  event.thumbnail?.path.search(/image_not_available/i) ===
                    -1 && (
                    <Card
                      key={index}
                      name={event.title}
                      redirectUrl={`/events/${event.id}`}
                      imageUrl={`${event.thumbnail?.path}/landscape_small.${event.thumbnail?.extension}`}
                    />
                  )
              )}
              {events.length >= 100 && <div ref={loader} />}
            </List>
          )}
          {event && (
            <Info
              item={event}
              urlImage={`${event?.thumbnail.path}/landscape_incredible.${event?.thumbnail.extension}`}
            />
          )}
        </Nav>
      </Body>
    </Container>
  );
};
