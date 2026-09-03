import { createContext, useContext, useState, useEffect } from "react";

const NewsContext = createContext();

const isLocalhost = () => {
  if (typeof window === "undefined") return false;
  return ["localhost", "127.0.0.1"].includes(window.location.hostname);
};

const getNewsUrl = (url = "/everything?q=india") => {
  const match = url.match(/q=([^&]+)/);
  const query = match ? decodeURIComponent(match[1]) : "india";

  if (isLocalhost() && import.meta.env.VITE_API_KEY) {
    return `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${import.meta.env.VITE_API_KEY}`;
  }

  return `/api/news?q=${encodeURIComponent(query)}`;
};

const NewsContextProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (url = "/everything?q=india") => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(getNewsUrl(url));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Failed to fetch news");
      }

      const data = await response.json();
      const articles = data?.articles ?? [];
      setNews(articles);
      setLoading(false);
      return articles;
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while fetching news.");
      setNews([]);
      setLoading(false);
      return [];
    }
  };

  const value = {
    news,
    setNews,
    fetchNews,
    loading,
    error,
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
  );
};

const useNewsContext = () => {
  return useContext(NewsContext);
};

export { NewsContextProvider, useNewsContext };