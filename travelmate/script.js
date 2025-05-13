const destinations = [
  {
    name: "Bali, Indonesia",
    image: "images/indonesia.jpg",
    category: "relaxation",
    price: 800,
    rating: 4.7
  },
  {
    name: "Swiss Alps, Switzerland",
    image: "images/switzerland.jpeg",
    category: "mountain",
    price: 1200,
    rating: 4.9
  },
  {
    name: "Amazon Rainforest",
    image: "images/amazon.jpg",
    category: "adventure",
    price: 950,
    rating: 4.6
  },
  {
    name: "Great Barrier Reef, Australia",
    image: "images/australia.jpeg",
    category: "adventure",
    price: 1100,
    rating: 4.8
  },
  {
    name: "Santorini, Greece",
    image: "images/greece.jpeg",
    category: "relaxation",
    price: 700,
    rating: 4.5
  }
];


function fetchAndDisplayDestinations() {
  const category = document.getElementById("categoryFilter").value;
  const sortOption = document.getElementById("sortOptions").value;

  let filtered = destinations.slice();

  if (category !== "all") {
    filtered = filtered.filter(dest => dest.category === category);
  }

  if (sortOption === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const container = document.getElementById("destinationList");
  container.innerHTML = "";

  filtered.forEach(dest => {
    const card = document.createElement("div");
    card.className = "destination";

    card.innerHTML = `
      <img src="${dest.image}" alt="${dest.name}">
      <div class="destination-info">
        <h3>${dest.name}</h3>
        <p>Category: ${dest.category}</p>
        <p>Price: $${dest.price}</p>
        <p>Rating: ⭐ ${dest.rating}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// Load on first render
window.onload = fetchAndDisplayDestinations;
