const PrefixTrie = require('./PrefixTrie');

let dictionary = require('fs').readFileSync("/usr/share/dict/words", 'utf8').toString().trim().split('\n');
let autoComplete = new PrefixTrie();
let searchButton = document.getElementById('search-button');
let searchField = document.getElementById('search-field');
let main = document.getElementById('main');
let count = document.getElementById('count');

autoComplete.populate(dictionary);
count.innerText = "Searching " + autoComplete.count() + " words!";

searchButton.addEventListener('click', (e) => {
  e.preventDefault();

  let searchFor = searchField.value;

  searchField.value = '';
  searchField.focus();
  document.getElementById('header').className = 'header-search';
  document.getElementById('main').className = 'main-search';
  searchResults(searchFor);
});

main.addEventListener('click', (e) => {
  if (e.target.closest('span').className === 'word'
     && e.target.closest('span').dataset) {
    e.target.closest('span').className = 'selected';
    autoComplete.selectWord(e.target.closest('span').dataset.word, 1);
  } else if (e.target.closest('span').dataset) {
    e.target.closest('span').className = 'word';
    autoComplete.selectWord(e.target.closest('span').dataset.word, -1);
  }
});

function searchResults (search) {
  let results = autoComplete.getWords(search);

  main.innerHTML = '';
  let p = document.createElement("p");

  p.innerText = `${results.length} possible words found for "${search}"`;
  main.prepend(p);

  results.forEach( (result) => {
    let span = document.createElement("span");

    span.className = 'word';
    span.dataset.word = result;
    span.innerText = result;
    main.append(span);
  });
}
