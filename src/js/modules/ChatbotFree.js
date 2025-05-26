export class Chatbot {
  constructor(config = {}) {
    this.chatbot = document.getElementById("chatbot");
    this.toggleBtn = document.querySelector(".chatbot-toggle");
    this.callToAction = document.querySelector(".chatbot-call-to-action");
    this.closeBtn = this.chatbot.querySelector(".chatbot-close-btn");
    this.input = document.getElementById("user-input");
    this.sendBtn = this.chatbot.querySelector(".chatbot-input button");
    this.chatBody = document.getElementById("chatbot-body");
    this.conversationState = {};
    this.typingEl = null;

    this.init();
  }

  init() {
    this.toggleBtn.addEventListener("click", () => this.open());
    this.closeBtn.addEventListener("click", () => this.close());
    this.sendBtn.addEventListener("click", () => this.handleUserInput());
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.handleUserInput();
    });

    this.sendBotMultiMessages([
      "Olá! 👋 Eu sou o ReservAI, seu assistente de agendamentos.",
      "Posso te ajudar a iniciar um teste grátis, entender como o ReservAI funciona, ou até mesmo te dar dicas de agendamento.",
      "Como posso te ajudar hoje?",
    ]);

    const callToAction = this.callToAction;
    if (callToAction) {
      callToAction.style.opacity = "1";
      callToAction.style.transform = "translateX(0)";
      callToAction.style.pointerEvents = "auto";

      setTimeout(() => {
        callToAction.style.opacity = "0";
        callToAction.style.transform = "translateX(20px)";
        callToAction.style.pointerEvents = "none";
      }, 5000);
    }
  }

  open() {
    this.chatbot.classList.add("active");
    this.input.focus();
    if (this.toggleBtn) this.toggleBtn.style.display = "none";
    if (this.callToAction) this.callToAction.style.display = "none";
  }

  close() {
    this.chatbot.classList.remove("active");
    if (this.toggleBtn) this.toggleBtn.style.display = "flex";
    if (this.callToAction) this.callToAction.style.display = "block";
  }

  handleUserInput() {
    const userMessage = this.input.value.trim();
    if (!userMessage) return;

    this.appendMessage(userMessage, "user");
    this.input.value = "";

    setTimeout(() => {
      const response = this.generateBotResponse(userMessage);
      if (Array.isArray(response)) {
        this.sendBotMultiMessages(response);
      } else {
        this.sendBotMessage(response);
      }
    }, 500);
  }

  appendMessage(message, sender = "bot") {
    const msgEl = document.createElement("div");
    msgEl.className = `chat-message ${sender}`;
    msgEl.textContent = message;
    this.chatBody.appendChild(msgEl);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  showTypingIndicator() {
    if (this.typingEl) return;
    this.typingEl = document.createElement("div");
    this.typingEl.className = "chat-message bot typing-indicator";
    this.typingEl.textContent = "ReservAI está digitando...";
    this.chatBody.appendChild(this.typingEl);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  hideTypingIndicator() {
    if (this.typingEl) {
      this.chatBody.removeChild(this.typingEl);
      this.typingEl = null;
    }
  }

  sendBotMessage(message) {
    this.showTypingIndicator();
    setTimeout(() => {
      this.hideTypingIndicator();
      this.appendMessage(message, "bot");
    }, 1200);
  }

  sendBotMultiMessages(messages, delay = 3000) {
    let i = 0;
    const sendNext = () => {
      if (i >= messages.length) {
        this.hideTypingIndicator();
        return;
      }
      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.appendMessage(messages[i], "bot");
        i++;
        sendNext();
      }, delay);
    };
    sendNext();
  }

  matchIntent(message, patterns) {
    const doc = window
      .nlp(message)
      .normalize({ plurals: true, verbs: true, contractions: true });
    const normalized = doc
      .text()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase();

    return patterns.some((pattern) => {
      const normalizedPattern = pattern
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase();
      return normalized.includes(normalizedPattern);
    });
  }

  generateBotResponse(userMessage) {
    const msg = window
      .nlp(userMessage)
      .normalize({ plurals: true, verbs: true, contractions: true })
      .text()
      .toLowerCase();

    if (
      this.matchIntent(msg, [
        "como funciona",
        "explicar",
        "entender o reservai",
        "o que é",
        "me explica",
        "como vc funciona",
        "como voce funciona",
        "como o sistema funciona",
        "como é o funcionamento",
      ])
    ) {
      return this.explainHowItWorks();
    }

    if (
      this.matchIntent(msg, [
        "teste",
        "grátis",
        "gratuito",
        "começar",
        "iniciar",
        "quero testar",
        "quero começar",
        "testar gratis",
        "como testar",
        "como faço para testar",
        "como comeco",
      ])
    ) {
      this.conversationState.freeTrial = true;
      return "Ótimo! Para iniciar seu teste gratuito, por favor, informe seu nome.";
    }

    if (this.conversationState.freeTrial && !this.conversationState.name) {
      this.conversationState.name = userMessage;
      return "Perfeito! Agora informe seu e-mail para ativarmos seu teste.";
    }

    if (
      this.conversationState.freeTrial &&
      this.conversationState.name &&
      msg.includes("@")
    ) {
      this.conversationState = {};
      return "Obrigado! Seu teste está ativo por 7 dias. Aproveite ao máximo o ReservAI!";
    }

    if (
      this.matchIntent(msg, ["dicas", "agendamento", "melhorar agendamentos"])
    ) {
      return this.provideSchedulingTips();
    }

    if (
      this.matchIntent(msg, [
        "preço",
        "valor",
        "planos",
        "quanto custa",
        "mensalidade",
        "quanto pago",
        "custo",
      ])
    ) {
      return this.providePlansInfo();
    }

    if (
      this.matchIntent(msg, [
        "atendo",
        "clientes por mês",
        "interações",
        "volume",
        "quantos atendimentos",
        "tenho",
        "atendimento mensal",
      ]) ||
      msg.match(/\d+\s?(clientes|interações|atendimentos)/)
    ) {
      return this.recommendPlanBasedOnVolume(msg);
    }

    if (this.matchIntent(msg, ["obrigado", "valeu", "muito obrigado"])) {
      return "De nada! Fico feliz em ajudar. Se precisar de mais alguma coisa, é só chamar! 😊";
    }

    const onlyGreeting =
      this.matchIntent(msg, [
        "olá",
        "oi",
        "bom dia",
        "boa tarde",
        "boa noite",
      ]) &&
      !msg.includes("como") &&
      !msg.includes("?") &&
      msg.split(" ").length <= 4;

    if (onlyGreeting) {
      return "Olá! Como posso te auxiliar hoje? Posso te ajudar com um teste, uma explicação sobre o sistema ou algumas dicas!";
    }

    return [
      "Desculpe, não entendi exatamente o que você quis dizer 😅",
      "Posso te ajudar com:",
      "- Iniciar um teste gratuito",
      "- Entender como funciona",
      "- Ver planos e preços",
      "- Dicas para agendamentos",
      "Sobre o que quer falar?",
    ];
  }

  explainHowItWorks(intent = null) {
    const blocos = {
      geral: [
        `O ReservAI te ajuda a atender melhor seus clientes! 🚀`,
        `É uma solução prática e eficiente para qualquer tipo de negócio!`,
        `Quer saber mais sobre algum ponto específico ou prefere já começar um teste?`,
      ],
      agendamento: [
        `Nós agendamos automaticamente os seus serviços — sem complicação.`,
        `O cliente escolhe o horário disponível e pronto!`,
        `Você ganha tempo e evita erros manuais.`,
      ],
      reagendamento: [
        `Se o cliente precisar mudar o horário, o ReservAI cuida do reagendamento pra você.`,
        `Ele pode alterar a reserva direto pelo link enviado, sem precisar te chamar.`,
        `Você é avisado automaticamente sobre qualquer mudança.`,
      ],
      googleAgenda: [
        `Tudo é sincronizado com seu Google Agenda — sem esforço.`,
        `Assim, você visualiza seus compromissos em tempo real e evita sobreposições.`,
        `A sincronização é automática e segura.`,
      ],
    };

    if (intent && blocos[intent]) {
      return blocos[intent];
    }

    return [
      ...blocos.geral.slice(0, 1),
      blocos.agendamento[0],
      blocos.reagendamento[0],
      blocos.googleAgenda[0],
      ...blocos.geral.slice(1),
    ];
  }

  provideSchedulingTips() {
    return [
      `Claro! Aqui vão algumas dicas para otimizar seus agendamentos com o ReservAI:`,
      `🔒 Mantenha sua agenda atualizada: bloqueie pausas e compromissos pessoais.`,
      `📝 Descreva bem seus serviços: detalhes ajudam os clientes a escolherem corretamente.`,
      `📲 Use lembretes automáticos: reduza faltas com mensagens antes dos agendamentos.`,
      `📊 Analise seus dados: veja horários de pico e serviços mais populares.`,
      `Quer mais detalhes sobre alguma dessas dicas? É só me dizer!`,
    ];
  }

  providePlansInfo() {
    return [
      `Claro! Aqui estão os planos do ReservAI:`,
      `📦 Básico: R$ 49,90/mês (ou R$ 499,00/ano)
  - 1 chatbot ativo
  - 500 interações/mês
  - API oficial da Twilio
  - Chatbots baseados em escolhas
  - Envio de mensagens em massa`,
      `💼 Premium: R$ 99,90/mês (ou R$ 999,00/ano)
  - Tudo do Básico +
  - 5 chatbots ativos
  - 5.000 interações/mês
  - Integrações avançadas
  - Suporte 24/7`,
      `🏢 Empresarial: R$ 149,90/mês (ou R$ 1.499,00/ano)
  - Tudo do Premium +
  - Chatbots ilimitados
  - Interações ilimitadas
  - Integrações customizadas
  - Suporte de conta dedicado`,
      `Se quiser, posso te ajudar a escolher o melhor plano para o seu negócio 😉`,
      `Me diga quantos atendimentos você costuma ter por mês, e eu te recomendo o plano ideal!`,
    ];
  }

  recommendPlanBasedOnVolume(message) {
    const numberMatch = message.match(/\d+/);
    if (!numberMatch) {
      return "Se puder me informar uma média de atendimentos mensais, consigo te recomendar o plano ideal!";
    }

    const volume = parseInt(numberMatch[0]);

    if (volume < 500) {
      return "Pelo seu volume, o plano Básico já atende muito bem! Simples, direto e com ótimo custo-benefício. 😊";
    } else if (volume <= 5000) {
      return "Com esse volume, o Premium é o mais indicado. Ele oferece 5.000 interações e mais recursos de integração e suporte!";
    } else {
      return "Para esse volume alto, o Empresarial é o ideal. Ele oferece interações ilimitadas e suporte personalizado.";
    }
  }
}
