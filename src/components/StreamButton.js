import React from 'react'
import '../styles/streamButton.css';

export default function StreamButton({brand}) {
  return (
    <button className={`stream-button-${brand.toLowerCase()} stream-button`}>
        {brand}
    </button>
  )
}
