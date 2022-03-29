import React, {useState, useEffect} from 'react'
import '../styles/movieCard.css';

export default function MovieCard({title, mobileImageURL, mediumImageURL, largeImageURL, cast, imdbRating, runtime, overview, setDisplayMovie,
                                    episodeRuntimes, seasons, episodes, movieOrSeries}) {
    const [correctImage, setCorrectImage] = useState('');

    useEffect(() => {
        if(window.innerWidth <= 400) {
            setCorrectImage(mobileImageURL)
        } else {
            setCorrectImage(mediumImageURL)
        }
    }, [])


    if(movieOrSeries === 'movie') {
        return (
          <section className="movie-display-container">
              <h1>{title}</h1>
              <section className="image-details-section">
                <section className="image">
                    <img src={correctImage} alt={`Image for ${title}`}></img> 
                </section>
                <section className="details">
                    <p>Cast: {cast.map((member, index) => {
                        {/* index ? ', ' : ' ' -> Skips first member because 0 is false
                            Puts a comma and space before every member
                            This way there is no trailing comma after the last member */}
                        return (
                            <span key={index}>{(index ? ', ' : ' ') + member }</span>
                        )
                    })}</p>
                    <p>IMDb Rating: {imdbRating}</p>
                    <p>Runtime: {runtime} minutes</p>
                    <p className="desktop-overview">{overview}</p>
                </section>
              </section>
              <p className="mobile-overview">{overview}</p>
              <div className="button-div">
                <button className="back-button" onClick={() => setDisplayMovie(false)}>BACK</button>
              </div>
          </section>
        ) 
    } else {
        return (
        <section className="movie-display-container">
              <h1>{title}</h1>
              <section className="image-details-section">
                <section className="image">
                    <img src={correctImage} alt={`Image for ${title}`}></img>
                </section>
                <section className="details">
                    <p>Cast: {cast.map((member, index) => {
                        {/* index ? ', ' : ' ' -> Skips first member because 0 is false
                            Puts a comma and space before every member
                            This way there is no trailing comma after the last member */}
                        return (
                            <span key={index}>{(index ? ', ' : ' ') + member }</span>
                        )
                    })}</p>
                    <p>IMDb Rating: {imdbRating}</p>
                    <p>Episode Runtimes: {episodeRuntimes.length !== 0 ? episodeRuntimes.map((time, index) => <span key={index}>{time}</span>) : 'unknown'}</p>
                    <p>Seasons: {seasons}</p>
                    <p>Episodes: {episodes}</p>
                    <p className="desktop-overview">{overview}</p>
                </section>
              </section>
              <p className="mobile-overview">{overview}</p>
              <div className="button-div">
                <button className="back-button" onClick={() => setDisplayMovie(false)}>BACK</button>
              </div>
          </section>
        )
    }
}
