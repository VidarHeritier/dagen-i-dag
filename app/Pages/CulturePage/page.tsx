import React, { useEffect, useState } from "react";
import Heading from "../Heading/page";
import axios from "axios";

interface Event {
  name: string;
  dates: {
    start: {
      localDate: string;
    };
  };
  url: string;
  _embedded: {
    venues: {
      name: string;
      city: {
        name: string;
      };
    }[];
  };
}

const CulturePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;
  const city = "Bergen";

  useEffect(() => {
    if (!apiKey) {
      console.error("API key is missing.");
      setError("API key is missing.");
      setLoading(false);
      return;
    }

    const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data._embedded && response.data._embedded.events) {
          setEvents(response.data._embedded.events);
        } else {
          setError("No events found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching events data:",
          error.response?.data || error.message
        );
        setError(
          error.response?.data?.message ||
            "An error occurred while fetching events data."
        );
        setLoading(false);
      });
  }, [city, apiKey]);

  if (loading) {
    return <Heading>Loading...</Heading>;
  }

  if (error) {
    return <Heading>Error: {error}</Heading>;
  }

  return (
    <div>
      <Heading>Opplevelser nær deg</Heading>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.url}>
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                {event.name} - {event.dates.start.localDate} -{" "}
                {event._embedded.venues[0].name},{" "}
                {event._embedded.venues[0].city.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default CulturePage;
