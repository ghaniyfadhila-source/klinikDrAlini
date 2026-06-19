// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Active navigation link
const currentLocation = location.pathname;
const menuItems = document.querySelectorAll('nav a');

menuItems.forEach(item => {
  if (item.getAttribute('href') === currentLocation) {
    item.classList.add('choosen');
  } else if (currentLocation.includes('index') && item.getAttribute('href') === 'index.html') {
    item.classList.add('choosen');
  } else if (currentLocation === '/' && item.getAttribute('href') === 'index.html') {
    item.classList.add('choosen');
  }
});

// Animasi saat scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card').forEach(card => {
  observer.observe(card);
});

// Define fadeInUp animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Mobile menu toggle (jika ditambahkan hamburger menu di masa depan)
function toggleMenu() {
  const nav = document.querySelector('nav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// Close modal when pressing Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      modal.style.display = 'none';
    });
  }
});

// Lazy load images untuk performa lebih baik
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

console.log('Website Dr. Alini loaded successfully!');
