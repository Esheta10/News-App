import React from 'react'
import Wrapper from './Wrapper'
import { useNewsContext } from '../context/NewsContext'

const Category = () => {

  const {fetchNews} = useNewsContext();

  const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

  const handleClick = async (e) => {

        const category = e.currentTarget.value;
        await fetchNews(`/everything?q=${encodeURIComponent(category)}`);
  }

  return (
    <div className="bg-gray-950 sticky top-15 z-8 p-2">
        <Wrapper>
         <div className="flex flex-row flex-wrap items-center justify-center gap-5">

            {
                categories.map((category) => (
                        
                          <button type="submit" className="btn bg-purple-800 mt-5" onClick={handleClick} key={category} value={category}>{category}</button>
                        
                ))
            }
         </div>
    </Wrapper>
    </div>
    
  )
}

export default Category
