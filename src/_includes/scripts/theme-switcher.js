const themePreferenceKey = "theme-preference";
const lightThemeValue = 'light';
const darkThemeValue = 'dark';
const noPreferenceValue = '';

const setThemePreference = (themeName) => {
    const bulmaThemeAttrName = 'data-theme';
    const htmlElement = document.documentElement;
    
    if (themeName === lightThemeValue || themeName === darkThemeValue) {const themePreferenceKey = "theme-preference";
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

        htmlElement.setAttribute(bulmaThemeAttrName, themeName);
    } else {
        // set back to system preference...
        htmlElement.removeAttribute(bulmaThemeAttrName);
    }
}

const saveThemePreference = (themeName) => {
    if (themeName === lightThemeValue || themeName === darkThemeValue) {
        localStorage.setItem(themePreferenceKey, themeName);
    } else {
        localStorage.removeItem(themePreferenceKey);
    }
}

const onClick = (themeName) => {
    setThemePreference(themeName);
    saveThemePreference(themeName);
}

const getThemePreference = () => {
  if (localStorage.getItem(themePreferenceKey)) {
    return localStorage.getItem(themePreferenceKey);
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? darkThemeValue : lightThemeValue;
  }
}

const setThemeButtonState = (button, active, activeClassName) => {
    button.setAttribute('aria-pressed', active);

    if (active) {
        button.classList.add(activeClassName);
    } else {
        button.classList.remove(activeClassName);
    }
}

export const registerThemeSwitch = () => {

    const preference = getThemePreference();
    if (preference) {
        if (preference === darkThemeValue || preference === lightThemeValue) {
            setThemePreference(preference);
        }
    } 
    // no preference - leave as system preference
    
    const bulmaActiveClass = 'is-active';
    
    const lightThemeId = "light-theme-toggle";
    const lightThemeButton = document.getElementById(lightThemeId);
    setThemeButtonState(lightThemeButton, preference === lightThemeValue, bulmaActiveClass);
    lightThemeButton.addEventListener("click", () => onClick(lightThemeValue));

    const darkThemeId = "dark-theme-toggle";
    const darkThemeButton = document.getElementById(darkThemeId);
    setThemeButtonState(darkThemeButton, preference === darkThemeValue, bulmaActiveClass);
    darkThemeButton.addEventListener("click", () => onClick(darkThemeValue));

    const systemThemeId ="system-theme-toggle";
    const systemThemeButton = document.getElementById(systemThemeId);
    setThemeButtonState(systemThemeButton, preference === noPreferenceValue, bulmaActiveClass);
    systemThemeButton.addEventListener("click", () => onClick(noPreferenceValue));
};
