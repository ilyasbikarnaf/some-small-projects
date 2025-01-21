import { useEffect, useState } from "react";

export function useFetch(url, options) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    async function getData(url, options = {}) {
      try {
        setIsLoading(true);
        setData([]);
        setIsError(null);
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Error during data fetching");
        console.log("whasap");
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        setIsError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData(url, options);

    return () => {
      controller.abort();
    };
  }, [url]);

  return { isLoading, isError, data };
}
