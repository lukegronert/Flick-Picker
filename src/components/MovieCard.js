import React from 'react'

export default function MovieCard({title, imageURL, cast, imdbRating, runtime, overview, setDisplayMovie,
                                    episodeRuntimes, seasons, episodes, movieOrSeries}) {
    if(movieOrSeries === 'movie') {
        return (
          <section className="movie-display-container">
              <h1>{title}</h1>
              <img src={imageURL} alt={`Image for ${title}`}></img>
              <p>{overview}</p>
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
              <button onClick={() => setDisplayMovie(false)}>Back to Generator</button>
          </section>
        ) 
    } else {
        return (
        <section className="movie-display-container">
              <h1>{title}</h1>
              <img src={imageURL} alt={`Image for ${title}`}></img>
              <p>{overview}</p>
              <p>Cast: {cast.map((member, index) => {
                  {/* index ? ', ' : ' ' -> Skips first member because 0 is false
                      Puts a comma and space before every member
                      This way there is no trailing comma after the last member */}
                  return (
                      <span key={index}>{(index ? ', ' : ' ') + member }</span>
                  )
              })}</p>
              <p>IMDb Rating: {imdbRating}</p>
              <p>Episode Runtimes: {episodeRuntimes.length !== 0 ? episodeRuntimes.map((time, index) => <span key={index}>time</span>) : 'unknown'}</p>
              <p>Seasons: {seasons}</p>
              <p>Episodes: {episodes}</p>
              <button onClick={() => setDisplayMovie(false)}>Back to Generator</button>
          </section>
        )
    }
}
