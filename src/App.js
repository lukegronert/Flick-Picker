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
  const [movieImageURL, setMovieImageURL] = useState('');
  const [movieCast, setMovieCast] = useState([]);
  const [movieImdbRating, setMovieImdbRating] = useState(0);
  const [movieRuntime, setMovieRuntime] = useState(0);
  const [movieOverview, setMovieOverview] = useState('');

  const setMovieState = (title, imageURL, cast, imdbRating, runtime, overview) => {
    setMovieTitle(title);
    setMovieImageURL(imageURL);
    setMovieCast(cast);
    setMovieImdbRating(imdbRating);
    setMovieRuntime(runtime);
    setMovieOverview(overview);
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
                let movie = response.results[Math.floor(Math.random() * response.results.length) + 1]
                setMovieState(movie.title, movie.backdropURLs['300'], movie.cast, movie.imdbRating, movie.runtime, movie.overview)
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
                let movie = response.results[Math.floor(Math.random() * response.results.length) + 1]
                setMovieState(movie.title, movie.backdropURLs['300'], movie.cast, movie.imdbRating, movie.runtime, movie.overview)
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
          <Grid color="blue" height="100%" width="100%" className="loader-spinner"/>
        </div>
      </section>
    )
  } else if (displayMovie === true) {
    return (
      <section className="container">
        <MovieCard title={movieTitle} imageURL={movieImageURL} cast={movieCast} imdbRating={movieImdbRating}
                    runtime={movieRuntime} overview={movieOverview}/>
      </section>
    )
  } else {
    return (
      <div className="container">
        <header>
          <h1 className="header">Flick Picker</h1>
        </header>
        <section className="buttons-section">
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
        </section>
        <section className="advanced-settings-section">
          <AdvancedSettings setMovieOrSeries={setMovieOrSeries} setGenre={setGenre} />
        </section>
      </div>
    )
  }
}

