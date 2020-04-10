// @ts-nocheck
(function (doc) {
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomElement(array) {
        var index = randomNumber(0, array.length - 1);
        return array[index];
    }

    function createElement(name) {
        return doc.createElement(name);
    }

    function removeChildren(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    function showRandomQuote() {
        quotes.then((data) => {
            var quote = randomElement(data);
            var fragment = doc.createDocumentFragment();

            var quoteText = createElement('div');
            quoteText.setAttribute('class', 'quote-text');
            quoteText.innerHTML = `&ldquo;${quote.quote}&rdquo;`;

            var quoteAuthor = createElement('div');
            quoteAuthor.setAttribute('class', 'quote-author');
            quoteAuthor.textContent = quote.author;

            var randomQuoteLink = createElement('a');
            randomQuoteLink.setAttribute('class', 'random');
            randomQuoteLink.textContent = 'Random quote';

            fragment.appendChild(quoteText);
            fragment.appendChild(quoteAuthor);
            fragment.appendChild(randomQuoteLink);

            var randomQuote = doc.querySelector('.random-quote');
            removeChildren(randomQuote);
            randomQuote.appendChild(fragment);
        });
    }

    doc.querySelector('.random-quote').addEventListener('click', function (e) {
        e.preventDefault();

        var { target } = e;

        if (target.tagName.toLowerCase() !== 'a') {
            return;
        }

        if (!target.getAttribute('class').includes('random')) {
            return;
        }

        showRandomQuote();
    });

    showRandomQuote();
})(document);
