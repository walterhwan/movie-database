export function extractTVProps(data) {
  const name = data.name
  const voteAverage = data.vote_average
  const imdbLink = `https://www.imdb.com/find?q=${data.name}`
  const youtubeSearch = `https://www.youtube.com/results?search_query=${data.name}+1080p+official+trailer`
  const posterSrc = `https://image.tmdb.org/t/p/w500${data.poster_path}`
  const genres = data.genres.map(({ name }) => name).join(' · ')
  const networks = data.networks.map(({ name }) => name).join(' · ')
  const homepage = data.homepage
  return {
    name,
    voteAverage,
    genres,
    posterSrc,
    imdbLink,
    youtubeSearch,
    networks,
    homepage,
  }
}

export function extractMovieProps(data) {
  const name = data.title
  const imdbLink = `https://www.imdb.com/title/${data.imdb_id}`
  const youtubeSearch = `https://www.youtube.com/results?search_query=${name}+1080p+official+trailer`
  const posterSrc = `https://image.tmdb.org/t/p/w500${data.poster_path}`
  return {
    name,
    genres: data.genres.map(({ name }) => name).join(' · '),
    voteAverage: data.vote_average,
    homepage: data.homepage,
    imdbLink,
    youtubeSearch,
    posterSrc
  }
}
