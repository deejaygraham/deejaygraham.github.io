const themePreferenceKey = "theme-preference";
const lightThemeValue = "light";
const darkThemeValue = "dark";
const noPreferenceValue = "";
const activeClass = "d-btn-active";

const setThemePreference = (themeName) => {
  const htmlElement = document.documentElement;

  if (themeName === lightThemeValue || themeName === darkThemeValue) {
    htmlElement.setAttribute("data-theme", themeName);
  } else {
    // set back to system preference...
    htmlElement.removeAttribute("data-theme");
  }
};

const saveThemePreference = (themeName) => {
  if (themeName === lightThemeValue || themeName === darkThemeValue) {
    localStorage.setItem(themePreferenceKey, themeName);
  } else {
    localStorage.removeItem(themePreferenceKey);
  }
};

const getStoredPreference = () => localStorage.getItem(themePreferenceKey);

const applyStoredOrSystemTheme = () => {
  const stored = getStoredPreference();
  if (stored === darkThemeValue || stored === lightThemeValue) {
    setThemePreference(stored);
  }
};

const setThemeButtonState = (button, active) => {
  button.setAttribute("aria-pressed", active);

  if (active) {
    button.classList.add(activeClass);
  } else {
    button.classList.remove(activeClass);
  }
};

const updateThemeButtons = (lightThemeButton, darkThemeButton, systemThemeButton) => {
  const stored = getStoredPreference();
  setThemeButtonState(lightThemeButton, stored === lightThemeValue);
  setThemeButtonState(darkThemeButton, stored === darkThemeValue);
  setThemeButtonState(systemThemeButton, !stored);
};

export const registerThemeSwitch = () => {
  applyStoredOrSystemTheme();

  const lightThemeButton = document.getElementById("light-theme-toggle");
  const darkThemeButton = document.getElementById("dark-theme-toggle");
  const systemThemeButton = document.getElementById("system-theme-toggle");

  const onClick = (themeName) => {
    setThemePreference(themeName);
    saveThemePreference(themeName);
    updateThemeButtons(lightThemeButton, darkThemeButton, systemThemeButton);
  };

  updateThemeButtons(lightThemeButton, darkThemeButton, systemThemeButton);

  lightThemeButton.addEventListener("click", () => onClick(lightThemeValue));
  darkThemeButton.addEventListener("click", () => onClick(darkThemeValue));
  systemThemeButton.addEventListener("click", () => onClick(noPreferenceValue));
};
