var quotes = (function () {
    return fetch('./data/quotes.json')
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.log(error));
})();
