import React from 'react'

export default function MovieCard({title, imageURL, cast, imdbRating, runtime, overview}) {
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
                <span>{(index ? ', ' : ' ') + member }</span>
            )
        })}</p>
        <p>IMDb Rating: {imdbRating}</p>
        <p>Runtime: {runtime} minutes</p>
    </section>
  )
}
