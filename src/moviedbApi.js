const token = localStorage.getItem('API_TOKEN')

const BASE_URL = 'https://api.themoviedb.org/3'

function request(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => response.json())
}

export function getMovieById(_key, { id }) {
  if (!id) return {}
  const url = `${BASE_URL}/movie/${id}`
  return request(url)
}

export function getTVById(_key, { id }) {
  if (!id) return {}
  const url = `${BASE_URL}/tv/${id}`
  return request(url)
}

export function getWeekTrendingTV() {
  const url = `${BASE_URL}/trending/tv/week`
  return request(url)
}

export function getWeekTrendingMovie() {
  const url = `${BASE_URL}/trending/movie/week`
  return request(url)
}

