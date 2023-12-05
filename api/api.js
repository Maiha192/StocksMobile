// Import necessary dependencies
import { useEffect, useState } from "react";

// Key for fetching data from API
const API_KEY = "1oeViSb1Ke71OdGDjnuVF2G8pYJbOmtb313DyxUL";

// Function to fetch data from API
export async function getData(url) {
  let res = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
    },
  });
  let data = await res.json();
  return data;
}

// Hook to set loading/data/error state
export function useData(url) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await getData(url);
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [url]);

  return {
    loading,
    data,
    error,
  };
}
