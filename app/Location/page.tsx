import React, { useState } from "react";
import useGeolocation from "./IP/page";
import useBrowserGeolocation from "./Computer/page";
import ManualLocationEntry from "./Manual/page";

const LocationComponent: React.FC = () => {
  const { location: ipLocation, error: ipError } = useGeolocation();
  const {
    location: preciseLocation,
    error: geoError,
    getLocation,
  } = useBrowserGeolocation();
  const [userLocation, setUserLocation] = useState<{
    city: string;
    country: string;
  } | null>(ipLocation);

  const handleManualSubmit = (location: { city: string; country: string }) => {
    setUserLocation(location);
  };

  return (
    <div>
      {userLocation ? (
        <div>
          <p>
            Location: {userLocation.city}, {userLocation.country}
          </p>
        </div>
      ) : (
        <div>
          {ipError && <p>Error fetching IP-based location: {ipError}</p>}
          {geoError && <p>{geoError}</p>}
          <button onClick={getLocation}>Get precise location</button>
          <ManualLocationEntry onSubmit={handleManualSubmit} />
        </div>
      )}
    </div>
  );
};

export default LocationComponent;
