import React from 'react'
import Wrapper from '../components/Wrapper'
import { useNewsContext } from '../context/NewsContext'
import Loader from '../components/Loader'

const News = () => {


  const {news,loading} = useNewsContext();
  
  if(loading)
      return (
        <main className="flex-1">
          <Loader/>
        </main>
      )

  return (
   <main className="flex-1">
     <Wrapper>
      <div className="flex flex-wrap items-stretch justify-center gap-6 mt-10">

          {
              news?.map((newsDetails, index) => (
                  <div key={index} className="h-full">
                    <NewsCard details={newsDetails}/>
                  </div>
              ))
          }

      </div>
     </Wrapper>
   </main>
  )
}

const NewsCard = ({details}) => {

  return (
    <div className="card flex h-[450px] w-70 flex-col bg-base-300 shadow-sm p-4">
  <figure>
    <img
      className="h-36 w-full object-cover"
      src={details?.urlToImage}
      alt={details?.title} />
  </figure>
  <div className="card-body flex-1">
    <h2 className="card-title line-clamp-3">{details?.title}</h2>
    <p className="line-clamp-2">{details?.description}</p>
    <div className="card-actions mt-auto justify-end">
      <button className="badge badge-outline px-4 py-5 mt-6 rounded-lg text-md cursor-pointer" onClick={()=>window.open(details.url)}>Read More</button>
    </div>
  </div>
</div>
  )
}


export default News
