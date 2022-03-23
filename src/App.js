import React, {useState} from 'react';
import 'normalize.css';
import './styles/app.css';

import StreamButton from './components/StreamButton';
import GenerateButton from './components/GenerateButton';
import AdvancedSettings from './components/AdvancedSettings';

export default function App() {
  const [advancedSettingsActive, setAdvancedSettingsActive] = useState(false);
  const [service, setService] = useState('netflix')
  const [movieOrSeries, setMovieOrSeries] = useState('movie');
  const [genre, setGenre] = useState('Biography');
  const [imdbRating, setImdbRating] = useState('Any')

  const pickFlick = (service, movieOrSeries, genre) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': '',
        'X-RapidAPI-Key': ''
      }
    }
    fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=18&page=1&output_language=en&language=en',
          options)
          .then(response => response.json())
	        .then(response => console.log(response))
          .catch(err => console.log(err))
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
            <GenerateButton />
          </section>
        </section>
        <AdvancedSettings setAdvancedSettingsActive={setAdvancedSettingsActive} advancedSettingsActive={advancedSettingsActive}
                          setMovieOrSeries={setMovieOrSeries} setGenre={setGenre} setImdbRating={setImdbRating} />
      </section>
    </div>
  )
}

