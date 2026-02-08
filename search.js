const apiKey = "a84f5801";
const query = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results-container");

searchButton.addEventListener("click", function() {
    searchMovie(query.value);
});

function searchMovie(query) {
    resultsContainer.innerHTML = ""; 

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
        if (!data.Search) {
            resultsContainer.textContent = "No results found.";
            return;
        }

        data.Search.forEach(movie => {
            getMovieDetails(movie.imdbID);
        });
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}

function getMovieDetails(imdbID) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
    .then(response => response.json())
    .then(data => {
        const movieElement = document.createElement("div");
        const movieRatingsArray = data.Ratings;
        const fullPlot = data.Plot || "N/A";

        movieElement.innerHTML = `
            <img class="movie-poster" src="${data.Poster}" alt="${data.Title}">
            <div class="movie-info">
                <div class="movie-title-rating">
                    <h3>${data.Title}</h3>
                    <p class="movie-rating">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        ${movieRatingsArray && movieRatingsArray.length > 0 ? movieRatingsArray[0].Value.split("/")[0] : "N/A"}
                    </p>
                </div>
                <div class="movie-details">
                    <span>${data.Runtime}</span>
                    <span>${data.Genre}</span>
                    <button class="add-watchlist" data-imdbid="${data.imdbID}">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i> Watchlist
                    </button>
                </div>
                <p class="movie-plot">
                    <span class="plot-text plot-clamp" role="text"></span>
                </p>
            </div>
            <hr>
        `;
        movieElement.classList.add("movie-item");
        resultsContainer.appendChild(movieElement);

        const plotSpan = movieElement.querySelector(".plot-text");
        if (plotSpan) plotSpan.textContent = fullPlot;

        // Check if text exceeds 3 lines
        setTimeout(() => {
            const isOverflowing = plotSpan.scrollHeight > plotSpan.clientHeight;
            if (isOverflowing && fullPlot !== "N/A") {
                const btn = document.createElement("button");
                btn.className = "read-more";
                btn.setAttribute("aria-expanded", "false");
                btn.textContent = "Read more";
                movieElement.querySelector(".movie-plot").appendChild(btn);

                btn.addEventListener("click", () => {
                    const expanded = btn.getAttribute("aria-expanded") === "true";
                    if (expanded) {
                        plotSpan.classList.remove("expanded");
                        btn.textContent = "Read more";
                        btn.setAttribute("aria-expanded", "false");
                    } else {
                        plotSpan.classList.add("expanded");
                        btn.textContent = "Read less";
                        btn.setAttribute("aria-expanded", "true");
                    }
                });
            }
        }, 0);
    })
    .catch(error => console.error("Error fetching movie details:", error));
}