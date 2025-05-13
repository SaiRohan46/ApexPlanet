const apiKey = 'd032df95a34f215fdb7e6fc2a6e9ed7d';
const container = document.getElementById('newsContainer');
const input = document.getElementById('searchInput');

// Fetch news from GNews API
async function fetchNews(query = 'technology') {
  try {
    const res = await fetch(`https://gnews.io/api/v4/search?q=${query}&lang=en&apikey=${apiKey}`);
    const data = await res.json();

    if (data.articles && data.articles.length > 0) {
      showNews(data.articles);
    } else {
      container.innerHTML = "<p>No articles found.</p>";
    }
  } catch (err) {
    container.innerHTML = "<p>Something went wrong. Try again later.</p>";
    console.error(err);
  }
}

// Display news cards
function showNews(articles) {
  container.innerHTML = '';
  articles.forEach(article => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <img src="${article.image || 'https://via.placeholder.com/300x180'}" alt="News Image">
      <h3>${article.title}</h3>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    container.appendChild(card);
  });
}

// Search input listener
input.addEventListener('input', () => {
  const query = input.value.trim();
  if (query.length >= 3) {
    fetchNews(query);
  }
});

// Load default news on page load
window.onload = () => fetchNews();
