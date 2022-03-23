import React from 'react'
import '../styles/advancedSettings.css';

export default function AdvancedSettings({setAdvancedSettingsActive, setMovieOrSeries, setGenre, setImdbRating}) {
    const addAnimation = () => {
        const settings = document.querySelector('.settings');
        if(!settings.classList.contains('dropdown-animation')) {
            settings.classList.remove('raiseup-animation')
            settings.classList.add('dropdown-animation');
            setAdvancedSettingsActive(true);
        } else {
            settings.classList.remove('dropdown-animation');
            settings.classList.add('raiseup-animation');
            setAdvancedSettingsActive(false);
        }
    }

  return (
    <section className="advanced-settings-container">
        <div className="advanced-settings-header" onClick={() => addAnimation()}>
            <p>Advanced Settings</p>
            <p>\/</p>
        </div>
        <section className="settings">
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
            <div className="settings-option">
                <label>IMDb Rating:</label>
                <select onChange={(e) => setImdbRating(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="90">90+</option>
                    <option value="80">80+</option>
                    <option value="70">70+</option>
                    <option value="60">60+</option>
                    <option value="50">50+</option>
                    <option value="less than 50">Lower than 50</option>
                </select>
            </div>
        </section>
    </section>
  )
}