import { useState, useEffect, useCallback} from "react";


export const useFetchTodayLimit = (userId: string | undefined) => {

const [limit, setLimit] = useState<number>(0);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string>("");

const fetchLimit = useCallback(async () => {
    if(!userId) return;
    setLoading(true);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const res = await fetch("/api/limit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, date: today }),
      });   
      const data = await res.json();
      setLimit(data.limits || 0);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch limits");
    }finally {
      setLoading(false);
    }
    
}, [userId]);

useEffect(() => {
  fetchLimit()
}, [fetchLimit])


  return [ limit, loading, error,  fetchLimit] as const;
}