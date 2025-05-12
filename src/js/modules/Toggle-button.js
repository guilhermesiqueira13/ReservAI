export class ToggleButton {
  constructor() {
    // Seleciona os botões de toggle e os elementos de preço/período
    this.toggleButtons = document.querySelectorAll(".toggle-btn");
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

    // Garante que os elementos necessários foram encontrados
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

  // Inicializa o toggle com o plano mensal e adiciona eventos
  init() {
    this.updatePrices("mensal");
    // Define o estado inicial do botão "Mensal" como selecionado
    const mensalButton = document.querySelector(
      '.toggle-btn[data-period="mensal"]'
    );
    if (mensalButton) {
      this.setSelectedButton(mensalButton);
    }
    this.bindEvents();
  }

  // Adiciona eventos de clique aos botões de toggle
  bindEvents() {
    this.toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const period = button.dataset.period;
        this.setSelectedButton(button);
        this.updatePrices(period);
        // Depuração: Verifica qual período foi selecionado
        console.log("Período selecionado:", period);
      });
    });
  }

  // Atualiza os preços e o texto do período com base no período selecionado
  updatePrices(period) {
    // Verifica se o período é válido
    if (this.prices.hasOwnProperty(period)) {
      // Mapeia os índices dos elementos de preço aos nomes dos planos
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

      // Atualiza o texto do período
      const periodText = period === "mensal" ? "por mês" : "por ano";
      this.periodElements.forEach((element) => {
        element.textContent = periodText;
      });
    } else {
      console.error(`Erro: Período "${period}" inválido.`);
    }
  }

  // Gerencia o estado selecionado dos botões de toggle
  setSelectedButton(selectedButton) {
    this.toggleButtons.forEach((button) => {
      button.classList.remove("selected");
    });
    selectedButton.classList.add("selected");
    // Depuração: Verifica qual botão foi selecionado
    console.log(
      "Botão selecionado:",
      selectedButton.textContent,
      selectedButton
    );
  }
}
