const apiKey = "a84f5801";
const query = document.getElementById("search-input");
function searchMovie(query) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Handle the search results here
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}