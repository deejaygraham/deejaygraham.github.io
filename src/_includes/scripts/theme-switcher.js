const themePreferenceKey = "theme-preference";
const lightThemeValue = 'light';
const darkThemeValue = 'dark';
const noPreferenceValue = '';

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

const setThemeButtonState = (button, active, activeClassName) = {
    button.setAttribute('aria-pressed', active);

    if (active) {
        button.classList.add(activeClassName);
    } else {
        button.classList.remove(activeClassName);
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
