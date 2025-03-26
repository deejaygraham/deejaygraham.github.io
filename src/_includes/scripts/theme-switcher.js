const themePreferenceKey = "theme-preference";
const lightThemeValue = 'light';
const darkThemeValue = 'dark';

const setThemePreference = (themeName) => {
    const bulmaThemeAttrName = 'data-theme';
    const htmlElement = document.documentElement;
    
    if (themeName === lightThemeValue || themeName === darkThemeValue) {
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

/* eslint-disable-next-line */
const registerThemeSwitch = () => {

    const preference = getThemePreference();
    if (preference) {
        if (preference === darkThemeValue || preference === lightThemeValue) {
            setThemePreference(preference);
        }
    } 
    // no preference - leave as system preference
    
    const lightThemeId = "light-theme-toggle";
    const lightThemeButton = document.getElementById(lightThemeId);
    lightThemeButton.setAttribute('aria-pressed', preference === lightThemeValue);

    const bulmaActiveClass = 'is-active';
    
    if (preference === lightThemeValue) {
        lightThemeButton.classList.add(bulmaActiveClass);
    } else {
        lightThemeButton.classList.remove(bulmaActiveClass);
    }

    lightThemeButton.addEventListener("click", () => onClick(lightThemeValue));

    const darkThemeId = "dark-theme-toggle";
    const darkThemeButton = document.getElementById(darkThemeId);
    darkThemeButton.setAttribute('aria-pressed', preference === darkThemeValue);

    if (preference === darkThemeValue) {
        darkThemeButton.classList.add(bulmaActiveClass);
    } else {
        darkThemeButton.classList.remove(bulmaActiveClass);
    }
    
    darkThemeButton.addEventListener("click", () => onClick(darkThemeValue));

    const systemThemeId ="system-theme-toggle";
    const systemThemeButton = document.getElementById(systemThemeId);

    if (preference === '') {
        systemThemeButton.classList.add(bulmaActiveClass);
    } else {
        systemThemeButton.classList.remove(bulmaActiveClass);
    }
    systemThemeButton.addEventListener("click", () => onClick(''));
};
