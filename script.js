const THEME_KEY = "hello-vibecoding-theme";
const GOAL_KEY = "hello-vibecoding-goal";
const NAME_KEY = "hello-vibecoding-name";

const clockEl = document.querySelector("#clock");
const helloForm = document.querySelector("#helloForm");
const nameInput = document.querySelector("#nameInput");
const responseEl = document.querySelector("#response");
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const themeLabel = document.querySelector("#themeLabel");
const goalForm = document.querySelector("#goalForm");
const goalInput = document.querySelector("#goalInput");
const savedGoalEl = document.querySelector("#savedGoal");
const clearGoalButton = document.querySelector("#clearGoalButton");

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatNow(date = new Date()) {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `⏰ ${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

function tickClock() {
  clockEl.textContent = formatNow();
}

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
  const isDark = nextTheme === "dark";
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "라이트모드" : "다크모드";
  themeToggle.setAttribute("aria-label", isDark ? "라이트모드 전환" : "다크모드 전환");
}

function greet(name) {
  const trimmed = name.trim();
  if (!trimmed) {
    responseEl.textContent = "이름을 입력한 뒤 인사하기를 눌러 주세요.";
    return;
  }

  localStorage.setItem(NAME_KEY, trimmed);
  responseEl.textContent = `${trimmed}님, 반가워요! 오늘의 첫 번째 바이브코딩을 응원합니다. 🎉`;
}

function renderGoal(goal) {
  if (!goal) {
    savedGoalEl.textContent = "아직 저장된 목표가 없어요.";
    return;
  }

  savedGoalEl.textContent = `오늘 목표: ${goal}`;
}

tickClock();
setInterval(tickClock, 1000);

const savedTheme = localStorage.getItem(THEME_KEY);
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

const savedName = localStorage.getItem(NAME_KEY);
if (savedName) {
  nameInput.value = savedName;
}

const savedGoal = localStorage.getItem(GOAL_KEY) || "";
goalInput.value = savedGoal;
renderGoal(savedGoal);

helloForm.addEventListener("submit", (event) => {
  event.preventDefault();
  greet(nameInput.value);
});

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
});

goalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const goal = goalInput.value.trim();
  if (!goal) {
    savedGoalEl.textContent = "목표를 입력한 뒤 저장해 주세요.";
    return;
  }

  localStorage.setItem(GOAL_KEY, goal);
  renderGoal(goal);
});

clearGoalButton.addEventListener("click", () => {
  localStorage.removeItem(GOAL_KEY);
  goalInput.value = "";
  renderGoal("");
});
