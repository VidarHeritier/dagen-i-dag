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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};
export default ManualLocationEntry;
