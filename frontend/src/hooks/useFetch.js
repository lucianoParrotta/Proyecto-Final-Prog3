import { useEffect, useState } from "react";
import api from "../services/axios";

function useFetch(endpoint) {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(endpoint);
        if (isMounted) {
          setData(response.data ?? []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error en useFetch:", err);
          setError(err);
          setData([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}

export default useFetch;
