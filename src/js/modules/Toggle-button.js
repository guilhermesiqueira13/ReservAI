export class ToggleButton {
  constructor() {
    this.toggleButtons = document.querySelectorAll(".toggle-btn");
    this.priceElements = document.querySelectorAll(".card-highlight-number");
    this.periodElements = document.querySelectorAll(".card-highlight-info");

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
        "Erro: Elementos do DOM necessários para o ToggleButton não foram encontrados."
      );
    }
  }

  init() {
    this.updatePrices("mensal");
    const mensalButton = document.querySelector(
      '.toggle-btn[data-period="mensal"]'
    );
    if (mensalButton) {
      this.setSelectedButton(mensalButton);
    }
    this.bindEvents();
  }

  bindEvents() {
    this.toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const period = button.dataset.period;
        this.setSelectedButton(button);
        this.updatePrices(period);
        console.log("Período selecionado:", period);
      });
    });
  }

  updatePrices(period) {
    if (this.prices.hasOwnProperty(period)) {
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
    } else {
      console.error(`Erro: Período "${period}" inválido.`);
    }
  }

  setSelectedButton(selectedButton) {
    this.toggleButtons.forEach((button) => {
      button.classList.remove("selected");
    });
    selectedButton.classList.add("selected");
    console.log(
      "Botão selecionado:",
      selectedButton.textContent,
      selectedButton
    );
  }
}
