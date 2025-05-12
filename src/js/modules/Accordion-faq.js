export default class Accordion {
  constructor(accordionSelector) {
    this.accordionItems = document.querySelectorAll(accordionSelector);
    this.init();
  }

  init() {
    this.accordionItems.forEach((item, index) => {
      this.setupItem(item, index);
    });
  }

  setupItem(item, index) {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");
    const plusIcon = item.querySelector(".plus-icon");
    const minusIcon = item.querySelector(".minus-icon");

    // Valida elementos obrigatórios
    if (!header || !content) {
      console.warn("Accordion item is missing header or content:", item);
      return;
    }

    // Inicializa o estado do item
    this.setItemState(item, index === 0, content, plusIcon, minusIcon);

    // Adiciona evento de clique no header
    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Se o item clicado já está ativo, apenas fecha ele
      if (isActive) {
        this.setItemState(item, false, content, plusIcon, minusIcon);
        return;
      }

      // Fecha outros itens abertos
      this.accordionItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          this.setItemState(
            otherItem,
            false,
            otherItem.querySelector(".accordion-content"),
            otherItem.querySelector(".plus-icon"),
            otherItem.querySelector(".minus-icon")
          );
        }
      });

      // Abre o item clicado
      this.setItemState(item, true, content, plusIcon, minusIcon);
    });
  }

  setItemState(item, isActive, content, plusIcon, minusIcon) {
    item.classList.toggle("active", isActive);
    // Define a altura do conteúdo com base no estado
    if (isActive) {
      content.style.height = `${content.scrollHeight}px`;
    } else {
      content.style.height = "0px";
    }

    // Alterna ícones
    if (plusIcon) {
      plusIcon.style.display = isActive ? "none" : "inline-block";
    }
    if (minusIcon) {
      minusIcon.style.display = isActive ? "inline-block" : "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Accordion(".accordion-item");
});
