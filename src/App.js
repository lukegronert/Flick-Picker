import React, {useState, useEffect} from 'react';
import 'normalize.css';
import './styles/app.css';
import {Grid} from 'react-loader-spinner';

import StreamButton from './components/StreamButton';
import GenerateButton from './components/GenerateButton';
import AdvancedSettings from './components/AdvancedSettings';
import MovieCard from './components/MovieCard';

const {REACT_APP_HOST} = process.env;
const {REACT_APP_KEY} = process.env;

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [displayMovie, setDisplayMovie] = useState(false);
  const [service, setService] = useState('netflix');
  const [movieOrSeries, setMovieOrSeries] = useState('movie');
  const [genre, setGenre] = useState('0');

  const [movieTitle, setMovieTitle] = useState('');
  const [movieMobileImageURL, setMovieMobileImageURL] = useState('');
  const [movieMediumImageURL, setMovieMediumImageURL] = useState('');
  const [movieLargeImageURL, setMovieLargeImageURL] = useState('');
  const [movieCast, setMovieCast] = useState([]);
  const [movieImdbRating, setMovieImdbRating] = useState(null);
  const [movieRuntime, setMovieRuntime] = useState(null);
  const [movieOverview, setMovieOverview] = useState('');
  const [episodeRuntimes, setEpisodeRuntimes] = useState(null);
  const [seasons, setSeasons] = useState(null)
  const [episodes, setEpisodes] = useState(null)

  const setMovieState = (title, mobileImageURL, mediumImageURL, largeImageURL, cast, imdbRating, runtime, overview, episodeRuntimes, seasons, episodes) => {
    setMovieTitle(title);
    setMovieMobileImageURL(mobileImageURL);
    setMovieMediumImageURL(mediumImageURL);
    setMovieLargeImageURL(largeImageURL);
    setMovieCast(cast);
    setMovieImdbRating(imdbRating);
    setMovieRuntime(runtime);
    setMovieOverview(overview);
    setEpisodeRuntimes(episodeRuntimes);
    setSeasons(seasons);
    setEpisodes(episodes);
  }

  const pickFlick = (service, movieOrSeries, genre) => {
    setIsLoading(true)
    let randomPage;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': REACT_APP_HOST,
        'X-RapidAPI-Key': REACT_APP_KEY
      }
    }
    // Check if genre is declared, then search accordingly
    // Two API calls required.
    // The first API call finds the total_pages and then generates a random number between 1 and total_pages
    // The second API call returns that page
    // genre = 0 means any genre
    if(genre === "0") {
      fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=${service}&type=${movieOrSeries}&page=1&output_language=en&language=en`,
        options)
        .then(response => response.json())
        .then(response => {
          console.log(response.total_pages)
          randomPage = Math.floor(Math.random() * (response.total_pages) + 1);
        })
        .then(() => fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=${service}&type=${movieOrSeries}&page=${randomPage}&output_language=en&language=en`,
        options)
              .then(response => response.json())
              .then(response => {
                console.log(response)
                let movie = response.results[Math.floor(Math.random() * (response.results.length-1)) + 1]
                setMovieState(movie.title, movie.posterURLs['185'], movie.posterURLs['342'], movie.posterURLs['500'], movie.cast, movie.imdbRating, movie.runtime, movie.overview, movie.episodeRuntimes, movie.seasons, movie.episodes)
                setDisplayMovie(true)
                setIsLoading(false)
              }))
              .catch(err => console.log(err))
            } else {
              fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=${service}&type=${movieOrSeries}&genre=${genre}&page=1&output_language=en&language=en`,
              options)
              .then(response => response.json())
              .then(response => {
                console.log(response.total_pages)
                randomPage = Math.floor(Math.random() * (response.total_pages) + 1);
              })
              .then(() => fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=${service}&type=${movieOrSeries}&genre=${genre}&page=${randomPage}&output_language=en&language=en`,
              options)
              .then(response => response.json())
              .then(response => {
                console.log(response)
                let movie = response.results[Math.floor(Math.random() * (response.results.length-1)) + 1]
                setMovieState(movie.title, movie.posterURLs['185'], movie.posterURLs['342'], movie.posterURLs['500'], movie.cast, movie.imdbRating, movie.runtime, movie.overview, movie.episodeRuntimes, movie.seasons, movie.episodes)
                setDisplayMovie(true)
                setIsLoading(false)
                console.log(response.results)
                }))
              .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    console.log('rerender')
  }, [isLoading])

  if(isLoading === true) {
    return(
      <section className="container">
        <div className="loader-div">
          <Grid color="rgba(234, 62, 62, 1)" height="100%" width="100%" className="loader-spinner"/>
        </div>
      </section>
    )
  } else if (displayMovie === true) {
    return (
      <section className="container">
        <MovieCard title={movieTitle} mobileImageURL={movieMobileImageURL} mediumImageURL={movieMediumImageURL} largeImageURL={movieLargeImageURL}
                                      cast={movieCast} imdbRating={movieImdbRating} runtime={movieRuntime} overview={movieOverview}
                                      setDisplayMovie={setDisplayMovie} movieOrSeries={movieOrSeries} episodeRuntimes={episodeRuntimes}
                                      seasons={seasons} episodes={episodes}
                    />
      </section>
    )
  } else {
    return (
      <div className="container">
        <header>
          <h1 className="header">Flick Picker</h1>
        </header>
        <section className="buttons-section">
          <h3>Choose a streaming service:</h3>
          <section className="stream-buttons-section">
            <div className="stream-buttons-column">
              <StreamButton brand="netflix" setService={setService}/>
              <StreamButton brand="disney" setService={setService}/>
            </div>
            <div className="stream-buttons-column">
              <StreamButton brand="hulu" setService={setService}/>
              <StreamButton brand="amazon" setService={setService}/>
            </div>
          </section>
          <section className="generate-button-section">
            <GenerateButton pickFlick={pickFlick} service={service} movieOrSeries={movieOrSeries} genre={genre} />
          </section>
          <section className="advanced-settings-section">
            <AdvancedSettings setMovieOrSeries={setMovieOrSeries} setGenre={setGenre} />
          </section>
        </section>
      </div>
    )
  }
}

