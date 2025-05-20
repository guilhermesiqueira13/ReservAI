export class Chatbot {
  constructor() {
    this.responses = [
      "Ótimo! Qual serviço você gostaria de agendar? (Ex.: Consulta, Corte de cabelo)",
      "Perfeito! Para quando você quer agendar? (Ex.: Amanhã, 14h)",
      "Agendamento simulado com sucesso! 🎉 Para ativar o teste grátis do ReservAI, digite seu nome e e-mail (ex.: João, joao@email.com).",
    ];

    this.conversationState = {
      step: "initial",
      data: {
        service: null,
        date: null,
        time: null,
        name: null,
        email: null,
      },
    };

    this.domElements = {
      chatbotElement: "#chatbot",
      chatbotBody: "#chatbot-body",
      userInput: "#user-input",
      sendButton: "#chatbot .chatbot-input button",
      callToActionElement: ".chatbot-call-to-action",
      toggleButtonElement: ".chatbot-toggle",
      floatingChatbotWrapper: ".floating-chatbot",
      closeButton: "#chatbot .chatbot-close-btn",
    };

    this.config = {
      scrollThreshold: 200,
      ctaDelayTime: 5000,
      messageProcessDelay: 500,
      initialKeyword: "agendar",
    };

    this.init();
  }

  init() {
    this.assignDOMElements();
    if (!this.chatbotElement || !this.chatbotBody || !this.userInput) {
      console.error(
        "Erro crítico: Elementos essenciais do chatbot não encontrados no DOM. O chatbot não será inicializado."
      );
      return;
    }
    this.initEventListeners();
    this.initScrollListener();
    this.initCallToActionDelay();
  }

  assignDOMElements() {
    for (const key in this.domElements) {
      this[key] = document.querySelector(this.domElements[key]);
    }
  }

  toggleChatbot() {
    this.chatbotElement.classList.toggle("active");
    this.floatingChatbotWrapper?.classList.toggle("active");

    const isActive = this.chatbotElement.classList.contains("active");

    if (isActive) {
      this.setElementVisibility(this.callToActionElement, false);
      this.setElementVisibility(this.toggleButtonElement, false);
      this.userInput?.focus();
    } else {
      this.setElementVisibility(this.toggleButtonElement, true);
      if (window.scrollY > this.config.scrollThreshold) {
        this.setElementVisibility(this.callToActionElement, true);
      } else {
        this.setElementVisibility(this.callToActionElement, false);
      }
    }
  }

  addMessage(text, type) {
    const message = document.createElement("div");
    message.className = `chatbot-message ${type}`;
    const messageContent = document.createElement("div");
    messageContent.textContent = text;
    message.appendChild(messageContent);
    this.chatbotBody.appendChild(message);
    this.chatbotBody.scrollTop = this.chatbotBody.scrollHeight;
  }

  sendMessage() {
    const userText = this.userInput.value.trim();
    if (!userText) return;

    this.addMessage(userText, "user-message");
    this.userInput.value = "";

    setTimeout(() => {
      this.processMessage(userText);
    }, this.config.messageProcessDelay);
  }

  processMessage(userText) {
    let botResponse = "";
    let nextStep = this.conversationState.step;
    const lowerCaseUserText = userText.toLowerCase();

    switch (this.conversationState.step) {
      case "initial":
        if (lowerCaseUserText === this.config.initialKeyword) {
          botResponse = this.responses[0];
          nextStep = "askingService";
        } else {
          botResponse = `Desculpe, não entendi. Digite '${
            this.config.initialKeyword.charAt(0).toUpperCase() +
            this.config.initialKeyword.slice(1)
          }' para começar!`;
        }
        break;

      case "askingService":
        this.conversationState.data.service = userText;
        botResponse = this.responses[1];
        nextStep = "askingTime";
        break;

      case "askingTime":
        this.conversationState.data.date = userText;
        botResponse = this.responses[2];
        nextStep = "askingContact";
        break;

      case "askingContact":
        const [name, email] = userText.split(",").map((s) => s.trim());
        if (name && email && email.includes("@")) {
          this.conversationState.data.name = name;
          this.conversationState.data.email = email;
          botResponse = `Obrigado, ${name}! Seu teste grátis foi solicitado. Verifique ${email} para os próximos passos!`;
          console.log("Lead capturado:", this.conversationState.data);
          nextStep = "initial";
        } else {
          botResponse =
            "Formato inválido. Por favor, digite seu nome e e-mail no formato: Nome, email@exemplo.com";
        }
        break;

      default:
        botResponse =
          "Desculpe, algo inesperado aconteceu. Vamos começar de novo. Digite 'Agendar' para iniciar.";
        nextStep = "initial";
        break;
    }

    this.addMessage(botResponse, "bot-message");
    this.conversationState.step = nextStep;
  }

  initEventListeners() {
    this.userInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    });
    this.sendButton?.addEventListener("click", () => this.sendMessage());
    this.toggleButtonElement?.addEventListener("click", () =>
      this.toggleChatbot()
    );
    this.closeButton?.addEventListener("click", () => this.toggleChatbot());
  }

  initScrollListener() {
    const handleScroll = () => {
      if (window.scrollY > this.config.scrollThreshold) {
        if (!this.chatbotElement.classList.contains("active")) {
          this.setElementVisibility(this.callToActionElement, true);
          this.setElementVisibility(this.toggleButtonElement, true);
        }
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }

  initCallToActionDelay() {
    setTimeout(() => {
      if (
        !this.chatbotElement.classList.contains("active") &&
        window.scrollY <= this.config.scrollThreshold
      ) {
        this.setElementVisibility(this.callToActionElement, true);
        this.setElementVisibility(this.toggleButtonElement, true);
      }
    }, this.config.ctaDelayTime);
  }

  setElementVisibility(element, isVisible) {
    if (element) {
      element.style.opacity = isVisible ? "1" : "0";
      element.style.transform = isVisible
        ? "translateX(0)"
        : "translateX(20px)";
      element.style.pointerEvents = isVisible ? "all" : "none";
    }
  }
}
