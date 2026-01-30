const apiKey = "a84f5801";
const query = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", function() {
    searchMovie(query.value);
});

function searchMovie(query) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.Search);
        const resultsContainer = document.getElementById("results-container");
        resultsContainer.innerHTML = ""; // Clear previous results

        data.Search.forEach(movie => {
            const movieElement = document.createElement("div");
            movieElement.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <div class="movie-info">
                    <h3>${movie.Title}</h3>
                </div>
            `;
            resultsContainer.appendChild(movieElement);
        })
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}