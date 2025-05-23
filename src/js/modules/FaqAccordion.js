export class Accordion {
  constructor(accordionSelector) {
    this.accordionItems = document.querySelectorAll(accordionSelector);
    this.init();
  }

  init() {
    console.log(
      "Inicializando acordeão com",
      this.accordionItems.length,
      "itens"
    );
    this.accordionItems.forEach((item, index) => {
      this.setupItem(item, index);
    });
  }

  setupItem(item, index) {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    if (!header || !content) {
      console.warn("Item sem header ou conteúdo:", item);
      return;
    }

    if (index === 0) {
      item.classList.add("active");
      content.style.height = `${content.scrollHeight}px`;
    } else {
      content.style.height = "0";
    }

    header.addEventListener("click", () => {
      console.log("Clicado no header do item:", index);
      const isActive = item.classList.contains("active");

      this.accordionItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          const otherContent = otherItem.querySelector(".accordion-content");
          otherContent.style.height = "0";
          console.log("Fechando item:", otherItem);
        }
      });

      if (isActive) {
        item.classList.remove("active");
        content.style.height = "0";
        console.log("Fechando item clicado:", index);
      } else {
        item.classList.add("active");
        content.style.height = `${content.scrollHeight}px`;
        console.log("Abrindo item clicado:", index);
      }
    });
  }
}
