// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
export const addBulmaBurgerMenu = () => {
    var burger = document.querySelector('.navbar-burger');
    if (!burger) {
        return;
    }

    var menu = document.querySelector('#' + burger.dataset.target);
    if (!menu) {
        return;
    }

    burger.addEventListener('click', function () {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
};
