import React from 'react'
import '../styles/streamButton.css';

export default function StreamButton({brand, setService}) {
  function toggleActive(e) {
    const streamButtons = document.querySelectorAll('.stream-button');
    streamButtons.forEach(button => {
      if(button === e.target && !button.classList.contains('active')) {
        return button.classList.add('active')
      }
      return button.classList.remove('active')
    })
  }
  return (
    <button className={`stream-button-${brand} stream-button`} 
    onClick={(e) => {
              setService(brand)
              toggleActive(e)
      }}>
        {brand.toUpperCase()}
    </button>
  )
}
