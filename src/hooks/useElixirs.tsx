import { useEffect, useState } from "react";
import { Elixir } from "../pages/Elixirs/Elixirs.type";

const useElixirs = () => {
  const [elixirsData, setElixirsData] = useState<Elixir[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [page, setPage] = useState<{ current: number; pageSize: number }>({
    current: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<Record<string, string | number>>({
    name: "",
    difficulty: "",
    ingredient: "",
    inventorFullName: "",
    manufacturer: "",
  });

  const constructQueryParams = (filters: Record<string, string | number>) => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) query.append(key, String(value)); 
    });
    return query.toString();
  };
  const fetchElixirs = async (filters?:Record<string,string|number>) => {
    setLoading(true);
    setError(null);
    const queryParams = constructQueryParams(filters ?? {});
    const url = `https://wizard-world-api.herokuapp.com/Elixirs${
      queryParams ? `?${queryParams}` : ""
    }`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setElixirsData(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchElixirs();
  }, []);

  const handleApplyFilters = (filter:Record<string, string | number>) => {
    fetchElixirs(filter);
    setPage({ ...page, current: 1 });
  };

  const handleResetFilters = () => {
    setFilters({
      name: "",
      difficulty: "",
      ingredient: "",
      inventorFullName: "",
      manufacturer: "",
    });
    fetchElixirs();
    setPage({ ...page, current: 1 });
  };

  return {
    elixirsData,
    loading,
    error,
    filters,
    setFilters,
    handleApplyFilters,
    handleResetFilters,
    page,
    setPage,
  };
};

export default useElixirs;
