export class Chatbot {
  constructor(toggleSelector, chatbotSelector) {
    this.responses = {
      initial: [
        (context) => `${context.greeting}, de boa? 😎 Sou o ReservAI, seu parceiro pra agendar consultas, cortes de cabelo, massagens ou qualquer parada! Fala 'agendar', 'marcar', 'reservar' ou 'quero agendar' pra começar!`,
        (context) => `${context.greeting}! 😊 Tô aqui como ReservAI pra te ajudar a marcar aquele serviço top, tipo consulta ou corte! Diz 'agendamento', 'quero marcar' ou 'reservar'!`,
        (context) => `${context.greeting}, e aí? 😄 Sou o ReservAI, bora agendar consultas, cortes ou o que rolar? Fala 'agendar' ou 'quero fazer um agendamento'!`,
        (context) => `${context.greeting}, beleza? 😎 Tô pronto pra te ajudar a marcar algo irado! É só dizer 'marcar', 'agendamento' ou 'quero agendar'!`,
      ],
      greeting: [
        (context) => `E aí, ${context.name || "tudo bem"}? 😄 Tô de boa por aqui! Bora agendar algo? Fala 'agendar', 'marcar' ou 'reservar'!`,
        (context) => `Opa, ${context.greeting.toLowerCase()}! 😎 Curti o papo, e tu, tá de boa? Diz 'agendamento' ou 'quero agendar' pra marcar algo!`,
        (context) => `Fala, ${context.name || "parceiro"}! 😊 Tô na área pra te ajudar. Quer marcar algo? É só dizer 'agendar' ou 'quero marcar'!`,
        (context) => `Oi, ${context.name || "de boa"}? 😄 Tô ligado, bora agendar aquele serviço top? Fala 'marcar' ou 'quero fazer um agendamento'!`,
      ],
      askingService: [
        (context) => `Eita, ${context.name || "você"}, bora agendar! 😄 Qual serviço você tá querendo? Tipo corte de cabelo, consulta, massagem...`,
        (context) => `Show, ${context.name || "parceiro"}! 😎 Me diz qual é o serviço, tipo exame ou massagem!`,
        (context) => `Tá na hora, ${context.name || "amigo"}! 😊 Qual serviço rola? Pode ser consulta, corte, qualquer coisa!`,
        (context) => `Massa, ${context.name || "você"}! 😄 Qual é a vibe? Corte de cabelo, consulta, massagem? Manda aí!`,
      ],
      askingTime: [
        (context) => `Massa, ${context.service ? `curti o ${context.service}!` : ""} 😎 Quando você quer marcar? (Ex.: hoje às 14h, amanhã às 9h ou 25/05 às 10h, entre 8h e 18h)`,
        (context) => `Beleza, ${context.service ? `${context.service} tá na área!` : ""} 😄 Me fala o dia e horário, tipo hoje às 15h ou sexta às 9h! (Das 8h às 18h, hein!)`,
        (context) => `Tô ligado, ${context.service ? `${context.service} é top!` : ""} 😊 Quando fica bom pra você? (Ex.: amanhã às 14h ou 25/05 às 10h, entre 8h e 18h)`,
        (context) => `Show, ${context.service ? `${context.service} é isso aí!` : ""} 😎 Manda o dia e horário, tipo hoje às 10h ou 25/05 às 14h! (Entre 8h e 18h, tá?)`,
      ],
      askingContact: [
        (context) => `Quase na reta final, ${context.name || "campeão"}! 🎉 Me passa seu nome e e-mail, tipo: João, joao@email.com.`,
        (context) => `Falta pouco, ${context.name || "você"}! 😄 Manda nome e e-mail, assim: Maria, maria@email.com.`,
        (context) => `Tá quase, ${context.name || "parceiro"}! 😎 Só preciso do seu nome e e-mail, tipo: Ana, ana@email.com.`,
        (context) => `Já tá na mão, ${context.name || "amigo"}! 😊 Manda seu nome e e-mail, tipo: Pedro, pedro@email.com.`,
      ],
      success: [
        (context) => `Mandou ver, ${context.name}! 🚀 Seu agendamento tá encaminhado. Confere o ${context.email} que logo tem novidade!`,
        (context) => `Arrasou, ${context.name}! 😎 Agendamento na mão! Dá uma olhada no ${context.email} pros próximos passos!`,
        (context) => `Tô impressionado, ${context.name}! 🎉 Tudo certinho, checa o ${context.email} que já já chega algo!`,
        (context) => `Massa, ${context.name}! 😄 Agendamento fechado! Fica de olho no ${context.email} pra mais detalhes!`,
      ],
      invalidInput: [
        "Vish, não saquei essa! 😅 Tenta 'agendar', 'marcar', 'reservar', 'quero agendar' ou 'fazer agendamento', ou me conta direitinho o que você quer!",
        "Eita, peguei um vento aqui! 😜 Fala 'agendamento', 'quero marcar' ou 'reservar', ou explica melhor pra mim?",
        "Hmm, tá meio confuso isso! 😄 Que tal 'agendar' ou 'quero fazer um agendamento' pra começar?",
        "Nossa, não entendi nadinha! 😅 Diz 'marcar', 'agendar' ou 'quero agendar' que a gente desenrola!",
      ],
      invalidContact: [
        "Peraí, esse contato tá zoado! 😕 Tenta de novo, tipo: João, joao@email.com.",
        "Nossa, faltou algo aí! 😊 Manda nome e e-mail direitinho, como: Maria, maria@email.com.",
        "Ops, esse contato não rolou! 😅 Tenta assim: Ana, ana@email.com.",
        "Eita, esse contato tá bugado! 😄 Manda certinho, tipo: Pedro, pedro@email.com.",
      ],
      invalidDateTime: [
        "Hmm, essa data tá meio bagunçada! 😅 Tenta algo tipo 'hoje às 14h', 'amanhã às 9h' ou '25/05 às 10h'.",
        "Eita, não captei esse horário! 😜 Manda algo como 'hoje às 15h' ou 'sexta às 9h' que dá certo!",
        "Poxa, essa data não colou! 😄 Tenta de novo, tipo 'amanhã às 14h' ou '25/05 às 10h'!",
        "Vish, essa data tá estranha! 😅 Manda algo tipo 'hoje às 10h' ou '25 de maio às 14h'!",
      ],
      pastDateTime: [
        "Ops, essa data já passou! 😅 Me fala uma data de hoje ou depois, tipo 'hoje às 14h' ou '25/05 às 10h'.",
        "Vish, não dá pra marcar no passado! 😜 Tenta algo como 'amanhã às 9h' ou 'sexta às 15h'.",
        "Eita, essa data não rola! 😄 Manda uma data atual ou futura, tipo 'hoje às 14h' ou '25/05 às 10h'!",
        "Nossa, essa data já era! 😅 Tenta algo tipo 'amanhã às 14h' ou '25 de maio às 10h'!",
      ],
      invalidTime: [
        "Hmm, esse horário não rola! 😅 Tenta algo entre 8h e 18h, tipo 'hoje às 14h' ou 'amanhã às 9h'.",
        "Eita, fora do horário comercial! 😜 Manda algo das 8h às 18h, tipo 'sexta às 15h'.",
        "Vish, esse horário tá off! 😄 Tenta entre 8h e 18h, tipo '25/05 às 10h'.",
        "Ops, não atendo nesse horário! 😅 Manda algo das 8h às 18h, tipo 'hoje às 14h'!",
      ],
      confirmService: [
        (context) => `Tô ligado, você quer ${context.service}, né? 😄 Confirma com 'sim', 'beleza' ou 'não', ou me diz outro serviço!`,
        (context) => `Beleza, ${context.service}? 😎 É isso mesmo? Diz 'sim', 'tá bom' ou 'não', ou troca o serviço!`,
        (context) => `Entendi, ${context.service}! 😊 Tá certo? Fala 'sim', 'ok' ou 'não', ou me diz outro!`,
        (context) => `Show, ${context.service}, é isso? 😄 Manda 'sim', 'pode ser' ou 'não', ou escolhe outro serviço!`,
      ],
      back: [
        "Sem drama, vamo voltar um pouco! 😊 O que você quer agora?",
        "Tranquilo, dando um passo pra trás! 😄 Fala aí como seguimos!",
        "Beleza, voltando rapidinho! 😎 Me diz o que rola!",
        "Tá de boa, vamo retroceder! 😊 E agora, qual é o plano?",
      ],
      cancel: [
        "Tá de boa, cancelei tudo! 😎 Quer recomeçar? Fala 'agendar', 'marcar', 'reservar' ou 'quero agendar'!",
        "Sem drama, zerei o papo! 😊 Diz 'agendamento' ou 'quero marcar' quando quiser voltar!",
        "Tudo certo, cancelado! 😄 Se quiser, é só falar 'agendar' ou 'quero fazer um agendamento'!",
        "Beleza, limpei tudo! 😎 Pra recomeçar, é só dizer 'marcar' ou 'quero agendar'!",
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
      hasWelcomed: false,
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
      initialKeywords: [
        "agendar",
        "agendamento",
        "quero agendar",
        "quero fazer um agendamento",
        "marcar",
        "fazer agendamento",
        "reservar",
        "quero marcar",
        "agendamento agora",
      ],
      maxHistorySteps: 5,
      businessHours: { start: 8, end: 18 }, // Horário comercial: 8h às 18h
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
  }

  assignDOMElements() {
    for (const key in this.domElements) {
      this[key] = document.querySelector(this.domElements[key]);
    }
  }

  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  }

  showWelcomeMessage() {
    const context = { greeting: this.getGreeting() };
    const welcomeMessage = this.getRandomResponse(this.responses.initial, context);
    this.addMessage(welcomeMessage, "bot-message");
    this.conversationState.hasWelcomed = true;
  }

  toggleChatbot() {
    this.chatbotElement.classList.toggle("active");
    this.floatingChatbotWrapper?.classList.toggle("active");
    const isActive = this.chatbotElement.classList.contains("active");

    if (isActive) {
      this.setElementVisibility(this.callToActionElement, false);
      this.setElementVisibility(this.toggleButtonElement, false);
      this.userInput?.focus();
      if (!this.conversationState.hasWelcomed) {
        setTimeout(() => this.showWelcomeMessage(), this.config.typingIndicatorDelay);
      }
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
    const lowerText = text.toLowerCase().trim();
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normaliza para comparar apenas datas

    // Regex para formatos de data e hora
    const dateRegex = /^(\d{1,2}\/\d{1,2}(\/\d{2,4})?|\d{1,2}\s*de\s*(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)(?:\s*de\s*\d{4})?)\s*(às)?\s*(\d{1,2}(?::\d{2})?\s*(h)?)?$/i;
    const dayRegex = /^(hoje|amanhã|(segunda|terça|quarta|quinta|sexta|sábado|domingo)(-feira)?|próxima\s+(segunda|terça|quarta|quinta|sexta|sábado|domingo))\s*(às)?\s*(\d{1,2}(?::\d{2})?\s*(h)?)?$/i;

    let parsedDate;
    let hours = 0;
    let minutes = 0;

    // Função para converter texto em objeto Date
    const parseDate = (day, month, year) => {
      const date = new Date();
      if (day && month) {
        year = year || date.getFullYear();
        if (year < 100) year += 2000;
        date.setFullYear(year, month - 1, day);
      }
      date.setHours(hours, minutes, 0, 0);
      return date;
    };

    // Mapeamento de meses
    const months = {
      janeiro: 1,
      fevereiro: 2,
      março: 3,
      abril: 4,
      maio: 5,
      junho: 6,
      julho: 7,
      agosto: 8,
      setembro: 9,
      outubro: 10,
      novembro: 11,
      dezembro: 12,
    };

    // Manipula "hoje" e "amanhã"
    if (lowerText.includes("hoje")) {
      parsedDate = new Date(now);
    } else if (lowerText.includes("amanhã")) {
      parsedDate = new Date(now);
      parsedDate.setDate(now.getDate() + 1);
    }
    // Manipula dias da semana
    else if (dayRegex.test(lowerText)) {
      const dayNames = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
      const dayMatch = lowerText.match(dayRegex);
      const targetDayName = dayMatch[1].startsWith("próxima") ? dayMatch[1].split(" ")[1] : dayMatch[1];
      const targetDay = dayNames.findIndex(day => targetDayName.startsWith(day));
      if (targetDay >= 0) {
        parsedDate = new Date(now);
        const currentDay = now.getDay();
        let daysToAdd = targetDay - currentDay;
        if (daysToAdd <= 0 || dayMatch[1].startsWith("próxima")) daysToAdd += 7;
        parsedDate.setDate(now.getDate() + daysToAdd);
      }
    }
    // Manipula formatos numéricos e textuais
    else if (dateRegex.test(lowerText)) {
      const numericMatch = lowerText.match(/^(\d{1,2})\/(\d{1,2})(\/(\d{2,4}))?/);
      const textMatch = lowerText.match(/(\d{1,2})\s*de\s*(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)(?:\s*de\s*(\d{4}))?/i);
      const timeMatch = lowerText.match(/(\d{1,2})(?::(\d{2}))?\s*(h)?/i);

      if (numericMatch) {
        const day = parseInt(numericMatch[1]);
        const month = parseInt(numericMatch[2]);
        const year = numericMatch[4] ? parseInt(numericMatch[4]) : now.getFullYear();
        parsedDate = parseDate(day, month, year);
      } else if (textMatch) {
        const day = parseInt(textMatch[1]);
        const month = months[textMatch[2].toLowerCase()];
        const year = textMatch[3] ? parseInt(textMatch[3]) : now.getFullYear();
        parsedDate = parseDate(day, month, year);
      }

      if (timeMatch) {
        hours = parseInt(timeMatch[1]);
        minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
        parsedDate?.setHours(hours, minutes);
      }
    }

    // Valida data e horário comercial
    if (parsedDate && !isNaN(parsedDate.getTime())) {
      const normalizedParsedDate = new Date(parsedDate);
      normalizedParsedDate.setHours(0, 0, 0, 0);
      if (normalizedParsedDate < now) return "past";
      if (hours < this.config.businessHours.start || hours >= this.config.businessHours.end) return "invalidTime";
      return true;
    }

    return false;
  }

  detectIntent(userText) {
    const lowerText = userText.toLowerCase().trim();
    if (lowerText.includes("voltar") || lowerText.includes("retroceder")) {
      return "back";
    }
    if (lowerText.includes("cancelar") || lowerText.includes("desistir")) {
      return "cancel";
    }
    if (["oi", "olá", "bom dia", "boa tarde", "boa noite", "e aí", "tudo bem", "opa", "fala"].some(g => lowerText.includes(g))) {
      return "greeting";
    }
    if (this.config.initialKeywords.some(keyword => lowerText.includes(keyword))) {
      return "start";
    }
    if (this.conversationState.step === "confirmService") {
      if (["sim", "s", "ok", "confirmo", "tá certo", "isso", "beleza", "tá bom", "pode ser"].some(word => lowerText.includes(word))) {
        return "confirm";
      }
      if (["não", "n", "nao", "não quero", "outro", "deixa pra lá", "trocar", "muda"].some(word => lowerText.includes(word))) {
        return "reject";
      }
    }
    if (this.conversationState.step === "askingService" && lowerText.match(/corte|consulta|massagem|exame/i)) {
      return "service";
    }
    if (this.conversationState.step === "askingTime") {
      const dateValidation = this.validateDateTime(lowerText);
      if (dateValidation === true) return "datetime";
      if (dateValidation === "past") return "pastDateTime";
      if (dateValidation === "invalidTime") return "invalidTime";
    }
    if (this.conversationState.step === "askingContact" && lowerText.includes("@")) {
      return "contact";
    }
    return "unknown";
  }

  getRandomResponse(responses, context = {}) {
    const selectedResponse = Array.isArray(responses)
      ? responses[Math.floor(Math.random() * responses.length)]
      : responses;
    return typeof selectedResponse === "function"
      ? selectedResponse(context)
      : selectedResponse;
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
    const context = { ...this.conversationState.data, greeting: this.getGreeting() };

    this.saveHistory(this.conversationState.step, this.conversationState.data);

    switch (this.detectIntent(userText)) {
      case "greeting":
        botResponse = this.getRandomResponse(this.responses.greeting, context);
        nextStep = this.conversationState.step; // Mantém o passo atual
        break;

      case "back":
        botResponse = this.getRandomResponse(this.responses.back);
        break;

      case "cancel":
        botResponse = this.getRandomResponse(this.responses.cancel);
        this.conversationState.step = "initial";
        this.conversationState.data = { service: null, date: null, time: null, name: null, email: null };
        break;

      case "start":
        if (this.conversationState.step === "initial") {
          botResponse = this.getRandomResponse(this.responses.askingService, context);
          nextStep = "askingService";
        } else {
          botResponse = this.getRandomResponse(this.responses.invalidInput);
        }
        break;

      case "service":
        if (this.conversationState.step === "askingService") {
          this.conversationState.data.service = userText;
          botResponse = this.getRandomResponse(this.responses.confirmService, { ...context, service: userText });
          nextStep = "confirmService";
        } else {
          botResponse = this.getRandomResponse(this.responses.invalidInput);
        }
        break;

      case "confirm":
        if (this.conversationState.step === "confirmService") {
          botResponse = this.getRandomResponse(this.responses.askingTime, context);
          nextStep = "askingTime";
        } else {
          botResponse = this.getRandomResponse(this.responses.invalidInput);
        }
        break;

      case "reject":
        if (this.conversationState.step === "confirmService") {
          this.conversationState.data.service = null;
          botResponse = this.getRandomResponse(this.responses.askingService, context);
          nextStep = "askingService";
        } else {
          botResponse = this.getRandomResponse(this.responses.invalidInput);
        }
        break;

      case "datetime":
        if (this.conversationState.step === "askingTime" || this.conversationState.step === "confirmService") {
          this.conversationState.data.date = userText;
          botResponse = this.getRandomResponse(this.responses.askingContact, context);
          nextStep = "askingContact";
        } else {
          botResponse = this.getRandomResponse(this.responses.invalidDateTime);
        }
        break;

      case "pastDateTime":
        botResponse = this.getRandomResponse(this.responses.pastDateTime);
        break;

      case "invalidTime":
        botResponse = this.getRandomResponse(this.responses.invalidTime);
        break;

      case "contact":
        if (this.conversationState.step === "askingContact") {
          const [name, email] = userText.split(",").map((s) => s.trim());
          if (name && email && this.validateEmail(email)) {
            this.conversationState.data.name = name;
            this.conversationState.data.email = email;
            botResponse = this.getRandomResponse(this.responses.success, { ...context, name, email });
            console.log("Lead capturado:", this.conversationState.data);
            nextStep = "initial";
            this.conversationState.data = { service: null, date: null, time: null, name: null, email: null };
          } else {
            botResponse = this.getRandomResponse(this.responses.invalidContact);
          }
        } else {
          botResponse = this.getRandomResponse(this.responses.invalidInput);
        }
        break;

      default:
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
    this.toggleButtonElement?.addEventListener("click", () => this.toggleChatbot());
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