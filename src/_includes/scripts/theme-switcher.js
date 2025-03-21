
/* eslint-disable-next-line */
const registerThemeSwitch = () => {
    const themePreferenceKey = "-theme";
    const lightThemeValue = 'light';
    const darkThemeValue = 'dark';

    const lightThemeId = "light-theme-toggle";
    const lightThemeButton = document.getElementById(lightThemeId);
    lightThemeButton.addEventListener("click", () => {

        localStorage.setItem(themePreferenceKey, lightThemeValue);
    });

    const darkThemeId = "dark-theme-toggle";
    const darkThemeButton = document.getElementById(darkThemeId);
    darkThemeButton.addEventListener("click", () => {

        localStorage.setItem(themePreferenceKey, darkThemeValue);
    });

    const systemThemeId ="system-theme-toggle";
    const systemThemeButton = document.getElementById(systemThemeId);
    systemThemeButton.addEventListener("click", () => {

        localStorage.removeItem(themePreferenceKey);
    });

    const preference = localStorage.getItem(themePreferenceKey);
    if (preference) {
        if (preference === darkThemeValue) {

        } else if (preference === lightThemeValue) {

        }
    } 
    // no preference - leave as system preference
};