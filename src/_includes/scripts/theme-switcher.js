const themePreferenceKey = "theme-preference";
const lightThemeValue = 'light';
const darkThemeValue = 'dark';

/* eslint-disable-next-line */
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

/* eslint-disable-next-line */
const registerThemeSwitch = () => {
    const lightThemeId = "light-theme-toggle";
    const lightThemeButton = document.getElementById(lightThemeId);
    lightThemeButton.addEventListener("click", () => {
        setThemePreference(lightThemeValue);
        localStorage.setItem(themePreferenceKey, lightThemeValue);
    });

    const darkThemeId = "dark-theme-toggle";
    const darkThemeButton = document.getElementById(darkThemeId);
    darkThemeButton.addEventListener("click", () => {
        setThemePreference(darkThemeValue);
        localStorage.setItem(themePreferenceKey, darkThemeValue);
    });

    const systemThemeId ="system-theme-toggle";
    const systemThemeButton = document.getElementById(systemThemeId);
    systemThemeButton.addEventListener("click", () => {
        setThemePreference('');
        localStorage.removeItem(themePreferenceKey);
    });

    const preference = localStorage.getItem(themePreferenceKey);
    if (preference) {
        if (preference === darkThemeValue || preference === lightThemeValue) {
            setThemePreference(preference);
        }
    } 
    // no preference - leave as system preference
};
