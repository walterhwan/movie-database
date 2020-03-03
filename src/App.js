import React from 'react'
import { useQuery } from 'react-query'

import './App.css'

const token = ''

const getMovie = (id) => {
  const url = 'https://api.themoviedb.org/3/movie'
  if (!id) return { error: 'No movie ID' }
  return fetch(`${url}/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => response.json())
}

function App() {
  const [movieId, setMovieId] = React.useState('76341')
  const { status, data, error } = useQuery([movieId], getMovie)

  const handleOnChange = (event) => {
    setMovieId(event.target.value)
  }

  return (
    <div className="app">
      <p>Enter the movie Id</p>
      <input value={movieId} onChange={handleOnChange}></input>
      {status === 'loading' ? (
        <p>loading...</p>
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>{data.original_title}</p>
      )}
    </div>
  )
}

export default App
