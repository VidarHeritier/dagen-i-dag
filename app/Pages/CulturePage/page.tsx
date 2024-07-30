import React, { useEffect, useState } from "react";
import Heading from "../Heading/page";
import axios from "axios";

interface EventImage {
  url: string;
}

interface Event {
  id: string;
  name: string;
  dates: {
    start: {
      localDate: string;
      localTime?: string;
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
    attractions?: {
      images?: EventImage[];
    }[];
  };
  classifications: {
    segment: {
      name: string;
    };
    genre: {
      name: string;
    };
  }[];
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
    return (
      <div className="flex justify-center items-center h-screen">
        <Heading>Loading...</Heading>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Heading>Error: {error}</Heading>
      </div>
    );
  }

  const limitedEvents = events.slice(0, 6); // Limit to 6 events

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Heading>Opplevelser nær deg</Heading>

      {limitedEvents.length > 0 ? (
        <ul className="w-full max-w-4xl">
          {limitedEvents.map((event) => (
            <li
              key={event.id}
              className="flex items-center mb-4 border-red-700 border-b-2"
            >
              {/* Image */}
              {event._embedded.attractions?.[0]?.images?.[0]?.url && (
                <img
                  src={event._embedded.attractions[0].images[0].url}
                  alt={event.name}
                  className="w-32 h-32 object-cover mr-10 mb-6 rounded-xl border-double border-8 border-black"
                />
              )}

              {/* Text content */}
              <div className="flex flex-col -mt-6">
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  <div className="font-bold text-lg mb-4 drop-shadow-sm text-black">
                    {event.name}
                  </div>
                  {event.classifications.length > 0 && (
                    <>
                      <div>
                        {event.classifications[0].segment.name}
                        {","} {event.classifications[0].genre.name}
                      </div>
                    </>
                  )}
                  <div>
                    {formatDate(event.dates.start.localDate)}
                    {event.dates.start.localTime
                      ? `, ${event.dates.start.localTime.slice(0, 5)}`
                      : ""}
                  </div>
                  <div>{event._embedded.venues[0].name} </div>
                  <div>{event._embedded.venues[0].city.name}</div>
                </a>
              </div>
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
