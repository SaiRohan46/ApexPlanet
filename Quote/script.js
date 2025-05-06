const quotes = [
    {
      text: "Believe in yourself and all that you are.",
      author: "Christian D. Larson"
    },
    {
      text: "Dream big and dare to fail.",
      author: "Norman Vaughan"
    },
    {
      text: "Do what you can, with what you have, where you are.",
      author: "Theodore Roosevelt"
    },
    {
      text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
      text: "Happiness is not something ready made. It comes from your own actions.",
      author: "Dalai Lama"
    }
  ];
  
  function showQuote() {
    const random = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteText").textContent = `"${quotes[random].text}"`;
    document.getElementById("quoteAuthor").textContent = `— ${quotes[random].author}`;
  }
  
