'use strict'

export function enableScrollRestore(key = "scrollY") {
  
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-save-scroll]");
    if (link) {
      sessionStorage.setItem("shouldRestoreScroll", "true");
      sessionStorage.setItem(key, window.scrollY);
    } else {
      sessionStorage.removeItem("shouldRestoreScroll");
    }
  });

  // ao carregar a página, restaura se o flag estiver ativo
  window.addEventListener("load", () => {
    const shouldRestore = sessionStorage.getItem("shouldRestoreScroll");
    if (shouldRestore === "true") {
      const pos = sessionStorage.getItem(key);
      if (pos !== null) {
        window.scrollTo({
          top: pos,
          behavior: "smooth"
        });
      }
      sessionStorage.removeItem("shouldRestoreScroll"); // limpar após usar
    }
  });
}
