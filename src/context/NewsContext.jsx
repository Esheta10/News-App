import {createContext, useContext, useState, useEffect} from "react"
import api from "../config/axios";

// create context
// provide context
// use context

const NewsContext = createContext();

const NewsContextProvider = ({children}) => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchNews = async (url="/everything?q=india") => {

        try {
                setLoading(true);
                const response = await api.get(`${url}&apiKey=${import.meta.env.VITE_API_KEY}`)
                const articles = response.data.articles ?? []
                setNews(articles)
                setLoading(false);
                return articles
        } catch(error){
            console.log(error)
             setLoading(false);
            return []
        }
    
  }

   const value = {
        news,
        setNews,
        fetchNews,
        loading
    }
  
    useEffect(()=>{
        fetchNews();
    }, [])

    return (
        <NewsContext.Provider value={value}>
            {children}
        </NewsContext.Provider>
    )
}

const useNewsContext = () => {
    return useContext(NewsContext)
}

export {NewsContextProvider, useNewsContext}