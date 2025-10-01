'use strict';

/**
 * Inicializa o comportamento de auto-hide para um menu.
 * @param {string} selector - Seletor CSS do elemento alvo.
 * @param {number} delay - Tempo em milissegundos antes de esconder o menu.
 * @param {string} showClass - Classe CSS usada para mostrar o menu.
 */
export function setupAutoHideMenu(selector = '[data-auto-hide]', delay = 2000, showClass = 'show') {
    const menu = document.querySelector(selector);
    if (!menu) {
        console.warn(`Elemento não encontrado para o seletor: ${selector}`);
        return;
    }

    let timer;

    function showButtons() {
        clearTimeout(timer);
        menu.classList.add(showClass);
        timer = setTimeout(() => {
            menu.classList.remove(showClass);
        }, delay);
    }

    window.addEventListener('load', showButtons);
    window.addEventListener('scroll', showButtons);
    window.addEventListener('click', showButtons);

    menu.addEventListener('mouseenter', () => clearTimeout(timer));
    menu.addEventListener('mouseleave', () => {
        timer = setTimeout(() => {
            menu.classList.remove(showClass);
        }, delay);
    });
}