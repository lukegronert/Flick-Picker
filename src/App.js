import React, {useState} from 'react';
import 'normalize.css';
import './styles/app.css';

import StreamButton from './components/StreamButton';
import GenerateButton from './components/GenerateButton';
import AdvancedSettings from './components/AdvancedSettings';

const {REACT_APP_HOST} = process.env;
const {REACT_APP_KEY} = process.env;

export default function App() {
  const [advancedSettingsActive, setAdvancedSettingsActive] = useState(false);
  const [service, setService] = useState('netflix')
  const [movieOrSeries, setMovieOrSeries] = useState('movie');
  const [genre, setGenre] = useState('0');

  const pickFlick = (service, movieOrSeries, genre) => {
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
              .then(response => console.log(response)))
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
              .then(response => console.log(response)))
              .catch(err => console.log(err))
    }
  }

  return (
    <div className="container">
      <header>
        <h1 className="header">Flick Picker</h1>
      </header>
      <section>
        <section className="buttons-section">
          <section className="stream-buttons-section">
            <StreamButton brand="netflix" setService={setService}/>
            <StreamButton brand="disney" setService={setService}/>
            <StreamButton brand="hulu" setService={setService}/>
            <StreamButton brand="amazon" setService={setService}/>
          </section>
          <section className="generate-button-section">
            <GenerateButton pickFlick={pickFlick} service={service} movieOrSeries={movieOrSeries} genre={genre} />
          </section>
        </section>
        <AdvancedSettings setAdvancedSettingsActive={setAdvancedSettingsActive} advancedSettingsActive={advancedSettingsActive}
                          setMovieOrSeries={setMovieOrSeries} setGenre={setGenre} />
      </section>
    </div>
  )
}

