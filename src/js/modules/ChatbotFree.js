export class Chatbot {
  constructor(toggleSelector, chatbotSelector) {
    this.responses = {
      initial: [
        "Oi! 😎 Sou o ReservAI, seu assistente pra agendar serviços como consultas, cortes de cabelo e mais! Digite 'agendar' pra começar!",
        "E aí! 😊 Sou o ReservAI, pronto pra te ajudar a marcar consultas, cortes de cabelo ou outros serviços! É só dizer 'agendar'!",
      ],
      askingService: [
        (context) =>
          `Beleza, ${
            context.name || "você"
          }! Qual serviço você quer? Tipo consulta, corte de cabelo... 😄`,
        (context) =>
          `Tranquilo! O que você quer agendar hoje? (Ex.: massagem, exame médico)`,
      ],
      askingTime: [
        (context) =>
          `Show, ${
            context.service ? `${context.service} marcado!` : ""
          } Quando fica bom pra você? (Ex.: amanhã às 14h ou 25/05 às 10h)`,
        (context) =>
          `Perfeito! 😊 Pra quando você quer esse ${
            context.service || "serviço"
          }? (Ex.: hoje às 15h)`,
      ],
      askingContact: [
        (context) =>
          `Quase na reta final, ${
            context.name || "amigo"
          }! 🎉 Me passa seu nome e e-mail (ex.: João, joao@email.com).`,
        (context) =>
          `Falta pouco! 😄 Me diz seu nome e e-mail, tipo: Maria, maria@email.com.`,
      ],
      success: [
        (context) =>
          `Valeu, ${context.name}! 🚀 Seu agendamento tá na mão. Dá uma olhada no ${context.email} pros próximos passos!`,
        (context) =>
          `Show de bola, ${context.name}! 😎 Solicitação enviada. Confere o ${context.email} que já já tem novidade!`,
      ],
      invalidInput: [
        "Ops, não peguei direito. 😅 Tente dizer 'agendar' ou me contar o que quer!",
        "Eita, acho que não entendi. 😜 Fala 'agendar' ou explica melhor pra mim?",
      ],
      invalidContact: [
        "Hmm, algo tá errado aí. 😕 Tenta de novo com nome e e-mail, tipo: João, joao@email.com.",
        "Peraí, faltou algo! 😊 Me passa nome e e-mail, como: Maria, maria@email.com.",
      ],
      invalidDateTime: [
        "Ops, essa data ou hora tá estranha. 😅 Tenta algo como 'amanhã às 14h' ou '25/05 às 10h'.",
        "Não rolou entender essa data. 😜 Pode mandar algo tipo 'hoje às 15h'?",
      ],
      confirmService: [
        (context) =>
          `Entendi, você quer ${context.service}, certo? 😄 Confirma pra mim ou diz se é outro!`,
      ],
      back: [
        "Beleza, voltando um passo! 😊 O que você quer fazer agora?",
        "Tranquilo, vamos dar um passo atrás! 😄 Me diz como continuar.",
      ],
      cancel: [
        "Sem problemas, cancelado! 😎 Quer recomeçar? É só dizer 'agendar'!",
        "Tudo certo, zerei o papo! 😊 Fala 'agendar' quando quiser começar.",
      ],
    };

    this.conversationState = {
      step: "initial",
      data: {
        service: null,
        date: null,
        time: null,
        name: null,
        email: null,
      },
      history: [],
    };

    this.domElements = {
      chatbotElement: chatbotSelector || "#chatbot",
      chatbotBody: "#chatbot-body",
      userInput: "#user-input",
      sendButton: "#chatbot .chatbot-input button",
      callToActionElement: ".chatbot-call-to-action",
      toggleButtonElement: toggleSelector || ".chatbot-toggle",
      floatingChatbotWrapper: ".floating-chatbot",
      closeButton: "#chatbot .chatbot-close-btn",
    };

    this.config = {
      scrollThreshold: 200,
      ctaDelayTime: 5000,
      messageProcessDelay: 800,
      typingIndicatorDelay: 400,
      initialKeyword: "agendar",
      maxHistorySteps: 5,
    };

    this.init();
  }

  init() {
    this.assignDOMElements();
    if (!this.chatbotElement || !this.chatbotBody || !this.userInput) {
      console.error("Erro: Elementos essenciais do chatbot não encontrados.");
      return;
    }
    this.initEventListeners();
    this.initScrollListener();
    this.initCallToActionDelay();
    this.showWelcomeMessage();
  }

  assignDOMElements() {
    for (const key in this.domElements) {
      this[key] = document.querySelector(this.domElements[key]);
    }
  }

  showWelcomeMessage() {
    const welcomeMessage = this.getRandomResponse(this.responses.initial);
    this.addMessage(welcomeMessage, "bot-message");
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
      this.setElementVisibility(
        this.callToActionElement,
        window.scrollY > this.config.scrollThreshold
      );
    }
  }

  addMessage(text, type) {
    const message = document.createElement("div");
    message.className = `chatbot-message ${type}`;
    const messageContent = document.createElement("div");
    messageContent.textContent = text;
    message.appendChild(messageContent);
    this.chatbotBody.appendChild(message);
    message.classList.add("active");
    this.chatbotBody.scrollTop = this.chatbotBody.scrollHeight;
  }

  showTypingIndicator() {
    this.addMessage("Digitando...", "bot-message typing");
    setTimeout(() => {
      const typingMessage = this.chatbotBody.querySelector(".typing");
      if (typingMessage) typingMessage.remove();
    }, this.config.messageProcessDelay);
  }

  sendMessage() {
    const userText = this.userInput.value.trim();
    if (!userText) return;

    this.addMessage(userText, "user-message");
    this.userInput.value = "";
    this.showTypingIndicator();

    setTimeout(() => {
      this.processMessage(userText);
    }, this.config.messageProcessDelay);
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateDateTime(text) {
    const dateRegex =
      /\d{1,2}\/\d{1,2}(\/\d{2,4})?|\d{1,2}h|\d{1,2}:\d{2}|amanhã|hoje|sexta|próxima\s+\w+/i;
    return dateRegex.test(text);
  }

  detectIntent(userText) {
    const lowerText = userText.toLowerCase().trim();
    if (lowerText.includes("voltar") || lowerText.includes("retroceder")) {
      return "back";
    }
    if (lowerText.includes("cancelar") || lowerText.includes("desistir")) {
      return "cancel";
    }
    if (lowerText.includes(this.config.initialKeyword)) {
      return "start";
    }
    if (
      this.conversationState.step === "askingService" &&
      lowerText.match(/corte|consulta|massagem|exame/i)
    ) {
      return "service";
    }
    if (
      this.conversationState.step === "askingTime" &&
      this.validateDateTime(lowerText)
    ) {
      return "datetime";
    }
    if (
      this.conversationState.step === "askingContact" &&
      lowerText.includes("@")
    ) {
      return "contact";
    }
    return "unknown";
  }

  getRandomResponse(responses, context = {}) {
    let selectedResponse = responses;
    if (Array.isArray(responses)) {
      selectedResponse =
        responses[Math.floor(Math.random() * responses.length)];
    }
    if (typeof selectedResponse === "function") {
      return selectedResponse(context);
    }
    return selectedResponse;
  }

  saveHistory(step, data) {
    this.conversationState.history.push({ step, data: { ...data } });
    if (this.conversationState.history.length > this.config.maxHistorySteps) {
      this.conversationState.history.shift();
    }
  }

  goBack() {
    if (this.conversationState.history.length > 0) {
      const previous = this.conversationState.history.pop();
      this.conversationState.step = previous.step;
      this.conversationState.data = { ...previous.data };
      return this.getRandomResponse(this.responses.back);
    }
    return this.getRandomResponse(this.responses.cancel);
  }

  processMessage(userText) {
    let botResponse = "";
    let nextStep = this.conversationState.step;
    const intent = this.detectIntent(userText);
    const context = { ...this.conversationState.data };

    this.saveHistory(this.conversationState.step, this.conversationState.data);

    switch (intent) {
      case "back":
        botResponse = this.getRandomResponse(this.responses.back);
        break;

      case "cancel":
        botResponse = this.getRandomResponse(this.responses.cancel);
        this.conversationState.step = "initial";
        this.conversationState.data = {
          service: null,
          date: null,
          time: null,
          name: null,
          email: null,
        };
        break;

      case "start":
        if (this.conversationState.step === "initial") {
          botResponse = this.getRandomResponse(
            this.responses.askingService,
            context
          );
          nextStep = "askingService";
        } else {
          botResponse = this.getRandomResponse(this.responses.invalidInput);
        }
        break;

      case "service":
        if (this.conversationState.step === "askingService") {
          this.conversationState.data.service = userText;
          botResponse = this.getRandomResponse(this.responses.confirmService, {
            service: userText,
          });
          nextStep = "confirmService";
        } else {
          botResponse = this.getRandomResponse(this.responses.invalidInput);
        }
        break;

      case "datetime":
        if (
          this.conversationState.step === "askingTime" ||
          this.conversationState.step === "confirmService"
        ) {
          this.conversationState.data.date = userText;
          botResponse = this.getRandomResponse(
            this.responses.askingContact,
            context
          );
          nextStep = "askingContact";
        } else {
          botResponse = this.getRandomResponse(this.responses.invalidDateTime);
        }
        break;

      case "contact":
        if (this.conversationState.step === "askingContact") {
          const [name, email] = userText.split(",").map((s) => s.trim());
          if (name && email && this.validateEmail(email)) {
            this.conversationState.data.name = name;
            this.conversationState.data.email = email;
            botResponse = this.getRandomResponse(this.responses.success, {
              name,
              email,
            });
            console.log("Lead capturado:", this.conversationState.data);
            nextStep = "initial";
            this.conversationState.data = {
              service: null,
              date: null,
              time: null,
              name: null,
              email: null,
            };
          } else {
            botResponse = this.getRandomResponse(this.responses.invalidContact);
          }
        } else {
          botResponse = this.getRandomResponse(this.responses.invalidInput);
        }
        break;

      case "unknown":
        botResponse = this.getRandomResponse(this.responses.invalidInput);
        break;
    }

    this.addMessage(botResponse, "bot-message");
    this.conversationState.step = nextStep;
  }

  initEventListeners() {
    this.userInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage();
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
        : "translateX(30px)";
      element.style.pointerEvents = isVisible ? "all" : "none";
    }
  }
}
