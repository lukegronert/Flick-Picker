import React, {useState} from 'react';
import 'normalize.css';
import './styles/app.css';

import StreamButton from './components/StreamButton';
import GenerateButton from './components/GenerateButton';
import AdvancedSettings from './components/AdvancedSettings';

export default function App() {
  const [advancedSettingsActive, setAdvancedSettingsActive] = useState(false);
  const [movieOrSeries, setMovieOrSeries] = useState('movie');
  const [genre, setGenre] = useState('Biography');
  const [imdbRating, setImdbRating] = useState('Any')

  return (
    <div className="container">
      <header>
        <h1 className="header">Flick Picker</h1>
      </header>
      <section>
        <section className="buttons-section">
          <section className="stream-buttons-section">
            <StreamButton brand="Netflix"/>
            <StreamButton brand="Disney"/>
            <StreamButton brand="Hulu"/>
            <StreamButton brand="Amazon"/>
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

