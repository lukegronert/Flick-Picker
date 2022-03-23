import React from 'react'
import '../styles/streamButton.css';

export default function StreamButton({brand, setService}) {
  return (
    <button className={`stream-button-${brand} stream-button`} onClick={() => setService(brand)}>
        {brand.toUpperCase()}
    </button>
  )
}
