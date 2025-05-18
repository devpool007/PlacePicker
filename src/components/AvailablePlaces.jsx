import ErrorPage from "./Error.jsx";
import Places from "./Places.jsx";
import { useState, useEffect } from "react";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false); // Loading State
  const [availablePlaces, setAvailablePlaces] = useState([]); // Data State
  const [error, setError] = useState(null); // Error State

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();
        if (!response.ok) {
          throw new Error("Could not fetch places.");
          console.log(response.status);
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({ message: error.message || "Could not fetch places." });
      }
      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="Error" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
