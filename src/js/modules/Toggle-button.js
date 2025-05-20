export class ToggleButton {
  constructor() {
    this.toggleButtons = document.querySelectorAll(".toggle-btn[data-period]");
    this.planosCardsContainer = document.querySelector(".planos-cards");
    this.priceElements = this.planosCardsContainer.querySelectorAll(
      ".card-highlight-number"
    );
    this.periodElements = this.planosCardsContainer.querySelectorAll(
      ".card-highlight-info"
    );
    this.prices = {
      mensal: {
        basico: "R$49,00",
        premium: "R$99,00",
        empresarial: "R$249,00",
      },
      anual: {
        basico: "R$490,00",
        premium: "R$990,00",
        empresarial: "R$2490,00",
      },
    };

    if (
      this.toggleButtons.length === 2 &&
      this.priceElements.length === 3 &&
      this.periodElements.length === 3
    ) {
      this.init();
    } else {
      console.error(
        `Erro de inicialização do ToggleButton: Esperado 2 botões de alternância, 3 elementos de preço e 3 elementos de período. Encontrado: ${this.toggleButtons.length} botões, ${this.priceElements.length} preços, ${this.periodElements.length} períodos.`
      );
    }
  }
  init() {
    const defaultButton = this.toggleButtons[0];
    if (defaultButton && defaultButton.dataset.period) {
      this.updatePrices(defaultButton.dataset.period);
      this.setSelectedButton(defaultButton);
    } else {
      console.warn("Botão padrão não encontrado ou sem atributo data-period.");
    }
    this.bindEvents();
  }

  bindEvents() {
    this.toggleButtons.forEach((button) => {
      if (!button.dataset.period) {
        console.warn("Botão de alternância sem atributo data-period:", button);
        return;
      }
      button.addEventListener("click", () => {
        this.setSelectedButton(button);
        this.updatePrices(button.dataset.period);
      });
      button.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          const nextButton =
            event.key === "ArrowRight"
              ? button.nextElementSibling
              : button.previousElementSibling;
          if (nextButton && nextButton.classList.contains("toggle-btn")) {
            nextButton.focus();
            this.setSelectedButton(nextButton);
            this.updatePrices(nextButton.dataset.period);
          }
        }
      });
    });
  }

  updatePrices(period) {
    if (!this.prices.hasOwnProperty(period)) {
      console.error(`Erro: Período "${period}" inválido.`);
      return;
    }

    const planOrder = ["basico", "premium", "empresarial"];
    this.priceElements.forEach((element, index) => {
      const plan = planOrder[index];
      if (this.prices[period].hasOwnProperty(plan)) {
        element.textContent = this.prices[period][plan];
      } else {
        console.error(
          `Erro: Preço para o plano "${plan}" não encontrado para o período "${period}".`
        );
      }
    });

    const periodText = period === "mensal" ? "por mês" : "por ano";
    this.periodElements.forEach((element) => {
      element.textContent = periodText;
    });
  }

  setSelectedButton(selectedButton) {
    this.toggleButtons.forEach((button) => {
      const isSelected = button === selectedButton;
      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-selected", isSelected ? "true" : "false");
    });
  }
}
