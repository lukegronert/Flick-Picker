import React from 'react'
import 'normalize.css';
import './styles/app.css';

import StreamButton from './components/StreamButton';
import GenerateButton from './components/GenerateButton';
import AdvancedSettings from './components/AdvancedSettings';

export default function App() {
  return (
    <div className="container">
      <header>
        <h1 className="header">Flick Picker</h1>
      </header>
      <section>
        <section className="stream-buttons-section">
          <StreamButton brand="Netflix"/>
          <StreamButton brand="Disney"/>
          <StreamButton brand="Hulu"/>
          <StreamButton brand="Amazon"/>
        </section>
        <section className="generate-button-section">
          <GenerateButton />
        </section>

        <AdvancedSettings />
      </section>
    </div>
  )
}

