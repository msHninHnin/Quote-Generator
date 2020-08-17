const quoteContainer = document.querySelector(".quote-container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newQuote = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter-btn");
const load = document.getElementById("loader");

function showloadingSpinner() {
  load.hidden = false;
  quoteContainer.hidden = true;
}
function removeloadingSpinner() {
  if (!load.hidden) {
    load.hidden = true;
    quoteContainer.hidden = false;
  }
}
async function getQuote() {
  showloadingSpinner();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data);
    if (data.quoteAuthor === "") {
      author.innerText = "Unknown";
    } else {
      author.innerText = data.quoteAuthor;
    }
    if (data.quoteText > 50) {
      quote.classList.add("long-quote");
    } else {
      quote.classList.remove("long-quote");
    }
    quote.innerText = data.quoteText;
    removeloadingSpinner();
  } catch (error) {
    getQuote();
    console.log("No quote", error);
  }
}
function tweetQuote() {
  const quoteTweet = quote.innerText;
  const authorTweet = author.innerText;
  const twitterUrl =
    "https://twitter.com/intent/tweet?text=${quoteTweet}-${author}";
  window.open(twitterUrl, "_blank");
}
newQuote.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
getQuote();
