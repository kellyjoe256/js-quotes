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

    function getInitials(quotes) {
        var initials = new Set();

        for (let i = 0, len = quotes.length; i < len; i += 1) {
            var { author } = quotes[i];
            initials.add(author.substr(0, 1).toUpperCase());
        }

        return Array.from(initials).sort();
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

    function showInitials() {
        quotes.then((data) => {
            var initials = getInitials(data);
            var fragment = doc.createDocumentFragment();

            var ul = createElement('ul');
            initials.forEach((initial) => {
                var li = createElement('li');
                // li.setAttribute('class', 'is-active');

                var a = createElement('a');
                a.setAttribute('href', '#');
                a.setAttribute('data-letter', initial);
                a.textContent = initial;

                li.appendChild(a);
                ul.appendChild(li);
            });
            fragment.appendChild(ul);

            doc.querySelector('.tabs').appendChild(fragment);
        });
    }

    function showQuotesByInitial(initial) {
        quotes.then((data) => {
            var fragment = doc.createDocumentFragment();
            for (let i = 0, len = data.length; i < len; i += 1) {
                const { author, quote } = data[i];
                if (author.substr(0, 1) !== initial) {
                    continue;
                }

                var div = createElement('div');
                div.setAttribute('class', 'quote');

                var p = createElement('p');
                p.setAttribute('class', 'text');
                p.innerHTML = `&ldquo;${quote}&rdquo;`;

                var span = createElement('span');
                span.setAttribute('class', 'author');
                span.textContent = author;

                div.appendChild(p);
                div.appendChild(span);

                fragment.appendChild(div);
                fragment.appendChild(createElement('hr'));
            }

            var tabContent = doc.querySelector('.tab-content');
            removeChildren(tabContent);
            tabContent.appendChild(fragment);
        });
    }

    function init() {
        showRandomQuote();
        showInitials();
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

    doc.querySelector('.tabs').addEventListener('click', function (e) {
        e.preventDefault();

        var { target } = e;

        [].slice.call(doc.querySelectorAll('.tabs li')).forEach((li) => {
            if (!li.hasAttribute('class')) {
                return;
            }

            li.removeAttribute('class');
        });

        if (target.tagName.toLowerCase() !== 'a') {
            return;
        }

        target.parentElement.setAttribute('class', 'is-active');

        showQuotesByInitial(target.getAttribute('data-letter'));
    });

    init();
})(document);
