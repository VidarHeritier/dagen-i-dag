"use client";

import React, { useEffect, useState } from "react";
import Heading from "../Heading/page";
import axios from "axios";
import Image from "next/image";

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

interface CulturePageProps {
  location: { city: string; country: string };
}

const CulturePage: React.FC<CulturePageProps> = ({ location }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;
  const city = location.city;

  const fetchEvents = async (retries: number = 3, delay: number = 1000) => {
    try {
      if (!apiKey) {
        throw new Error("API key is missing.");
      }

      const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}`;

      const response = await axios.get(apiUrl);

      if (response.data._embedded && response.data._embedded.events) {
        setEvents(response.data._embedded.events);
      } else {
        setError("No events found.");
      }
      setLoading(false);
    } catch (err) {
      if (err instanceof axios.AxiosError) {
        if (err.response && err.response.status === 429 && retries > 0) {
          setTimeout(() => {
            fetchEvents(retries - 1, delay * 2);
          }, delay);
        } else {
          setError(
            err.response?.data?.message ||
              "An error occurred while fetching events data."
          );
          setLoading(false);
        }
      } else if (err instanceof Error) {
        setError(err.message);
        setLoading(false);
      } else {
        setError("An unknown error occurred.");
        setLoading(false);
      }
    }
  };

  const limitedEvents = events.slice(0, 6);

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
              className="flex items-center mb-4 border-red-600 border-b-2"
            >
              {/* Image */}
              {event._embedded.attractions?.[0]?.images?.[0]?.url && (
                <Image
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
