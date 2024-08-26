"use client";

import React, { useState } from "react";

interface ManualLocationEntryProps {
  onSubmit: (location: { city: string; country: string }) => void;
}

const ManualLocationEntry: React.FC<ManualLocationEntryProps> = ({
  onSubmit,
}) => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      <button
        type="submit"
        className="mr-6 rounded-sm bg-green-900 px-4 text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default ManualLocationEntry;
