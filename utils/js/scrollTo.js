'use strict';

export function enableSmoothScroll(containerSelector, offset = 0, afterScroll = null) {
    const container = typeof containerSelector === 'string'
        ? document.querySelector(containerSelector)
        : containerSelector;

    if (!container) return;

    const scrollElements = container.querySelectorAll('[data-scroll-to]');
    scrollElements.forEach(el => {
        el.style.cursor = 'pointer';

        el.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = el.getAttribute('data-scroll-to');
            if (!targetId) return;

            const targetSection = document.getElementById(targetId);
            if (!targetSection) return;

            const top = targetSection.getBoundingClientRect().top + window.pageYOffset + offset;
            window.scrollTo({ top, behavior: 'smooth' });

            if (typeof afterScroll === 'function') {
                afterScroll();
            }
        });

        el.setAttribute('tabindex', '0');
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                el.click();
            }
        });
    });
}
