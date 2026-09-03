import React from 'react'
import Wrapper from '../components/Wrapper'
import { useNewsContext } from '../context/NewsContext'
import Loader from '../components/Loader'

const News = () => {
  const { news, loading, error } = useNewsContext();

  if (loading) {
    return (
      <main className="flex-1">
        <Loader />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1">
        <Wrapper>
          <div className="mt-10 rounded-lg border border-red-400 bg-red-950/30 p-6 text-center text-red-200">
            <h2 className="text-xl font-semibold">Unable to load news</h2>
            <p className="mt-2">{error}</p>
          </div>
        </Wrapper>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <Wrapper>
        <div className="mt-10 flex flex-wrap items-stretch justify-center gap-6">
          {news?.length ? (
            news.map((newsDetails, index) => (
              <div key={index} className="h-full">
                <NewsCard details={newsDetails} />
              </div>
            ))
          ) : (
            <div className="mt-10 text-center text-gray-300">No news articles found.</div>
          )}
        </div>
      </Wrapper>
    </main>
  );
};

const NewsCard = ({ details }) => {
  const imageUrl = details?.urlToImage || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="card flex h-[450px] w-70 flex-col bg-base-300 shadow-sm p-4">
      <figure>
        <img
          className="h-36 w-full object-cover"
          src={imageUrl}
          alt={details?.title || 'News article'}
        />
      </figure>
      <div className="card-body flex-1">
        <h2 className="card-title line-clamp-3">{details?.title || 'Untitled article'}</h2>
        <p className="line-clamp-2">{details?.description || 'No description available.'}</p>
        <div className="card-actions mt-auto justify-end">
          <button
            className="badge badge-outline mt-6 cursor-pointer rounded-lg px-4 py-5 text-md"
            onClick={() => details?.url && window.open(details.url, '_blank', 'noopener,noreferrer')}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default News
