'use strict'

/**
 * Módulo Slide Menu
 * -----------------
 * Controla a abertura e fechamento de um menu lateral com transição suave.
 * 
 * Requisitos de HTML:
 * - Um container principal do menu com o atributo `[data-slide-menu]`
 * - Um botão dentro do menu com `[data-slide-menu-btn]`
 * - Um elemento de texto dentro do botão `[data-slide-menu-btn-text]`
 * - Um ícone ou seta dentro do botão `[data-slide-menu-btn-orientation]`
 * - Um container de opções dentro do menu com `[data-options]` (usado para calcular a largura)
 * 
 * Como usar:
 * 1. Inclua este script como módulo ES6 (`type="module"`).
 * 2. Certifique-se que o HTML possui os atributos mencionados acima.
 * 3. Importe e chame `toggleSlideMenu()` para alternar o menu ou use os eventos já configurados.
 * 4. A largura do menu fechado é calculada automaticamente e armazenada na variável CSS `--option-menu`.
 * 5. O menu se ajusta automaticamente ao redimensionar a tela.
 * 
 * Exemplo de HTML mínimo:
 * 
 * <div data-slide-menu>
 *   <button data-slide-menu-btn>
 *     <span data-slide-menu-btn-text>Índice</span>
 *     <span data-slide-menu-btn-orientation>➤</span>
 *   </button>
 *   <nav data-options>
 *     <!-- itens do menu -->
 *   </nav>
 * </div>
 */

// Seletores principais

const menu = document.querySelector('[data-slide-menu]')
let menuBtn, btnText, menuText, arrow


if(!menu){
    console.warn('Não foi possível encontrar um menu')
}else{
    menuBtn = menu.querySelector('[data-slide-menu-btn]')
    btnText = menuBtn.querySelector('[data-slide-menu-btn-text]')
    menuText = btnText.textContent
    arrow = menuBtn.querySelector('[data-slide-menu-btn-orientation]')
}


/**
 * Calcula a largura do container de opções dentro do menu
 * e define a variável CSS --option-menu como translateX(-largura).
 * Isso permite que o CSS saiba qual deve ser a posição "fechada" do menu.
 */
function setMenuClosedVar(menu) {
    const options = menu.querySelector('[data-options]')
    if (!options) {
        console.log('data-options não encontrado')
        return
    }

    const width = options.getBoundingClientRect().width
    document.documentElement.style.setProperty("--option-menu", `translateX(-${width}px)`)
}

/**
 * Alterna o estado do menu (abrir/fechar):
 * - adiciona/remove classes open-menu e close-menu
 * - atualiza o texto do botão (Abrir/Fechar)
 * - controla ícone de seta, classes de estilo e atributos de acessibilidade
 */
export function toggleSlideMenu() {
    setMenuClosedVar(menu) // garante que a largura esteja correta
    const isClosed = menu.classList.contains('close-menu')

    if (isClosed) {
        // Abrir menu
        menu.classList.remove('close-menu')
        menu.classList.add('open-menu')

        btnText.textContent = `Fechar ${menuText}`
        menuBtn.classList.remove('menu-close-btn')
        menuBtn.classList.add('menu-open-btn')
        arrow.classList.add('rotate')

        menuBtn.setAttribute('aria-expanded', 'true')
        menuBtn.classList.add('btn-active')
        menu.setAttribute('aria-hidden', 'false')
    } else {
        // Fechar menu
        const focused = document.activeElement
        if (menu.contains(focused)) focused.blur()

        menu.classList.remove('open-menu')
        menu.classList.add('close-menu')

        btnText.textContent = `Abrir ${menuText}`
        menuBtn.classList.remove('menu-open-btn')
        menuBtn.classList.add('menu-close-btn')
        arrow.classList.remove('rotate')

        menuBtn.setAttribute('aria-expanded', 'false')
        menuBtn.classList.remove('btn-active')
        menu.setAttribute('aria-hidden', 'true')
    }
}

// Eventos: click e teclado
if(menuBtn){
    menuBtn.addEventListener('click', toggleSlideMenu)
    menuBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleSlideMenu()
        }
    })
}

// Recalcula a largura no carregamento da página e quando a tela é redimensionada
if(menu){
    window.addEventListener("load", () => setMenuClosedVar(menu))
    window.addEventListener("resize", () => setMenuClosedVar(menu))
}
