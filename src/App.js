import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import {
  getWeekTrendingTV,
  getWeekTrendingMovie,
  getTVById,
  getMovieById,
} from './moviedbApi'
import { extractTVProps, extractMovieProps } from './helper'

import movieDbLogo from './movie_db.png'
import './App.css'

function TV({ tvId }) {
  const { status, data, error } = useQuery(['movie', { id: tvId }], getTVById)

  let {
    name,
    voteAverage,
    genres,
    posterSrc,
    imdbLink,
    youtubeSearch,
    networks,
    homepage,
  } = data ? extractTVProps(data) : {}
  return (
    <>
      {status === 'loading' ? (
        <div />
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="tv">
          <a href={imdbLink} target="_blank" rel="noopener noreferrer">
            <img className="poster" src={posterSrc} alt={name} />
          </a>
          <div className="details">
            <p className="vote">
              {voteAverage}
              <span className="max-score">/10</span>
            </p>
            <p className="name">
              <a href={imdbLink} target="_blank" rel="noopener noreferrer">
                {name}
              </a>
              <span className="genre">{genres}</span>
            </p>
            <p className="network">
              Playing On:&nbsp;
              <a href={homepage} target="_blank" rel="noopener noreferrer">
                {networks}
              </a>
            </p>
            <a href={youtubeSearch} target="_blank" rel="noopener noreferrer">
              <p className="trailer">Watch Trailer</p>
            </a>
          </div>
        </div>
      )}
    </>
  )
}
TV.propTypes = {
  tvId: PropTypes.number,
}

function TrendingTV() {
  const { status, data, error } = useQuery('trendingTV', getWeekTrendingTV)
  let trendingTVids
  if (data) trendingTVids = data.results
  return (
    <div className="trending-tv">
      <h1>Trending TV Shows</h1>
      {status === 'loading' ? (
        <div />
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          {trendingTVids.map(({ id }) => (
            <TV tvId={id} key={id} />
          ))}
        </>
      )}
    </div>
  )
}

function Movie({ movieId }) {
  const { status, data, error } = useQuery(['movie', { id: movieId }], getMovieById)
  let {
    name,
    genres,
    voteAverage,
    imdbLink,
    youtubeSearch,
    posterSrc,
  } = data ? extractMovieProps(data) : {}
  return (
    <>
      {status === 'loading' ? (
        <div />
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="tv">
          <a href={imdbLink} target="_blank" rel="noopener noreferrer">
            <img className="poster" src={posterSrc} alt={name} />
          </a>
          <div className="details">
            <p className="vote">
              {voteAverage}
              <span className="max-score">/10</span>
            </p>
            <p className="name">
              <a href={imdbLink} target="_blank" rel="noopener noreferrer">
                {name}
              </a>
              <span className="genre">{genres}</span>
            </p>
            <a href={youtubeSearch} target="_blank" rel="noopener noreferrer">
              <p className="trailer">Watch Trailer</p>
            </a>
          </div>
        </div>
      )}
    </>
  )
}
Movie.propTypes = {
  movieId: PropTypes.number,
}

function TredingMovie() {
  const { status, data, error } = useQuery(
    'trendingMovie',
    getWeekTrendingMovie
  )
  let trendingMovieIds
  if (data) trendingMovieIds = data.results
  return (
    <div className="trending-movie">
      <h1>Trending Movies</h1>
      {status === 'loading' ? (
        <div />
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          {trendingMovieIds.map(({ id }) => (
            <Movie movieId={id} key={id} />
          ))}
        </>
      )}
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <img className="mv-db-logo" src={movieDbLogo} alt="movie_db_logo"/>
      <TrendingTV />
      <TredingMovie />
    </div>
  )
}

export default App
