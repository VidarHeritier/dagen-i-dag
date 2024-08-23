"use client";

import { useState } from "react";

const ManualLocationEntry = ({
  onSubmit,
}: {
  onSubmit: (location: { city: string; country: string }) => void;
}) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ city, country });
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 flex justify-center">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
        className="mr-6 rounded-sm text-black px-2"
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
        required
        className="mr-6 rounded-sm text-black px-2"
      />
      <button type="submit" className="mr-6 rounded-sm bg-green-900 px-4">
        Submit
      </button>
    </form>
  );
};
export default ManualLocationEntry;
