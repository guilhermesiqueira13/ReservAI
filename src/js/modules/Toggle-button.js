export class ToggleButton {
  constructor() {
    // Seleciona os elementos do DOM
    this.toggleButtons = document.querySelectorAll(".toggle-btn");
    this.mensalButton = document.querySelector(
      '.toggle-btn[data-period="mensal"]'
    );
    this.anualButton = document.querySelector(
      '.toggle-btn[data-period="anual"]'
    );
    this.priceElements = document.querySelectorAll(".card-highlight-number");
    this.periodElements = document.querySelectorAll(".card-highlight-info");

    // Define os preços para cada plano (mensal e anual)
    this.prices = {
      mensal: {
        basico: "R$49",
        premium: "R$99",
        empresarial: "R$249",
      },
      anual: {
        basico: "R$490",
        premium: "R$990",
        empresarial: "R$2490",
      },
    };

    // Inicializa o estado e eventos
    this.init();
  }

  // Inicializa o toggle com o plano mensal e adiciona eventos
  init() {
    this.updatePrices("mensal");
    this.mensalButton.classList.add("active");
    this.bindEvents();
  }

  // Adiciona eventos de clique aos botões
  bindEvents() {
    this.mensalButton.addEventListener("click", () => {
      this.setActiveButton(this.mensalButton);
      this.updatePrices("mensal");
    });

    this.anualButton.addEventListener("click", () => {
      this.setActiveButton(this.anualButton);
      this.updatePrices("anual");
    });
  }

  // Atualiza os preços e o texto do período
  updatePrices(period) {
    // Atualiza os preços com base no período selecionado
    this.priceElements[0].textContent = this.prices[period].basico; // Card Básico
    this.priceElements[1].textContent = this.prices[period].premium; // Card Premium
    this.priceElements[2].textContent = this.prices[period].empresarial; // Card Empresarial

    // Atualiza o texto do período (por mês ou por ano)
    const periodText = period === "mensal" ? "por mês" : "por ano";
    this.periodElements.forEach((element) => {
      element.textContent = periodText;
    });
  }

  // Gerencia o estado ativo dos botões
  setActiveButton(activeButton) {
    this.toggleButtons.forEach((button) => {
      button.classList.remove("active");
    });
    activeButton.classList.add("active");
  }
}

// Instancia a classe quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new PlanosToggle();
});
