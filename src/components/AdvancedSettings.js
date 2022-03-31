import React from 'react'
import '../styles/advancedSettings.css';
import downArrow from '../icons/chevron-down.svg';

export default function AdvancedSettings({setMovieOrSeries, setGenre}) {
    const addAnimation = () => {
        const settings = document.querySelector('.settings');
        if(!settings.classList.contains('dropdown-animation')) {
            settings.classList.remove('raiseup-animation')
            settings.classList.add('dropdown-animation');
        } else {
            settings.classList.remove('dropdown-animation');
            settings.classList.add('raiseup-animation');
        }
    }

  return (
    <section className="advanced-settings-container">
        <div className="advanced-settings-header" onClick={() => addAnimation()}>
            <p>Advanced Settings</p>
            <p><img src={downArrow} /></p>
        </div>
        <section className="settings dropdown-animation">
            <div className="settings-option">
                <label>Movie or Series:</label>
                <select onChange={(e) => setMovieOrSeries(e.target.value)}>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                </select> 
            </div>
            <div className="settings-option">
                <label>Genre:</label>
                <select onChange={(e) => setGenre(e.target.value)}>
                    <option value="0">Any</option>
                    <option value="1">Biography</option>
                    <option value="10402">Music</option>
                    <option value="10749">Romance</option>
                    <option value="10751">Family</option>
                    <option value="10752">War</option>
                    <option value="10763">News</option>
                    <option value="10764">Reality</option>
                    <option value="10767">Talk Show</option>
                    <option value="12">Adventure</option>
                    <option value="14">Fantasy</option>
                    <option value="16">Animation</option>
                    <option value="18">Drama</option>
                    <option value="2">Film Noir</option>
                    <option value="27">Horror</option>
                    <option value="28">Action</option>
                    <option value="3">Game Show</option>
                    <option value="35">Comedy</option>
                    <option value="36">History</option>
                    <option value="37">Western</option>
                    <option value="4">Musical</option>
                    <option value="5">Sport</option>
                    <option value="53">Thriller</option>
                    <option value="6">Short</option>
                    <option value="7">Adult</option>
                    <option value="80">Crime</option>
                    <option value="878">Science Fiction</option>
                    <option value="9648">Mystery</option>
                    <option value="99">Documentary</option>
                </select>
            </div>
        </section>
    </section>
  )
}
