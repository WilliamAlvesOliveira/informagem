'use strict'

export function switchMenu(button, container, icon) {
    const isInactive = container.classList.contains('inactive');

    if (isInactive) {
        icon.classList.add('rotate');
        container.classList.remove('inactive');
        requestAnimationFrame(() => container.classList.add('visible'));
    } else {
        icon.classList.remove('rotate');
        container.classList.remove('visible');
        container.classList.add('inactive');
    }

    button.setAttribute('aria-expanded', String(isInactive));
}
