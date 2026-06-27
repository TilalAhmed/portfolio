// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.left = e.clientY + 'px';
  cursorRing.style.left = e.clientX + 'px';
  cursorRing.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.classList.add('big');
  cursorRing.classList.add('big');
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('big');
  cursorRing.classList.remove('big');
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorRing.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorRing.style.opacity = '1';
});

// ===== PARTICLES BACKGROUND =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = `rgba(124, 92, 252, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particlesArray = [];
for (let i = 0; i < 50; i++) {
  particlesArray.push(new Particle());
}

function animateParticles() {
  ctx.fillStyle = 'rgba(5, 5, 8, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== NAVIGATION SCROLL ====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  body.classList.add('light');
  themeToggle.textContent = '🌙 Dark';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  
  if (body.classList.contains('light')) {
    themeToggle.textContent = '🌙 Dark';
    localStorage.setItem('theme', 'light');
  } else {
    themeToggle.textContent = '☀ Light';
    localStorage.setItem('theme', 'dark');
  }
});

// ===== TYPED ANIMATION =====
const typedElement = document.getElementById('typed');
const texts = [
  'ML Engineer.',
  'Data Scientist.',
  'Full Stack Developer.',
  'AI Enthusiast.',
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[textIndex];
  
  if (!isDeleting && charIndex <= currentText.length) {
    typedElement.textContent = currentText.substring(0, charIndex);
    charIndex++;
    setTimeout(type, 50);
  } else if (isDeleting && charIndex >= 0) {
    typedElement.textContent = currentText.substring(0, charIndex);
    charIndex--;
    setTimeout(type, 30);
  } else {
    isDeleting = !isDeleting;
    textIndex = !isDeleting ? (textIndex + 1) % texts.length : textIndex;
    setTimeout(type, 1000);
  }
}

type();

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ===== SKILL BARS ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');

const animateSkillBars = () => {
  skillFills.forEach((bar) => {
    const skillBar = bar.closest('.skill-bar');
    const barTop = skillBar.getBoundingClientRect().top;
    const barVisible = 100;

    if (barTop < window.innerHeight - barVisible && !bar.classList.contains('animated')) {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
      bar.classList.add('animated');
    }
  });
};

window.addEventListener('scroll', animateSkillBars);
animateSkillBars();

// ===== TERMINAL OUTPUT =====
const terminalBody = document.getElementById('terminalBody');
const commands = [
  '<span class="t-green">$</span> npm install ml-stack',
  '<span class="t-blue">✓ TensorFlow</span>',
  '<span class="t-blue">✓ Scikit-learn</span>',
  '<span class="t-blue">✓ PyTorch</span>',
  '<span class="t-green">$</span> python train.py',
  '<span class="t-green">Epoch 1/100</span> — Accuracy: 0.87',
  '<span class="t-green">Epoch 50/100</span> — Accuracy: 0.92',
  '<span class="t-green">Epoch 100/100</span> — Accuracy: <span class="t-purple">0.995</span>',
];

let commandIndex = 0;

function displayTerminal() {
  if (commandIndex < commands.length) {
    const line = document.createElement('div');
    line.innerHTML = commands[commandIndex];
    terminalBody.appendChild(line);
    commandIndex++;
    setTimeout(displayTerminal, 300);
  }
}

// Start terminal animation when visible
window.addEventListener('scroll', () => {
  const terminalBlock = document.querySelector('.terminal-block');
  if (terminalBlock && terminalBlock.getBoundingClientRect().top < window.innerHeight && commandIndex === 0) {
    displayTerminal();
  }
});

// ===== PROJECTS DATA =====
const projects = [
  {
    title: 'TruthScan AI',
    desc: 'Fake news detection using ensemble ML models + LLM verification',
    icon: '🔍',
    category: 'nlp',
    accuracy: '99.5%',
    articles: '45K+',
    tags: ['Flask', 'TF-IDF', 'LLaMA', 'HF Spaces'],
    links: [
      { text: 'Live Demo', url: '#', type: 'demo' },
      { text: 'GitHub', url: 'https://github.com/TilalAhmed', type: 'code' },
    ],
  },
  {
    title: 'CIFAR-10 CNN',
    desc: 'Deep learning image classifier with real-time predictions',
    icon: '🖼️',
    category: 'ml',
    accuracy: '95%',
    images: '60K',
    tags: ['TensorFlow', 'CNN', 'Keras', 'Streamlit'],
    links: [
      { text: 'Live Demo', url: '#', type: 'demo' },
      { text: 'Code', url: 'https://github.com/TilalAhmed', type: 'code' },
    ],
  },
  {
    title: 'Sentiment Analyzer',
    desc: 'Amazon reviews sentiment analysis with VADER & TextBlob',
    icon: '💬',
    category: 'nlp',
    sentiment: 'Multi-class',
    reviews: '50K',
    tags: ['VADER', 'TextBlob', 'NLP', 'Gradio'],
    links: [
      { text: 'Live Demo', url: '#', type: 'demo' },
      { text: 'GitHub', url: 'https://github.com/TilalAhmed', type: 'code' },
    ],
  },
  {
    title: 'Prayer App',
    desc: 'Real-time Islamic prayer times with city selection',
    icon: '🕌',
    category: 'web',
    cities: '25+',
    method: 'Jafari',
    tags: ['HTML/CSS', 'JavaScript', 'API', 'Vercel'],
    links: [
      { text: 'Live Demo', url: '#', type: 'demo' },
      { text: 'GitHub', url: 'https://github.com/TilalAhmed', type: 'code' },
    ],
  },
];

// ===== RENDER PROJECTS =====
function renderProjects(filter = 'all') {
  const projectsGrid = document.getElementById('projectsGrid');
  projectsGrid.innerHTML = '';

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  filtered.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = `project-card reveal ${filter !== 'all' && project.category !== filter ? 'hidden' : ''}`;
    
    // Get color for glow bar
    const colors = ['#7c5cfc', '#00d4ff', '#ff6b6b', '#00ffaa'];
    const color = colors[index % colors.length];

    card.innerHTML = `
      <div class="card-glow-bar" style="background:${color}"></div>
      <div class="card-body">
        <div class="card-icon-wrap">
          <div class="card-icon">${project.icon}</div>
          <div class="card-badge" style="border-color:${color};color:${color}">${project.category.toUpperCase()}</div>
        </div>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.desc}</p>
        <div class="card-tags">
          ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div>
          ${Object.entries(project)
            .filter(([key]) => !['title', 'desc', 'icon', 'category', 'tags', 'links'].includes(key))
            .slice(0, 1)
            .map(([label, value]) => 
              `<div class="card-metric">
                <span class="card-stat" style="color:${color}">${value}</span>
                <span class="card-stat-label">${label}</span>
              </div>`
            )
            .join('')}
        </div>
      </div>
      <div class="card-links">
        ${project.links
          .map(
            (link) =>
              `<a href="${link.url}" class="card-link ${link.type === 'demo' ? 'demo' : ''}" target="_blank">${link.text} →</a>`
          )
          .join('')}
      </div>
      <div class="card-wake">Click to explore →</div>
    `;

    projectsGrid.appendChild(card);
  });

  // Re-trigger reveal animations
  revealOnScroll();
}

// ===== FILTER PROJECTS =====
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.getAttribute('data-filter'));
  });
});

// Initial render
renderProjects();

// ===== SMOOTH SCROLLING LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== PROJECT CARD HOVER GLOW =====
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

// ===== INITIALIZE =====
console.log('Portfolio loaded ✓');
    
