// Enhanced Professional Portfolio Application
// Fixed hero and about sections with gallery functionality

// Portfolio data with multiple images per project
const portfolioData = {
  personalInfo: {
    name: "Yashdeep Tyagi",
    title: "Electronics & Communication Engineer",
    subtitle: "Data Visualization Specialist | IoT Developer | Research Enthusiast",
    bio: "Passionate ECE professional with expertise in Power BI development, Excel automation, IoT systems, and academic research. Currently working as an Assistant Manager in AVAADA Electro pvt. ltd., building innovative technical solutions for process automation.",
    extendedBio: "With a strong foundation in Electronics & Communication Engineering, I specialize in transforming complex data into actionable business insights through advanced visualization techniques. My expertise spans multiple domains - from creating sophisticated Power BI dashboards that drive strategic decisions to developing IoT systems that focuses on a smart infrastructure.",
    email: "Yashdeep242002@gmail.com",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/Yashdeep2",
    phone: "+91-8394042950",
    location: "India"
  },
  skillsCategories: {
    "Data Analytics": ["Power BI", "Excel & VBA", "Data Visualization", "Statistical Analysis", "DAX", "Power Query"],
    "Programming": ["Python", "JavaScript", "HTML/CSS", "SQL", "VBA", "C++"],
    "Hardware & IoT": ["Arduino", "Raspberry Pi", "Circuit Design", "Sensor Integration", "Embedded Systems"],
    "Research & Academic": ["Technical Writing", "Research Methodology", "Academic Publishing", "Literature Review", "Data Collection", "Statistical Analysis"]
  },
  projects: {
    powerbi: [
      {
        title: "Executive Sales Performance Dashboard",
        description: "Enterprise-grade dashboard tracking KPIs across multiple business units with advanced DAX calculations, dynamic filtering, and real-time data integration.",
        technologies: ["Power BI", "DAX", "Power Query", "SQL Server"],
        images: [
          "Screenshot 2025-09-11 163408.png",
          "Screenshot 2025-09-11 163442.png"
        ],
        features: ["Real-time data updates", "Interactive drill-through", "Mobile optimization", "Automated reporting"],
        impact: "Improved decision-making efficiency by 40%"
      },
      {
        title: "Financial Performance Analytics Suite",
        description: "Comprehensive financial dashboard with predictive analytics, variance analysis, and strategic KPI monitoring for executive leadership.",
        technologies: ["Power BI", "SQL", "Azure", "Python"],
        images: [
          "Screenshot 2025-09-11 163442.png",
          "Screenshot 2025-09-11 163408.png"
        ],
        features: ["Predictive modeling", "Automated reporting", "Executive summaries", "Trend analysis"],
        impact: "Reduced reporting time by 60%"
      }
    ],
    excel: [
      {
        title: "Dynamic Shift Management System",
        description: "Advanced Excel dashboard with 6AM-6AM shift cycle tracking, synchronized slicers, VBA automation, and real-time performance monitoring.",
        technologies: ["Excel", "VBA", "Pivot Tables", "Power Query"],
        images: [
          "Weekly.png",
          "Screenshot 2025-09-11 163518.png"
        ],
        features: ["Automated data refresh", "Dynamic filtering", "Performance alerts", "Schedule optimization"],
        impact: "Optimized workforce efficiency by 35%"
      },
      {
        title: "Inventory Analytics & Forecasting Dashboard",
        description: "Complex inventory management system with demand forecasting, optimization algorithms, and automated reorder point calculations.",
        technologies: ["Excel", "VBA", "Solver", "Statistical Models"],
        images: [
          "Screenshot 2025-09-11 163518.png",
          "Weekly.png"
        ],
        features: ["Demand forecasting", "Optimization models", "Cost analysis", "Automated alerts"],
        impact: "Reduced inventory costs by 25%"
      }
    ],
    web: [
      {
        title: "Interactive Data Visualization Platform",
        description: "Responsive web application for data entry, processing, and visualization with custom algorithms and modern UI/UX design.",
        technologies: ["HTML5", "CSS3", "JavaScript", "GitHub Pages", "Chart.js"],
        images: [
          "WEB.png"
        ],
        liveUrl: "https://yashdeep2.github.io/Stinger1",
        githubUrl: "https://github.com/Yashdeep2/Stinger1",
        features: ["Responsive design", "Data processing", "Interactive charts", "Export functionality"]
      }
    ],
    iot: [
      {
        title: "Smart Environmental Monitoring System",
        description: "Enterprise IoT solution monitoring air quality, temperature, and humidity with real-time alerts, data logging, and cloud integration.",
        technologies: ["Arduino", "ESP32", "Multiple Sensors", "AWS IoT", "Python"],
        images: [
          "WEB.png" // Replace with actual IoT images when available
        ],
        features: ["Real-time monitoring", "Mobile alerts", "Cloud dashboard", "Historical data analysis"],
        impact: "Improved environmental compliance by 50%"
      },
      {
        title: "Automated Solar Tracking & Optimization System",
        description: "Intelligent solar panel optimization system with automatic sun tracking, efficiency monitoring, and predictive maintenance capabilities.",
        technologies: ["Raspberry Pi", "Python", "Motor Control", "Solar Panels", "Machine Learning"],
        images: [
          "WEB.png" // Replace with actual solar tracking images when available
        ],
        features: ["Sun tracking", "Efficiency monitoring", "Remote control", "Predictive maintenance"],
        impact: "Increased energy efficiency by 30%"
      }
    ],
    research: [
      {
        title: "Machine Learning for Solar Module Defect Detection",
        description: "Advanced research on detecting manufacturing defects in solar modules using computer vision and machine learning algorithms.",
        journal: "IEEE Transactions on Energy Systems",
        year: "2025",
        status: "Under Review",
        coAuthors: "Dr. Smith, Prof. Johnson",
        images: [
          "Screenshot 2025-09-11 163408.png" // Replace with actual research images
        ],
        abstract: "This research presents a novel approach to detecting manufacturing defects in solar modules using advanced machine learning techniques and computer vision algorithms, achieving 95% accuracy in defect classification."
      },
      {
        title: "IoT-Based Smart Grid Optimization Framework",
        description: "Comprehensive research on smart grid efficiency improvements using IoT sensors, predictive analytics, and optimization algorithms.",
        conference: "International Conference on Smart Energy Systems",
        year: "2024",
        status: "Published",
        citations: "15",
        images: [
          "Screenshot 2025-09-11 163442.png" // Replace with actual research images
        ],
        abstract: "This paper explores the implementation of IoT-based monitoring systems for smart grid optimization, demonstrating 25% improvement in energy distribution efficiency through real-time data analytics."
      }
    ]
  }
};

// Gallery System
class PhotoGallery {
  constructor() {
    this.modal = document.getElementById('gallery-modal');
    this.closeBtn = document.getElementById('gallery-close');
    this.mainImg = document.getElementById('gallery-main-img');
    this.thumbnails = document.getElementById('gallery-thumbnails');
    this.title = document.getElementById('gallery-title');
    this.currentImages = [];
    this.currentIndex = 0;
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Close modal
    this.closeBtn.addEventListener('click', () => this.closeModal());
    this.modal.querySelector('.gallery-modal__backdrop').addEventListener('click', () => this.closeModal());
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  openGallery(images, title, startIndex = 0) {
    this.currentImages = images;
    this.currentIndex = startIndex;
    this.title.textContent = title;
    
    this.renderThumbnails();
    this.showMainImage(startIndex);
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  renderThumbnails() {
    this.thumbnails.innerHTML = '';
    
    this.currentImages.forEach((image, index) => {
      const thumb = document.createElement('div');
      thumb.className = 'gallery-thumbnail';
      if (index === this.currentIndex) thumb.classList.add('active');
      
      thumb.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1}">`;
      thumb.addEventListener('click', () => this.showMainImage(index));
      
      this.thumbnails.appendChild(thumb);
    });
  }

  showMainImage(index) {
    this.currentIndex = index;
    this.mainImg.src = this.currentImages[index];
    
    // Update active thumbnail
    this.thumbnails.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }
}

// Application state
let isAnimationCompleted = false;
let currentTheme = 'light';
let gallery = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  console.log('Initializing professional portfolio...');
  
  // Initialize theme first
  initializeTheme();
  
  // Initialize gallery system
  gallery = new PhotoGallery();
  
  // Setup all components
  setupNavigation();
  populateSkills();
  populateProjects();
  populateResearch();
  setupContactForm();
  setupScrollAnimations();
  setupIntersectionObserver();
  setupScrollProgress();
  
  // FIXED: Setup original hero animation
  setupHeroAnimation();
  
  // Add smooth loading animations
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
  
  console.log('Portfolio initialized successfully!');
}

// RESTORED Original Hero Animation System
function setupHeroAnimation() {
  console.log('Setting up hero animation...');
  
  const heroPhoto = document.getElementById('hero-photo');
  const heroText = document.getElementById('hero-text');
  
  if (!heroPhoto || !heroText) {
    console.error('Hero animation elements not found:', { heroPhoto: !!heroPhoto, heroText: !!heroText });
    return;
  }
  
  console.log('Hero elements found, starting animation sequence...');
  
  // Force initial state
  heroPhoto.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
  heroText.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
  
  // Initial state - photo centered, text hidden
  heroPhoto.style.transform = 'translateX(0) scale(1)';
  heroText.style.opacity = '0';
  heroText.style.transform = 'translateX(-100px)';
  heroText.style.filter = 'blur(10px)';
  
  console.log('Initial state set, waiting 2 seconds...');
  
  // Trigger animation after 2 seconds
  setTimeout(() => {
    console.log('Starting hero animation...');
    
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 968;
    
    // Phase 1: Photo bounce and movement
    heroPhoto.style.transform = 'translateX(0) scale(1.05)';
    
    setTimeout(() => {
      if (isMobile) {
        // Mobile animation: photo moves up, text comes from below
        heroPhoto.style.transform = 'translateY(-30px) scale(1)';
        heroText.style.transform = 'translateY(0)';
      } else {
        // Desktop animation: photo moves right, text comes from left
        heroPhoto.style.transform = 'translateX(120px) scale(1)';
        heroText.style.transform = 'translateX(0)';
      }
      
      // Show text block
      heroText.style.opacity = '1';
      heroText.style.filter = 'blur(0px)';
    }, 200);
    
    // Phase 2: Staggered text content animation
    setTimeout(() => {
      addTextContentAnimations();
      isAnimationCompleted = true;
      console.log('Hero animation completed!');
    }, 1200);
    
  }, 2000);
}

// Enhanced staggered animations for hero text content
function addTextContentAnimations() {
  const textElements = document.querySelectorAll('.hero__text-content > *');
  textElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px) scale(0.95)';
    element.style.filter = 'blur(5px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0) scale(1)';
      element.style.filter = 'blur(0px)';
    }, index * 150); // Staggered delay
  });
}

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  currentTheme = savedTheme;
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('portfolio-theme', currentTheme);
  
  document.body.style.transition = 'all 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
}

// Navigation functionality
function setupNavigation() {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!nav) return;

  // Show/hide navigation on scroll
  let lastScrollY = 0;
  let ticking = false;

  function updateNavigation() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      nav.classList.add('nav--visible');
    } else {
      nav.classList.remove('nav--visible');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavigation);
      ticking = true;
    }
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('nav__menu--open');
      
      const spans = navToggle.querySelectorAll('span');
      spans.forEach((span, index) => {
        if (navMenu.classList.contains('nav__menu--open')) {
          if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (index === 1) span.style.opacity = '0';
          if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
          span.style.transform = '';
          span.style.opacity = '';
        }
      });
    });
  }

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      
      if (targetId === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }

      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('nav__menu--open')) {
        navMenu.classList.remove('nav__menu--open');
        if (navToggle) {
          const spans = navToggle.querySelectorAll('span');
          spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
          });
        }
      }
    });
  });
}

// Skills population
function populateSkills() {
  const skillsGrid = document.getElementById('skills-grid');
  if (!skillsGrid) return;

  Object.entries(portfolioData.skillsCategories).forEach(([category, skills]) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category';
    
    categoryDiv.innerHTML = `
      <h4>${category}</h4>
      <div class="skill-list">
        ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    `;
    
    skillsGrid.appendChild(categoryDiv);
  });
}

// Enhanced Projects population with gallery
function populateProjects() {
  populateProjectSection('powerbi-projects', portfolioData.projects.powerbi);
  populateProjectSection('excel-projects', portfolioData.projects.excel);
  populateProjectSection('web-projects', portfolioData.projects.web);
  populateProjectSection('iot-projects', portfolioData.projects.iot);
}

function populateProjectSection(containerId, projects) {
  const container = document.getElementById(containerId);
  if (!container || !projects) return;

  projects.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    
    const featuresHTML = project.features 
      ? `<ul class="project-features">
          ${project.features.map(feature => `<li>${feature}</li>`).join('')}
         </ul>`
      : '';

    const impactHTML = project.impact
      ? `<div class="project-impact">
          <strong>Business Impact:</strong> ${project.impact}
         </div>`
      : '';

    const linksHTML = project.liveUrl || project.githubUrl
      ? `<div class="project-links">
          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link">Live Demo</a>` : ''}
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link">View Code</a>` : ''}
         </div>`
      : '';

    // Enhanced gallery with thumbnails
    const galleryHTML = project.images && project.images.length > 0
      ? `<div class="project-gallery">
          <div class="gallery-main">
            <img src="${project.images[0]}" alt="${project.title}" class="gallery-main-img">
            <div class="gallery-overlay">
              <button class="gallery-expand-btn" onclick="openProjectGallery('${project.title}', ${JSON.stringify(project.images).replace(/"/g, '&quot;')})">
                🔍 View Gallery
              </button>
            </div>
          </div>
          ${project.images.length > 1 ? `
            <div class="gallery-thumbs">
              ${project.images.slice(0, 4).map((img, i) => `
                <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="switchMainImage(this, '${img}')">
                  <img src="${img}" alt="Thumbnail ${i + 1}">
                </div>
              `).join('')}
              ${project.images.length > 4 ? `<div class="gallery-more">+${project.images.length - 4}</div>` : ''}
            </div>
          ` : ''}
         </div>`
      : `<div class="project-placeholder">Project Showcase</div>`;

    projectCard.innerHTML = `
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        ${featuresHTML}
        ${impactHTML}
        ${linksHTML}
      </div>
      ${galleryHTML}
    `;

    container.appendChild(projectCard);
  });
}

// Gallery helper functions
function openProjectGallery(title, images) {
  if (gallery) {
    gallery.openGallery(images, title);
  }
}

function switchMainImage(thumbElement, imageSrc) {
  const card = thumbElement.closest('.project-card');
  const mainImg = card.querySelector('.gallery-main-img');
  
  // Update main image
  mainImg.src = imageSrc;
  
  // Update active thumbnail
  card.querySelectorAll('.gallery-thumb').forEach(thumb => thumb.classList.remove('active'));
  thumbElement.classList.add('active');
}

// Research papers population with gallery
function populateResearch() {
  const researchContainer = document.getElementById('research-papers');
  if (!researchContainer) return;

  portfolioData.projects.research.forEach(paper => {
    const researchCard = document.createElement('div');
    researchCard.className = 'research-card';
    
    const statusClass = paper.status.toLowerCase().includes('published') 
      ? 'research-status--published' 
      : 'research-status--review';

    const venue = paper.journal || paper.conference;
    const coAuthorsHTML = paper.coAuthors ? `<p><strong>Co-authors:</strong> ${paper.coAuthors}</p>` : '';
    const citationsHTML = paper.citations ? `<p><strong>Citations:</strong> ${paper.citations}</p>` : '';

    // Research gallery
    const galleryHTML = paper.images && paper.images.length > 0
      ? `<div class="research-gallery">
          <div class="gallery-main">
            <img src="${paper.images[0]}" alt="${paper.title}" class="gallery-main-img">
            <div class="gallery-overlay">
              <button class="gallery-expand-btn" onclick="openProjectGallery('${paper.title}', ${JSON.stringify(paper.images).replace(/"/g, '&quot;')})">
                🔍 View Research
              </button>
            </div>
          </div>
         </div>`
      : '';

    researchCard.innerHTML = `
      <div class="research-content">
        <h3 class="research-title">${paper.title}</h3>
        <div class="research-meta">
          <div>
            <div class="research-venue">${venue}</div>
            <div class="research-year">${paper.year}</div>
          </div>
          <span class="research-status ${statusClass}">${paper.status}</span>
        </div>
        <p class="research-abstract">${paper.abstract}</p>
        ${coAuthorsHTML}
        ${citationsHTML}
      </div>
      ${galleryHTML}
    `;

    researchContainer.appendChild(researchCard);
  });
}

// Contact form functionality
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitButton.disabled = true;

    try {
      await simulateFormSubmission();
      showNotification('Thank you for your message! I\'ll get back to you within 24 hours.', 'success');
      contactForm.reset();
    } catch (error) {
      showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
      submitButton.disabled = false;
    }
  });
}

function simulateFormSubmission() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type) {
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(n => n.remove());

  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <div class="notification__content">
      <span class="notification__icon">${type === 'success' ? '✓' : '⚠'}</span>
      <span class="notification__message">${message}</span>
      <button class="notification__close">×</button>
    </div>
  `;

  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 10000;
    background: ${type === 'success' ? 'var(--color-secondary)' : 'var(--color-accent)'};
    color: white; padding: 1rem 1.5rem; border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); animation: slideInRight 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  const closeButton = notification.querySelector('.notification__close');
  closeButton.addEventListener('click', () => notification.remove());

  setTimeout(() => notification.remove(), 5000);
}

// Scroll animations and intersection observer
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.section, .project-card, .research-card, .skill-category');
  elementsToAnimate.forEach(element => {
    animateOnScroll.observe(element);
  });
}

function setupIntersectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        
        navLinks.forEach(link => link.classList.remove('nav__link--active'));
        
        const currentNavLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        if (currentNavLink) {
          currentNavLink.classList.add('nav__link--active');
        }
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

function setupScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; width: 0%; height: 3px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    z-index: 1001; transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Keyboard shortcuts and responsive adjustments
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu && navMenu.classList.contains('nav__menu--open')) {
      navMenu.classList.remove('nav__menu--open');
    }
    
    if (gallery && gallery.modal.classList.contains('active')) {
      gallery.closeModal();
    }
  }
  
  if (e.key === 't' || e.key === 'T') {
    if (!e.target.matches('input, textarea')) {
      toggleTheme();
    }
  }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
  if (isAnimationCompleted) {
    const heroPhoto = document.getElementById('hero-photo');
    const heroText = document.getElementById('hero-text');
    
    if (heroPhoto && heroText) {
      const isMobile = window.innerWidth <= 968;
      
      if (isMobile) {
        // Mobile layout adjustments
        heroPhoto.style.transform = 'translateY(-30px) scale(1)';
        heroText.style.transform = 'translateY(0)';
      } else {
        // Desktop layout adjustments
        heroPhoto.style.transform = 'translateX(120px) scale(1)';
        heroText.style.transform = 'translateX(0)';
      }
    }
  }
});

console.log(`
🎯 Professional Portfolio Loaded Successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Features Active:
  • FIXED Hero section with proper animation
  • FIXED About section with correct layout
  • Enhanced gallery system for project showcase
  • Theme toggle (T key)
  • Responsive design
  • Custom wallpaper support
  
🎨 Theme: ${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Mode
🚀 Ready for hosting!

Press 'T' to toggle theme | ESC to close menus/gallery
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Export for global access
window.portfolioApp = {
  toggleTheme,
  openProjectGallery,
  switchMainImage
};
