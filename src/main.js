const appRoot = document.querySelector('#app-root');
const landingPage = document.querySelector('#landing-page');
const appView = document.querySelector('#app-view');
const enterApp = document.querySelector('#enter-app');
const backToLanding = document.querySelector('#back-to-landing');

function showApp() {
  landingPage.classList.add('hidden');
  appView.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showLanding() {
  appView.classList.add('hidden');
  landingPage.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

enterApp?.addEventListener('click', showApp);
backToLanding?.addEventListener('click', showLanding);

const appCards = [
  {
    id: 'calculator',
    title: 'Calculator',
    emoji: '🧮',
    description: 'Gives useless answers and has an attitude.',
    html: `
      <div class="window">
        <div class="window-bar">
          <div class="window-controls">
            <button class="close-button" aria-label="Close">×</button>
            <button class="min-button" aria-label="Minimize">—</button>
            <button class="max-button" aria-label="Maximize">▢</button>
          </div>
          <span class="window-title">Calculator</span>
        </div>
        <div class="display" id="calc-display">0</div>
        <div class="keypad">
          <button data-value="C">C</button>
          <button data-value="(">(</button>
          <button data-value=")">)</button>
          <button data-value="/">÷</button>
          <button data-value="7">7</button>
          <button data-value="8">8</button>
          <button data-value="9">9</button>
          <button data-value="*">×</button>
          <button data-value="4">4</button>
          <button data-value="5">5</button>
          <button data-value="6">6</button>
          <button data-value="-">−</button>
          <button data-value="1">1</button>
          <button data-value="2">2</button>
          <button data-value="3">3</button>
          <button data-value="+">+</button>
          <button data-value="0">0</button>
          <button data-value=".">.</button>
          <button data-value="X" class="x-button">X</button>
          <button data-value="=" class="equals-button">=</button>
        </div>
      </div>
    `,
  },
  {
    id: 'flashlight',
    title: 'Flashlight',
    emoji: '🔦',
    description: 'Turns on, but the brightness is suspiciously minimal.',
    html: `
      <div class="flashlight-stage">
        <div id="flashlight-visual" class="flashlight-visual"></div>
        <div class="flashlight-actions">
          <button class="primary" id="flashlight-on">ON</button>
          <button class="secondary" id="flashlight-premium">Premium</button>
        </div>
      </div>
    `,
  },
  {
    id: 'calendar',
    title: 'Calendar',
    emoji: '📅',
    description: 'You can look at the month, but not really plan anything useful.',
    html: `
      <div class="calendar-shell">
        <div class="calendar-header">
          <button class="icon-button" id="calendar-prev">←</button>
          <div class="calendar-month" id="calendar-month">Month Year</div>
          <button class="icon-button" id="calendar-next">→</button>
        </div>
        <div class="calendar-grid" id="calendar-grid"></div>
        <div class="calendar-form">
          <input id="calendar-input" type="text" placeholder="Important date..." />
          <button class="primary" id="calendar-add">Add</button>
        </div>
        <div class="toast" id="calendar-toast">You can try, but it won’t matter.</div>
      </div>
    `,
  },
  {
    id: 'clock',
    title: 'Clock',
    emoji: '🕐',
    description: 'The time is always educational and slightly untrustworthy.',
    html: `
      <div class="clock-stage">
        <div class="world-clock" id="world-clock">12:00:00</div>
        <div class="alarm-controls">
          <input id="alarm-time" type="time" value="07:00" />
          <button class="secondary" id="set-alarm">Set alarm</button>
        </div>
        <div class="timer-controls">
          <input id="countdown-input" type="number" min="1" max="999" value="10" />
          <button class="primary" id="start-countdown">Start</button>
        </div>
        <div class="countdown-display" id="countdown-display">00:10</div>
        <div class="toast" id="clock-toast">No one is getting woken up.</div>
      </div>
    `,
  },
  {
    id: 'idle-clicker',
    title: 'Idle Clicker',
    emoji: '🖱️',
    description: 'The numbers rise, but the economy remains as empty as your soul.',
    html: `
      <div class="clicker-stage">
        <div class="clicker-score" id="clicker-score">0</div>
        <button class="clicker-button" id="clicker-button">Tap</button>
        <div class="toast" id="clicker-toast">No shops. No upgrades. Just vibes.</div>
      </div>
    `,
  },
];

function renderCards() {
  appRoot.innerHTML = appCards
    .map(
      (app) => `
        <section class="app-card" data-app="${app.id}">
          <div class="app-header">
            <h2>${app.title}</h2>
            <span class="emoji">${app.emoji}</span>
          </div>
          <div class="app-body">
            <p>${app.description}</p>
            ${app.html}
          </div>
        </section>
      `,
    )
    .join('');
}

renderCards();

const calcDisplay = document.querySelector('#calc-display');
const calcButtons = document.querySelectorAll('[data-value]');
let calculation = '0';

calcButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (value === 'C') {
      calculation = '0';
      calcDisplay.textContent = calculation;
      return;
    }

    if (value === 'X') {
      const parent = button.closest('.window');
      const rect = parent.getBoundingClientRect();
      const x = Math.random() * (rect.width - 70);
      const y = Math.random() * (rect.height - 160);
      button.style.position = 'absolute';
      button.style.left = `${x}px`;
      button.style.top = `${y}px`;
      button.style.zIndex = '2';
      button.style.transform = 'none';
      calcDisplay.textContent = 'X teleported.';
      return;
    }

    if (value === '=') {
      const answers = [
        'idk bro, ask Google Calendar.',
        'the answer is: emotionally unavailable.',
        '42, but only if the moon is waxing.',
        'No calculator can fix your decisions.',
      ];
      calcDisplay.textContent = answers[Math.floor(Math.random() * answers.length)];
      return;
    }

    if (calculation === '0' && value !== '.' && !['+', '-', '*', '/', '(', ')'].includes(value)) {
      calculation = value;
    } else {
      calculation += value;
    }

    calcDisplay.textContent = calculation;
  });
});

const closeButton = document.querySelector('.close-button');
const minButton = document.querySelector('.min-button');
const maxButton = document.querySelector('.max-button');

closeButton?.addEventListener('click', () => {
  closeButton.textContent = '?!';
  closeButton.setAttribute('title', 'It closed itself.');
  calcDisplay.textContent = 'Unexpectedly closed.';
});

maxButton?.addEventListener('click', () => {
  calcDisplay.textContent = 'Maximum effort. Minimum result.';
});

minButton?.addEventListener('click', () => {
  calcDisplay.textContent = 'It became smaller in spirit.';
});

const flashlightVisual = document.querySelector('#flashlight-visual');
const flashlightOn = document.querySelector('#flashlight-on');
const flashlightPremium = document.querySelector('#flashlight-premium');

flashlightOn?.addEventListener('click', () => {
  flashlightVisual.classList.remove('premium');
  flashlightVisual.classList.remove('dark');
  flashlightVisual.classList.add('dark');
  flashlightVisual.title = 'Looks bright, feels dim.';
});

flashlightPremium?.addEventListener('click', () => {
  flashlightVisual.classList.remove('dark');
  flashlightVisual.classList.add('premium');
  flashlightVisual.title = 'You paid for darkness.';
});

const calendarGrid = document.querySelector('#calendar-grid');
const calendarMonth = document.querySelector('#calendar-month');
const calendarToast = document.querySelector('#calendar-toast');
const calendarInput = document.querySelector('#calendar-input');
const calendarAdd = document.querySelector('#calendar-add');
const calendarPrev = document.querySelector('#calendar-prev');
const calendarNext = document.querySelector('#calendar-next');

let calendarView = new Date();

function monthName(date) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
}

function renderCalendar() {
  if (!calendarGrid || !calendarMonth) return;

  calendarMonth.textContent = monthName(calendarView);
  const year = calendarView.getFullYear();
  const month = calendarView.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7;
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const days = [];

  const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weekdayLabels.forEach((label) => {
    days.push(`<div class="day-name">${label}</div>`);
  });

  for (let i = 0; i < firstDayIndex; i += 1) {
    const day = prevMonthDays - firstDayIndex + i + 1;
    days.push(`<div class="day muted">${day}</div>`);
  }

  for (let day = 1; day <= lastDayOfMonth; day += 1) {
    const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
    days.push(`<div class="day ${isToday ? 'today' : ''}">${day}</div>`);
  }

  const totalCells = Math.ceil((firstDayIndex + lastDayOfMonth) / 7) * 7;
  const remaining = totalCells - (firstDayIndex + lastDayOfMonth);
  for (let i = 1; i <= remaining; i += 1) {
    days.push(`<div class="day muted">${i}</div>`);
  }

  calendarGrid.innerHTML = days.join('');
}

calendarPrev?.addEventListener('click', () => {
  calendarView = new Date(calendarView.getFullYear(), calendarView.getMonth() - 2, 1);
  renderCalendar();
  calendarToast.textContent = 'The month jumped back two months. That is a feature.';
});

calendarNext?.addEventListener('click', () => {
  calendarView = new Date(calendarView.getFullYear(), calendarView.getMonth() + 1, 1);
  renderCalendar();
  calendarToast.textContent = 'You moved forward one month. We both know that was optional.';
});

calendarAdd?.addEventListener('click', () => {
  const value = calendarInput?.value.trim();
  if (!value) {
    calendarToast.textContent = 'You have a brain, no? Use it.';
    return;
  }
  calendarToast.textContent = `“${value}” was added to the calendar, which is a bold lie.`;
  calendarInput.value = '';
});

renderCalendar();

const worldClock = document.querySelector('#world-clock');
const alarmInput = document.querySelector('#alarm-time');
const setAlarm = document.querySelector('#set-alarm');
const countdownInput = document.querySelector('#countdown-input');
const startCountdown = document.querySelector('#start-countdown');
const countdownDisplay = document.querySelector('#countdown-display');
const clockToast = document.querySelector('#clock-toast');

const worldTimes = [
  'Tokyo',
  'Rome',
  'New York',
  'Berkshire',
  'Roman Empire',
  'Atlantis',
  'UTC',
];

function updateClock() {
  if (!worldClock) return;
  const now = new Date();
  const romanTime = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][now.getHours() % 12];
  const weirdLocations = [
    `${worldTimes[Math.floor(Math.random() * worldTimes.length)]} ${now.toLocaleTimeString()}`,
    `${romanTime} o’clock`,
    `CET ${now.toLocaleTimeString('en-GB')}`,
  ];
  worldClock.textContent = weirdLocations[Math.floor(Math.random() * weirdLocations.length)];
}

setInterval(updateClock, 1800);
updateClock();

setAlarm?.addEventListener('click', () => {
  const value = alarmInput?.value || '07:00';
  clockToast.textContent = `Alarm set for ${value}. It will not alarm anyone. That is the point.`;
});

let countdownTimer = null;
startCountdown?.addEventListener('click', () => {
  if (countdownTimer) clearInterval(countdownTimer);
  let seconds = Number(countdownInput?.value || 10);
  countdownDisplay.textContent = formatTime(seconds);
  clockToast.textContent = 'The countdown is trying its best to be difficult.';

  countdownTimer = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(countdownTimer);
      countdownDisplay.textContent = '00:00';
      clockToast.textContent = 'It reached zero, but no one was notified. Good work.';
      return;
    }

    seconds = Math.max(0, seconds - 1);
    countdownDisplay.textContent = formatTime(seconds);
    if (seconds === 0) {
      clearInterval(countdownTimer);
    }
  }, 1000);
});

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

const clickerScore = document.querySelector('#clicker-score');
const clickerButton = document.querySelector('#clicker-button');
const clickerToast = document.querySelector('#clicker-toast');

let count = 0;
clickerButton?.addEventListener('click', () => {
  count += 1;
  clickerScore.textContent = String(count);

  const milestones = [
    { value: 10, message: 'Go touch grass.' },
    { value: 25, message: 'Go touch grass.' },
    { value: 50, message: 'Go touch grass.' },
    { value: 100, message: 'Go touch grass.' },
  ];

  const reached = milestones.find((milestone) => count === milestone.value);
  if (reached) {
    clickerToast.textContent = reached.message;
  }
});

const appTitle = document.querySelector('.topbar h2');
if (appTitle) {
  appTitle.addEventListener('click', () => {
    appTitle.textContent = 'Essential+Essential+™';
  });
}
