import React from 'react';
import "../styles/generateButton.css";

export default function GenerateButton({pickFlick, service, movieOrSeries, genre}) {
  return (
    <button className="generate-button" onClick={() => pickFlick(service, movieOrSeries, genre)}>
        Pick a Flick
    </button>
  )
}
