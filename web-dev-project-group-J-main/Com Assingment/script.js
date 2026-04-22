const workoutPrograms = {
  beginner: {
    title: 'Beginner Program',
    subtitle: 'Clean, simple routine to start strong',
    description: 'Three foundational exercises to build confidence with proper form and steady progression.',
    heroImage: 'images/beginer.webp',
    workouts: [
      {
        name: 'Bodyweight Squats',
        description: 'Learn the squat pattern with a focus on posture and range of motion.',
        meta: '3 sets x 10 reps',
        image: 'images/Bodyweight Squats.avif',
      },
      {
        name: 'Incline Push-Ups',
        description: 'Build upper body strength with reduced load and stable form.',
        meta: '3 sets x 8 reps',
        image: 'images/Incline Push-Ups.avif',
      },
      {
        name: 'Standing Dumbbell Rows',
        description: 'Strengthen your back and improve posture with a controlled pull motion.',
        meta: '2 sets x 12 reps',
        image: 'images/Standing Dumbbell Rows.avif',
      },
    ],
  },
  intermediate: {
    title: 'Intermediate Program',
    subtitle: 'Progress with more volume and next-level strength work',
    description: 'A balanced routine with additional exercises and extra sets for steady improvement.',
    heroImage: 'images/intermidiate.avif',
    workouts: [
      {
        name: 'Goblet Squats',
        description: 'Add load to your squat with a focused core and leg balance drill.',
        meta: '4 sets x 10 reps',
        image: 'images/Goblet Squats.jpg',
      },
      {
        name: 'Push-Up Progression',
        description: 'Increase upper body strength with standard push-ups and steady form control.',
        meta: '4 sets x 10 reps',
        image: 'images/Push-Up Progression.jpg',
      },
      {
        name: 'Dumbbell Reverse Lunges',
        description: 'Challenge your single-leg stability and glute strength with controlled lunges.',
        meta: '3 sets x 12 reps each leg',
        image: 'images/Dumbbell Reverse Lunges.jpg',
      },
      {
        name: 'Plank with Shoulder Tap',
        description: 'Build core stability and anti-rotation strength with a dynamic plank variation.',
        meta: '3 sets x 30 sec',
        image: 'images/Plank with Shoulder Tap.jpg',
      },
      {
        name: 'Romanian Deadlift',
        description: 'Develop posterior chain strength and hamstring control with slow tempo.',
        meta: '3 sets x 10 reps',
        image: 'images/Romanian Deadlift.jpg',
      },
    ],
  },
  advanced: {
    title: 'Advanced Program',
    subtitle: 'High-volume training for experienced athletes',
    description: 'Intense workouts with extra exercises, sets, and movement complexity for strong gains.',
    heroImage: 'images/advanced.webp',
    workouts: [
      {
        name: 'Barbell Back Squats',
        description: 'Heavy compound work to build leg strength, power, and overall athletic capacity.',
        meta: '5 sets x 8 reps',
        image: 'images/Barbell Back Squats.avif',
      },
      {
        name: 'Weighted Pull-Ups',
        description: 'Progress chin-up strength and upper back development with added resistance.',
        meta: '4 sets x 8 reps',
        image: 'images/Weighted Pull-Ups.webp',
      },
      {
        name: 'Walking Lunges',
        description: 'Build endurance, balance, and leg muscle control across a dynamic set.',
        meta: '4 sets x 12 reps each leg',
        image: 'images/Walking Lunges.jpg',
      },
      {
        name: 'Decline Push-Ups',
        description: 'Challenge chest and shoulder strength with a steeper push-up variation.',
        meta: '4 sets x 12 reps',
        image: 'images/Decline Push-Ups.jpg',
      },
      {
        name: 'Deadlift',
        description: 'Heavy posterior-chain loading for strength, stability, and improved posture.',
        meta: '5 sets x 6 reps',
        image: 'images/Deadlift.jpg',
      },
      {
        name: 'Hanging Leg Raises',
        description: 'Target the core with controlled hanging movement and hip flexor strength.',
        meta: '4 sets x 12 reps',
        image: 'images/Hanging Leg Raises.jpg',
      },
      {
        name: 'Farmer\'s Carry',
        description: 'Finish with a full-body grip and core challenge using loaded carries.',
        meta: '3 sets x 50 meters',
        image: 'images/Farmer\'s Carry.avif',
      },
    ],
  },
};

const pageData = {
  home: {
    heroImage: 'images/beginer.webp',
    heading: 'Find the right workout plan for your level',
    subtitle: 'Choose Beginner, Intermediate, or Advanced to explore clean, responsive fitness routines with clear structure and guided reps.',
    cards: [
      {
        level: 'beginner',
        title: 'Beginner',
        description: 'Start smart with fewer exercises and manageable sets.',
        image: 'images/beginer.webp',
      },
      {
        level: 'intermediate',
        title: 'Intermediate',
        description: 'Build consistency with additional workouts and structured progress.',
        image: 'images/intermidiate.avif',
      },
      {
        level: 'advanced',
        title: 'Advanced',
        description: 'Challenge yourself with the highest volume and intensity.',
        image: 'images/advanced.webp',
      },
    ],
  },
};

function createElement(tag, opts = {}) {
  const el = document.createElement(tag);
  if (opts.className) el.className = opts.className;
  if (opts.text) el.textContent = opts.text;
  if (opts.html) el.innerHTML = opts.html;
  if (opts.attrs) {
    Object.entries(opts.attrs).forEach(([key, value]) => el.setAttribute(key, value));
  }
  return el;
}

function renderWorkoutCards(workouts) {
  const list = document.querySelector('.workout-list');
  if (!list) return;
  list.innerHTML = '<div class="message-banner" id="message-banner"></div>';

  workouts.forEach((workout) => {
    const card = createElement('article', { className: 'workout-card' });
    if (workout.image) {
      card.appendChild(createElement('img', {
        className: 'workout-image',
        attrs: { src: workout.image, alt: `${workout.name} illustration` },
      }));
    }
    card.appendChild(createElement('h2', { text: workout.name }));
    card.appendChild(createElement('p', { text: workout.description }));
    card.appendChild(createElement('p', { className: 'workout-meta', text: workout.meta }));
    card.appendChild(createElement('button', {
      className: 'button video-button',
      text: 'Video Demonstration',
      attrs: { type: 'button' },
    }));
    list.appendChild(card);
  });
}

function renderHomePage() {
  const title = document.querySelector('.hero h1');
  const subtitle = document.querySelector('.hero p');
  const grid = document.getElementById('levels-grid');
  if (!grid) return;

  title.textContent = pageData.home.heading;
  subtitle.textContent = pageData.home.subtitle;
  grid.innerHTML = '';

  const heroImage = document.querySelector('.hero .hero-visual');
  if (heroImage && pageData.home.heroImage) {
    heroImage.src = pageData.home.heroImage;
    heroImage.alt = 'Fit Flow home workout image';
  }

  pageData.home.cards.forEach((card) => {
    const item = createElement('article', { className: 'level-card' });
    if (card.image) {
      item.appendChild(createElement('img', {
        attrs: { src: card.image, alt: `${card.title} level illustration` },
      }));
    }
    item.appendChild(createElement('h2', { text: card.title }));
    item.appendChild(createElement('p', { text: card.description }));
    item.appendChild(createElement('a', {
      className: 'button button-tertiary',
      text: `View ${card.title}`,
      attrs: { href: `${card.level}.html` },
    }));
    grid.appendChild(item);
  });
}

function renderLevelPage(level) {
  const data = workoutPrograms[level];
  if (!data) return;

  const pageHeader = document.querySelector('.page-header');
  if (pageHeader) {
    pageHeader.innerHTML = `
      <div>
        <p class="eyebrow">${data.title}</p>
        <h1>${data.subtitle}</h1>
        <p>${data.description}</p>
      </div>
      <img class="hero-visual" src="${data.heroImage}" alt="${data.title} illustration" />
    `;
  }
  renderWorkoutCards(data.workouts);
}

function createVideoPopup() {
  let popup = document.getElementById('video-popup-overlay');
  if (popup) return popup;

  popup = createElement('div', { className: 'video-popup-overlay', attrs: { id: 'video-popup-overlay' } });
  const card = createElement('div', { className: 'video-popup-card' });
  const close = createElement('button', { className: 'video-popup-close', text: '×', attrs: { type: 'button', 'aria-label': 'Close message' } });
  const heading = createElement('h2', { text: 'Sorry, video unavailable.' });
  const message = createElement('p', { text: 'This demonstration is not currently available. Please try again later.' });

  card.appendChild(close);
  card.appendChild(heading);
  card.appendChild(message);
  popup.appendChild(card);
  document.body.appendChild(popup);

  close.addEventListener('click', () => popup.classList.remove('visible'));
  popup.addEventListener('click', (event) => {
    if (event.target === popup) popup.classList.remove('visible');
  });

  return popup;
}

function showVideoPopup() {
  const popup = createVideoPopup();
  popup.classList.add('visible');
}

function bindVideoButtons() {
  document.addEventListener('click', function (event) {
    const button = event.target.closest('.video-button');
    if (!button) return;
    event.preventDefault();
    showVideoPopup();
  });
}

function initPage() {
  const page = document.body.dataset.page || 'home';
  if (page === 'home') {
    renderHomePage();
  } else {
    renderLevelPage(page);
  }
  bindVideoButtons();
}

document.addEventListener('DOMContentLoaded', initPage);
