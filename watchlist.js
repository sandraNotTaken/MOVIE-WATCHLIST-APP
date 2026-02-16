const watchlistContainer = document.getElementById("watchlist-container");

function loadWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    
    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = `
                <h2>Your watchlist is looking a little empty...</h2>
                <p><a href="index.html">+</a>Let's add some movies</p>
                `;
        return;
    }

    watchlist.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie-item");
        movieElement.innerHTML = `
            <img class="movie-poster" src="${movie.poster}" alt="${movie.title}">
            <div class="movie-info">
                <div class="movie-title-rating">
                    <h3>${movie.title}</h3>
                    <p class="movie-rating">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        ${movie.rating}
                    </p>
                </div>
                <div class="movie-details">
                    <span>${movie.runtime}</span>
                    <span>${movie.genre}</span>
                    <button class="remove-watchlist" data-imdbid="${movie.imdbID}">
                        <i class="fa fa-trash" aria-hidden="true"></i> Remove
                    </button>
                </div>
                <p class="movie-plot">
                    <span class="plot-text">${movie.plot}</span>
                </p>
            </div>
            <hr>
        `;
        watchlistContainer.appendChild(movieElement);

        // Remove button listener
        movieElement.querySelector(".remove-watchlist").addEventListener("click", () => {
            removeFromWatchlist(movie.imdbID);
            movieElement.remove();
        });
    });
}

function removeFromWatchlist(imdbID) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist = watchlist.filter(m => m.imdbID !== imdbID);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

loadWatchlist();