const destinations = [
  {
    name: "Bali, Indonesia",
    image: "https://www.outlooktravelmag.com/media/bali-1-1679062958.profileImage.2x-1536x884.webp",
    category: "relaxation",
    price: 800,
    rating: 4.7,
    duration: 5,
    description: "Tropical paradise with beautiful beaches and temples"
  },
  {
    name: "Swiss Alps, Switzerland",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    category: "mountain",
    price: 1200,
    rating: 4.9,
    duration: 7,
    description: "Stunning mountain landscapes perfect for hiking"
  },
  {
    name: "Amazon Rainforest, Brazil",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    category: "adventure",
    price: 950,
    rating: 4.6,
    duration: 6,
    description: "Explore the world's largest rainforest ecosystem"
  },
  {
    name: "Great Barrier Reef, Australia",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    category: "adventure",
    price: 1100,
    rating: 4.8,
    duration: 4,
    description: "World's largest coral reef system for diving"
  },
  {
    name: "Santorini, Greece",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUJV124yJr65oTUH7WfhysMYUpfO0y2Qvtu1N27Wa2SaYxFr7OEC3IvcmP&s=10",
    category: "relaxation",
    price: 700,
    rating: 4.5,
    duration: 5,
    description: "Iconic white-washed buildings with stunning sunsets"
  },
  {
    name: "Tokyo, Japan",
    image: "https://i0.wp.com/www.touristjapan.com/wp-content/uploads/2025/02/map-of-tokyo-japan-travel-scaled.jpg?fit=2560%2C1707&ssl=1",
    category: "adventure",
    price: 900,
    rating: 4.8,
    duration: 6,
    description: "Vibrant city with ancient temples and modern tech"
  },
  {
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
    category: "relaxation",
    price: 1300,
    rating: 4.9,
    duration: 5,
    description: "Luxury island resort with crystal clear waters"
  },
  {
    name: "Rocky Mountains, Canada",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "mountain",
    price: 850,
    rating: 4.7,
    duration: 7,
    description: "Breathtaking peaks and pristine wilderness"
  },
  {
    name: "New Zealand",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    category: "adventure",
    price: 1000,
    rating: 4.8,
    duration: 8,
    description: "Adventure capital with stunning landscapes"
  },
  {
    name: "Dubai, UAE",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePQiR6WTPLJPVAGy_OXEjrvkfXLnenfbq_3z8kYpivcXcUJ0pvkCJZpTL&s=10",
    category: "relaxation",
    price: 650,
    rating: 4.6,
    duration: 4,
    description: "Luxury shopping and desert adventures"
  }
];

let wishlist = JSON.parse(localStorage.getItem("travelWishlist")) || [];

function saveWishlist() {
  localStorage.setItem("travelWishlist", JSON.stringify(wishlist));
}

function toggleWishlist(destName) {
  const index = wishlist.findIndex(d => d === destName);
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(destName);
  }
  saveWishlist();
  fetchAndDisplayDestinations();
  showNotification(`${destName} ${index > -1 ? 'removed from' : 'added to'} wishlist!`);
}

function showNotification(message) {
  const notif = document.createElement("div");
  notif.className = "notification";
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

function bookDestination(destName) {
  showNotification(`Booking ${destName}... Redirecting to payment page!`);
  setTimeout(() => {
    alert("Booking for " + destName + " started! (Demo mode)");
  }, 500);
}

function viewDetails(destName) {
  const dest = destinations.find(d => d.name === destName);
  if (dest) {
    alert(`📍 ${dest.name}\n\nDescription: ${dest.description}\nDuration: ${dest.duration} days\nPrice: $${dest.price}\nRating: ⭐ ${dest.rating}`);
  }
}

function fetchAndDisplayDestinations() {
  const category = document.getElementById("categoryFilter").value;
  const priceRange = document.getElementById("priceRange").value;
  const duration = document.getElementById("durationFilter").value;
  const sortOption = document.getElementById("sortOptions").value;

  let filtered = destinations.slice();

  if (category !== "all") {
    filtered = filtered.filter(dest => dest.category === category);
  }

  if (priceRange !== "all") {
    const [min, max] = priceRange.split("-").map(Number);
    filtered = filtered.filter(dest => dest.price >= min && (max === 9999 || dest.price <= max));
  }

  if (duration !== "all") {
    const dur = parseInt(duration);
    filtered = filtered.filter(dest => dest.duration <= dur);
  }

  if (sortOption === "price") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === "duration") {
    filtered.sort((a, b) => a.duration - b.duration);
  }

  const container = document.getElementById("destinationList");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #666;'>No destinations found. Try adjusting filters!</p>";
    return;
  }

  filtered.forEach(dest => {
    const card = document.createElement("div");
    card.className = "destination";
    const isWishlisted = wishlist.includes(dest.name);

    card.innerHTML = `
      <div class="destination-image-wrapper">
        <img src="${dest.image}" alt="${dest.name}">
        <div class="destination-overlay">
          <button class="action-btn wishlist-btn" onclick="toggleWishlist('${dest.name}')" title="Add to Wishlist">
            ❤️ ${isWishlisted ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
      <div class="destination-info">
        <h3>${dest.name}</h3>
        <div class="destination-meta">
          <span class="category-tag">${dest.category}</span>
          <span class="rating">⭐ ${dest.rating}</span>
        </div>
        <p class="description">${dest.description}</p>
        <div class="destination-details">
          <span class="price">💰 $${dest.price}</span>
          <span class="duration">📅 ${dest.duration} days</span>
        </div>
        <div class="destination-actions">
          <button class="btn-book" onclick="bookDestination('${dest.name}')">Book Now</button>
          <button class="btn-details" onclick="viewDetails('${dest.name}')">View Details</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Load on first render
window.onload = function() {
  fetchAndDisplayDestinations();
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  if (category) {
    document.getElementById("categoryFilter").value = category;
    fetchAndDisplayDestinations();
  }
};
