export class Chatbot {
  static STATES = {
    INITIAL: "initial",
    ASKING_SERVICE: "askingService",
    CONFIRM_SERVICE: "confirmService",
    ASKING_TIME: "askingTime",
    ASKING_CONTACT: "askingContact",
  };

  responses = {
    initial: [
      (context) =>
        `${context.greeting}, tudo certo, ${
          context.name || ""
        }? Sou o ReservAI, seu assistente virtual! O que você gostaria de fazer hoje?`,
      (context) =>
        `${context.greeting}! Tô aqui pra te ajudar, ${
          context.name || "amigo(a)"
        }. O que você quer fazer?`,
      (context) =>
        `${context.greeting}, e aí, ${
          context.name || "tudo bem"
        }? Sou o ReservAI, seu bot de agendamentos. Bora marcar algo?`,
    ],
    askingService: [
      (context) =>
        `${context.greeting}, perfeito, ${
          context.name || ""
        }! Sou o ReservAI, seu bot de agendamentos. Qual serviço você quer agendar?`,
      (context) =>
        `${context.greeting}, ${
          context.name || "amigo(a)"
        }! Tô aqui pra te ajudar. Me diz qual é o serviço que você deseja marcar.`,
      (context) =>
        `show! Agora me conta: qual serviço você está procurando, ${
          context.name || "amigo(a)"
        }?`,
    ],
    askingTime: [
      (context) =>
        `Show, ${context || "você"}! Você quer ${
          context.service ? `${context.service}` : "um serviço"
        }. E quando você quer marcar? Me fala o dia e horário, tipo 'amanhã de manhã' ou 'sexta à tarde'.`,
      (context) =>
        `Beleza, ${context || "amigo(a)"}! Você escolheu ${
          context.service ? `${context.service}` : "um serviço"
        }. Agora, me diz o dia e horário que você prefere, como 'próxima quarta às 14h'.`,
      (context) =>
        `Entendido, ${context || "você"}! Qual dia e horário fica bom pra ${
          context.service ? `${context.service}` : "o serviço"
        }? Pode ser algo como 'daqui a 2 dias às 10h'.`,
    ],
    askingContact: [
      (context) =>
        `Quase lá, ${context || "você"}! Pra confirmar o agendamento de ${
          context.service || "seu serviço"
        } em ${
          context.date || "seu horário"
        }, preciso do seu nome completo e e-mail.`,
      (context) =>
        `Falta pouco, ${
          context || "amigo(a)"
        }! Por favor, me informe seu nome e e-mail pra gente confirmar ${
          context.service || "o serviço"
        } em ${context.date || "seu horário"}.`,
      (context) =>
        `Pra finalizar, ${
          context.name || ""
        }! Só preciso do seu nome e e-mail pra confirmar o agendamento de ${
          context.service || "seu serviço"
        }.`,
    ],
    success: [
      (context) =>
        `Feito, ${context.name}! ✅ Seu agendamento de ${context.service} para ${context.date} foi encaminhado. Confere o ${context.email} que logo tem novidade!`,
      (context) =>
        `Agendamento confirmado, ${context.name}! 🎉 Você marcou ${context.service} para ${context.date}. Fique de olho no seu e-mail ${context.email} para os próximos passos.`,
      (context) =>
        `Show, ${context.name}! Tudo certinho. Seu ${context.service} está agendado para ${context.date}. Checa o ${context.email} que já já chega a confirmação!`,
    ],
    invalidInput: [
      (context) =>
        `Ops, não entendi, ${
          context.name || ""
        }! 😕 Tente 'agendar', 'marcar' ou 'quero agendar', ou me conta direitinho o que você quer fazer!`,
      (context) =>
        `Hmm, parece que não saquei essa, ${
          context.name || "amigo(a)"
        }Tente usar termos como 'agendamento', 'quero marcar' ou 'reservar', ou explique de outro jeito.`,
      (context) =>
        `Desculpa, não consegui compreender, ${
          context.name || ""
        } Que tal começar com 'agendar' ou 'quero fazer um agendamento' para eu te ajudar?`,
    ],
    invalidContact: [
      (context) =>
        `Esse contato parece incompleto ou incorreto, ${
          context.name || ""
        }. 🤔 Por favor, me informe seu nome e e-mail novamente. Ex: *João Silva, joao.silva@email.com*.`,
      (context) =>
        `Ops, o formato do nome ou e-mail está inválido, ${
          context.name || "amigo(a)"
        }Tente de novo, como: *Maria Souza, maria.souza@provedor.com*.`,
      (context) =>
        `Não consegui validar o contato, ${
          context.name || ""
        }Poderia me passar seu nome e e-mail novamente, por favor?`,
    ],
    invalidDateTime: [
      (context) =>
        `Hmm, não consegui entender essa data ou horário, ${
          context.name || ""
        }. 🗓️ Tente algo como 'amanhã de manhã', 'sexta à tarde' ou '25/05 às 14h'. Como você gostaria de agendar?`,
      (context) =>
        `Ops, não entendi o dia ou horário que você mencionou, ${
          context.name || "amigo(a)"
        }. 😕 Que tal tentar 'próxima quarta às 10h' ou 'daqui a 2 dias às 15h'?`,
      (context) =>
        `Eita, acho que esse formato de data/hora não funcionou, ${
          context.name || ""
        }Pode dizer algo como 'hoje às 16h' ou 'próxima semana na quinta de manhã'?`,
    ],
    pastDateTime: [
      (context) =>
        `Essa data/hora já passou, ${
          context.name || ""
        }! 🕰️ Me fala uma data de hoje ou no futuro, tipo 'hoje às 14h' ou 'amanhã de manhã'.`,
      (context) =>
        `Não dá pra agendar no passado, ${
          context.name || "amigo(a)"
        }! Tente uma data no presente ou futuro, como 'próxima sexta à tarde' ou 'daqui a 2 dias às 15h'.`,
      (context) =>
        `Essa data já foi, ${
          context.name || ""
        }! Me informa uma data atual ou futura, por favor. Ex: 'quarta-feira às 12h' ou 'amanhã às 16h'.`,
    ],
    invalidTime: [
      (context) =>
        `Ops, esse horário não rola, ${
          context.name || ""
        }! Nosso atendimento é das 8h às 18h. Tente algo como 'amanhã às 14h' ou 'sexta às 9h'.`,
      (context) =>
        `Vish, fora do horário comercial, ${
          context.name || "amigo(a)"
        }! ⏰ Marca entre 8h e 18h, tipo 'próxima quarta às 15h' ou 'hoje às 10h'.`,
      (context) =>
        `Eita, não consigo agendar nesse horário, ${
          context.name || ""
        }! Nosso horário é das 8h às 18h. Que tal 'amanhã de manhã' ou 'quinta à tarde'?`,
    ],
    confirmService: [
      (context) =>
        `Entendi: você quer ${context.service || "um serviço"}, certo, ${
          context.name || ""
        }? Me diga 'sim' para confirmar ou o nome de outro serviço se eu entendi errado.`,
      (context) =>
        `Confirmando: ${context.service || "esse serviço"}? É isso mesmo, ${
          context.name || "amigo(a)"
        }? Se não, por favor, me diga qual serviço você quer.`,
      (context) =>
        `Ok, ${context.name || ""}! Você escolheu ${
          context.service || "esse serviço"
        }. Está correto? Se não for, pode me falar outro serviço.`,
    ],
    back: [
      (context) =>
        `Sem problemas, ${
          context.name || ""
        }! Voltamos um passo. O que você gostaria de fazer agora?`,
      (context) =>
        `Tranquilo, ${
          context.name || "amigo(a)"
        }! Podemos rever. Em que posso te ajudar neste momento?`,
      (context) =>
        `Ok, ${
          context.name || ""
        }! Vamos retroceder. Qual é a sua próxima instrução?`,
    ],
    cancel: [
      (context) =>
        `Agendamento cancelado com sucesso, ${
          context.name || ""
        }! Se precisar de algo, é só falar 'agendar' ou 'quero marcar'. 😉`,
      (context) =>
        `Cancelado, ${
          context.name || "amigo(a)"
        }! Tudo limpo. Quando quiser recomeçar, diga 'agendamento' ou 'quero marcar'.`,
      (context) =>
        `Ok, ${
          context.name || ""
        }! Cancelei o processo. Se mudar de ideia, é só falar 'agendar' novamente!`,
    ],
    noHistory: [
      (context) =>
        `Opa, não tem como voltar mais, ${
          context.name || ""
        }! 😅 Estamos no começo. Me diz, quer 'agendar' ou fazer outra coisa?`,
      (context) =>
        `Eita, já estamos no início, ${
          context.name || "amigo(a)"
        }! 😜 Bora começar de novo? Fala 'agendar' ou 'marcar' pra gente seguir!`,
      (context) =>
        `Sem histórico pra voltar, ${
          context.name || ""
        }! 😛 Que tal começar com 'quero agendar' ou 'marcar'?`,
    ],
    help: [
      (context) =>
        `Claro, ${
          context.name || ""
        }! Estou aqui pra te ajudar. 😊 Você pode dizer 'agendar', 'marcar' ou pedir ajuda com algo específico. O que você precisa?`,
      (context) =>
        `Beleza, ${
          context.name || "amigo(a)"
        }! Posso te ajudar com agendamentos ou dúvidas. Tente 'quero agendar' ou me diga o que você quer saber.`,
      (context) =>
        `Sem problema, ${
          context.name || ""
        }! Me fala o que você precisa: 'agendar', 'cancelar' ou qualquer dúvida que tenha!`,
    ],
  };

  config = {
    scrollThreshold: 200,
    ctaDelayTime: 5000,
    messageProcessDelay: 800,
    typingIndicatorDelay: 400,
    maxHistorySteps: 5,
    businessHours: { start: 8, end: 18 },
    confidenceThreshold: 0.7,
  };

  trainingData = [
    { text: "agendar", intent: "start" },
    { text: "quero fazer um agendamento", intent: "start" },
    { text: "quero agendar", intent: "start" },
    { text: "quero um agendamento", intent: "start" },
    { text: "quero agendamento", intent: "start" },
    { text: "boa tarde", intent: "start" },
    { text: "quero agendar", intent: "start" },
    { text: "marcar", intent: "start" },
    { text: "quero marcar", intent: "start" },
    { text: "fazer agendamento", intent: "start" },
    { text: "gostaria de reservar", intent: "start" },
    { text: "preciso de um horário", intent: "start" },
    { text: "me ajuda a marcar", intent: "start" },
    { text: "pode agendar pra mim", intent: "start" },
    { text: "agendar consulta", intent: "start" },
    { text: "marcar uma consulta", intent: "start" },
    { text: "queria reservar um horário", intent: "start" },
    { text: "vou agendar algo", intent: "start" },
    { text: "tem como marcar pra mim", intent: "start" },
    { text: "agendamento agora", intent: "start" },
    { text: "agendarr", intent: "start" },
    { text: "marcarrr", intent: "start" },
    { text: "quero um horario", intent: "start" },
    { text: "oi", intent: "greeting" },
    { text: "olá", intent: "greeting" },
    { text: "bom dia", intent: "greeting" },
    { text: "boa tarde", intent: "greeting" },
    { text: "boa noite", intent: "greeting" },
    { text: "e aí", intent: "greeting" },
    { text: "tudo bem", intent: "greeting" },
    { text: "salve", intent: "greeting" },
    { text: "eai tudo joia", intent: "greeting" },
    { text: "fala aí", intent: "greeting" },
    { text: "oi tudo de boa", intent: "greeting" },
    { text: "alô", intent: "greeting" },
    { text: "e ae", intent: "greeting" },
    { text: "sim", intent: "confirm" },
    { text: "ok", intent: "confirm" },
    { text: "confirmo", intent: "confirm" },
    { text: "tá certo", intent: "confirm" },
    { text: "isso mesmo", intent: "confirm" },
    { text: "beleza", intent: "confirm" },
    { text: "pode ser", intent: "confirm" },
    { text: "tudo certo", intent: "confirm" },
    { text: "vamos nessa", intent: "confirm" },
    { text: "ta bom", intent: "confirm" },
    { text: "perfeito", intent: "confirm" },
    { text: "exato", intent: "confirm" },
    { text: "show", intent: "confirm" },
    { text: "tá de boa", intent: "confirm" },
    { text: "não", intent: "reject" },
    { text: "n", intent: "reject" },
    { text: "não quero", intent: "reject" },
    { text: "outro", intent: "reject" },
    { text: "muda", intent: "reject" },
    { text: "errado", intent: "reject" },
    { text: "prefiro outra coisa", intent: "reject" },
    { text: "nao eh isso", intent: "reject" },
    { text: "trocado", intent: "reject" },
    { text: "quero mudar", intent: "reject" },
    { text: "não é assim", intent: "reject" },
    { text: "voltar", intent: "back" },
    { text: "retroceder", intent: "back" },
    { text: "volta", intent: "back" },
    { text: "passo anterior", intent: "back" },
    { text: "volta um pouco", intent: "back" },
    { text: "voltar atrás", intent: "back" },
    { text: "cancelar", intent: "cancel" },
    { text: "desistir", intent: "cancel" },
    { text: "parar", intent: "cancel" },
    { text: "encerrar", intent: "cancel" },
    { text: "cancela", intent: "cancel" },
    { text: "quero parar", intent: "cancel" },
    { text: "deixa pra lá", intent: "cancel" },
    { text: "abandonar", intent: "cancel" },
    { text: "ajuda", intent: "help" },
    { text: "me ajuda", intent: "help" },
    { text: "como faço", intent: "help" },
    { text: "o que posso fazer", intent: "help" },
    { text: "como funciona", intent: "help" },
    { text: "me explica", intent: "help" },
    { text: "como agendar", intent: "help" },
    { text: "como marcar", intent: "help" },
    { text: "to perdido", intent: "help" },
    { text: "nao sei como fazer", intent: "help" },
  ];

  constructor(toggleSelector, chatbotSelector) {
    this.conversationState = {
      step: Chatbot.STATES.INITIAL,
      data: { service: null, date: null, time: null, name: null, email: null },
      history: [],
      hasWelcomed: false, // Esta flag é a chave para o comportamento desejado
      contextTopic: null,
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

  toggleChatbot() {
    this.chatbotElement.classList.toggle("active");
    this.floatingChatbotWrapper?.classList.toggle("active");
    const isActive = this.chatbotElement.classList.contains("active");

    if (isActive && !this.conversationState.hasWelcomed) {
      this.setElementVisibility(this.callToActionElement, false);
      this.setElementVisibility(this.toggleButtonElement, false);
      this.userInput?.focus();
      // A primeira saudação será enviada aqui
      this.addMessage(
        this.getRandomResponse(this.responses.initial, {
          greeting: this.getGreeting(),
          name: this.conversationState.data.name,
        }),
        "bot-message"
      );
      this.conversationState.hasWelcomed = true; // Define como verdadeiro após a primeira saudação
    } else if (!isActive) {
      this.setElementVisibility(this.toggleButtonElement, true);
      this.setElementVisibility(
        this.callToActionElement,
        window.scrollY > this.config.scrollThreshold
      );
    }
  }

  addMessage(text, type) {
    if (!text) return;
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

    setTimeout(
      () => this.processMessage(userText),
      this.config.messageProcessDelay
    );
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateDateTime(text) {
    const lowerText = this.normalizeText(text).trim();
    const now = new Date("2025-05-22T16:11:00-03:00"); // Updated to 16:11 of 22/05/2025
    now.setHours(0, 0, 0, 0);

    const dateRegex = [
      /^(\d{1,2})\/(\d{1,2})(\/(\d{2,4}))?/,
      /^(\d{1,2})\s*(de)?\s*(janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s*(de\s*(\d{4}))?/i,
      /^(hoje|amanha|depois\s*de\s*amanha|daqui\s*(a)?\s*(\d+)\s*dias?|pr[oó]xima\s*(semana|segunda|terca|quarta|quinta|sexta|sabado|domingo|mes)|((segunda|terca|quarta|quinta|sexta|sabado|domingo)(-feira)?)(\s*(na)?\s*(pr[oó]xima\s*(semana))?)?)/i,
    ];

    const timeRegex = /(?:às\s*)?(\d{1,2})(?::(\d{2})|h(\d{2})?)?\s*(h)?/i;
    const periodRegex = /(de\s*(manh[aã]|tarde|noite))/i;

    let parsedDate;
    let hours = 0;
    let minutes = 0;
    let periodAdjusted = false;

    const months = {
      janeiro: 1,
      fevereiro: 2,
      marco: 3,
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

    const dayNames = [
      "domingo",
      "segunda",
      "terca",
      "quarta",
      "quinta",
      "sexta",
      "sabado",
    ];

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

    for (const regex of dateRegex) {
      const dateMatch = lowerText.match(regex);
      if (dateMatch) {
        if (dateMatch[0].includes("hoje")) {
          parsedDate = new Date(now);
        } else if (dateMatch[0].includes("amanha")) {
          parsedDate = new Date(now);
          parsedDate.setDate(now.getDate() + 1);
        } else if (dateMatch[0].includes("depois de amanha")) {
          parsedDate = new Date(now);
          parsedDate.setDate(now.getDate() + 2);
        } else if (dateMatch[0].includes("daqui")) {
          const daysToAdd = parseInt(dateMatch[3] || dateMatch[2]);
          parsedDate = new Date(now);
          parsedDate.setDate(now.getDate() + daysToAdd);
        } else if (dateMatch[0].includes("próxima semana")) {
          parsedDate = new Date(now);
          parsedDate.setDate(now.getDate() + 7);
          const subMatch = lowerText.match(
            /pr[oó]xima\s*semana\s*(na)?\s*(segunda|terca|quarta|quinta|sexta|sabado|domingo)/i
          );
          if (subMatch) {
            const targetDayName = subMatch[2];
            const targetDay = dayNames.findIndex((day) =>
              targetDayName.startsWith(day)
            );
            if (targetDay >= 0) {
              const currentDay = parsedDate.getDay();
              let daysToAdd = targetDay - currentDay;
              if (daysToAdd < 0) daysToAdd += 7;
              parsedDate.setDate(parsedDate.getDate() + daysToAdd);
            }
          }
        } else if (dateMatch[0].includes("próxima mes")) {
          parsedDate = new Date(now);
          parsedDate.setMonth(now.getMonth() + 1);
          parsedDate.setDate(1);
        } else if (
          dateMatch[0].match(
            /segunda|terca|quarta|quinta|sexta|sabado|domingo/i
          )
        ) {
          const targetDayName = dateMatch[0].startsWith("próxima")
            ? dateMatch[0].split(" ")[1]
            : dateMatch[0].replace("-feira", "");
          const targetDay = dayNames.findIndex((day) =>
            targetDayName.startsWith(day)
          );
          if (targetDay >= 0) {
            parsedDate = new Date(now);
            const currentDay = now.getDay();
            let daysToAdd = targetDay - currentDay;
            if (
              daysToAdd <= 0 ||
              dateMatch[0].startsWith("próxima") ||
              dateMatch[0].includes("próxima semana")
            )
              daysToAdd += 7;
            parsedDate.setDate(now.getDate() + daysToAdd);
          }
        } else if (dateMatch[1] && dateMatch[2]) {
          const day = parseInt(dateMatch[1]);
          const month = parseInt(dateMatch[2]);
          const year = dateMatch[4]
            ? parseInt(dateMatch[4])
            : now.getFullYear();
          parsedDate = parseDate(day, month, year);
        } else if (dateMatch[1] && dateMatch[3]) {
          const day = parseInt(dateMatch[1]);
          const month = months[dateMatch[3].toLowerCase()];
          const year = dateMatch[5]
            ? parseInt(dateMatch[5])
            : now.getFullYear();
          parsedDate = parseDate(day, month, year);
        }
        break;
      }
    }

    const timeMatch = lowerText.match(timeRegex);
    if (timeMatch) {
      hours = parseInt(timeMatch[1]);
      minutes =
        timeMatch[2] || timeMatch[3]
          ? parseInt(timeMatch[2] || timeMatch[3])
          : 0;
    }

    const periodMatch = lowerText.match(periodRegex);
    if (periodMatch) {
      const period = periodMatch[1].toLowerCase();
      if (period.includes("manhã") && hours >= 12) {
        hours -= 12;
      } else if (period.includes("tarde") && hours < 12) {
        hours += 12;
      } else if (period.includes("noite")) {
        if (hours < 12) hours += 12;
        if (hours < 18) hours = 18;
      }
      periodAdjusted = true;
    }

    if (!timeMatch && periodMatch) {
      const period = periodMatch[1].toLowerCase();
      if (period.includes("manhã")) {
        hours = 9;
      } else if (period.includes("tarde")) {
        hours = 14;
      } else if (period.includes("noite")) {
        hours = 18;
      }
      minutes = 0;
      periodAdjusted = true;
    }

    if (!parsedDate && (timeMatch || periodMatch)) {
      parsedDate = new Date(now);
    }

    if (parsedDate) {
      parsedDate.setHours(hours, minutes, 0, 0);
    }

    if (parsedDate && !isNaN(parsedDate.getTime())) {
      const normalizedParsedDate = new Date(parsedDate);
      normalizedParsedDate.setHours(0, 0, 0, 0);
      if (normalizedParsedDate < now) return "past";
      if (
        hours < this.config.businessHours.start ||
        hours >= this.config.businessHours.end ||
        (hours === this.config.businessHours.end && minutes > 0)
      ) {
        return "invalidTime";
      }
      if (
        lowerText.match(/segunda|terca|quarta|quinta|sexta|sabado|domingo/i) &&
        !periodMatch &&
        !timeMatch
      ) {
        const inputDayName = lowerText.match(
          /(segunda|terca|quarta|quinta|sexta|sabado|domingo)/i
        )[1];
        const parsedDay = parsedDate.getDay();
        const expectedDay = dayNames.findIndex((day) =>
          inputDayName.startsWith(day)
        );
        if (parsedDay !== expectedDay) return "invalidDateTime";
      }
      // Se a data e hora forem válidas, armazene-as
      this.conversationState.data.date = parsedDate.toLocaleDateString("pt-BR");
      this.conversationState.data.time = parsedDate.toLocaleTimeString(
        "pt-BR",
        { hour: "2-digit", minute: "2-digit" }
      );
      return true;
    }
    return "invalidDateTime";
  }

  tokenizeAndStem(text) {
    const tokens = this.normalizeText(text).split(/\s+/);
    return tokens
      .map((token) => {
        return token
          .replace(
            /(ando|endo|indo|ar|er|ir|ado|ido|ção|ções|amento|mento|s)$/g,
            ""
          )
          .replace(/([aeiou])([aeiou])[aeiou]+/g, "$1$2");
      })
      .filter((token) => token.length > 2);
  }

  normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  detectIntent(userText) {
    const lowerText = this.normalizeText(userText);
    const tokens = this.tokenizeAndStem(userText);

    const currentHour = new Date().getHours();
    const timeOfDay =
      currentHour < 12 ? "morning" : currentHour < 18 ? "afternoon" : "night";

    let bestIntent = "unknown";
    let bestMatchCount = 0;

    this.trainingData.forEach(({ text, intent }) => {
      const trainingTokens = this.tokenizeAndStem(text);
      const matchCount = tokens.filter((token) =>
        trainingTokens.includes(token)
      ).length;
      if (matchCount > bestMatchCount) {
        bestMatchCount = matchCount;
        bestIntent = intent;
      }
    });

    if (this.conversationState.contextTopic === "agendamento") {
      // Modificação aqui: Se já demos as boas-vindas, não detecte "greeting" novamente, a menos que seja o estado inicial
      if (
        bestIntent === "greeting" &&
        this.conversationState.step !== Chatbot.STATES.INITIAL &&
        this.conversationState.hasWelcomed
      ) {
        bestIntent = "unknown"; // Ignora saudações se já passou do primeiro contato
      }
      if (
        bestIntent === "confirm" &&
        this.conversationState.step !== Chatbot.STATES.CONFIRM_SERVICE
      ) {
        bestIntent = "unknown";
      }
    }

    if (bestIntent === "start" && !this.conversationState.data.service) {
      this.conversationState.contextTopic = "agendamento";
    } else if (bestIntent === "help") {
      this.conversationState.contextTopic = "ajuda";
    } else if (bestIntent === "cancel") {
      this.conversationState.contextTopic = null;
    }

    const intentsByState = {
      [Chatbot.STATES.INITIAL]: () => {
        if (bestIntent === "start" && !this.conversationState.data.service)
          return "start";
        // Somente detecta "greeting" no estado INITIAL se ainda não houver recebido as boas-vindas
        if (
          bestIntent === "greeting" &&
          !this.conversationState.hasWelcomed &&
          ((lowerText.includes("dia") && timeOfDay === "morning") ||
            (lowerText.includes("tarde") && timeOfDay === "afternoon") ||
            (lowerText.includes("noite") && timeOfDay === "night") ||
            !/(dia|tarde|noite)/i.test(lowerText))
        ) {
          return "greeting";
        }
        if (bestIntent === "help") return "help";
        if (bestIntent === "back") return "back";
        if (bestIntent === "cancel") return "cancel";
        return "unknown";
      },
      [Chatbot.STATES.ASKING_SERVICE]: () => {
        if (lowerText.match(/corte|consulta|massagem|exame|manicure|pedicure/i))
          return "service";
        if (bestIntent === "back") return "back";
        if (bestIntent === "cancel") return "cancel";
        if (bestIntent === "help") return "help";
        return "unknown";
      },
      [Chatbot.STATES.CONFIRM_SERVICE]: () => {
        if (bestIntent === "confirm") return "confirm";
        if (bestIntent === "reject") return "reject";
        if (bestIntent === "back") return "back";
        if (bestIntent === "cancel") return "cancel";
        if (bestIntent === "help") return "help";
        return "unknown";
      },
      [Chatbot.STATES.ASKING_TIME]: () => {
        if (bestIntent === "back") return "back";
        if (bestIntent === "cancel") return "cancel";
        if (bestIntent === "help") return "help";
        return this.validateDateTime(userText);
      },
      [Chatbot.STATES.ASKING_CONTACT]: () => {
        if (bestIntent === "back") return "back";
        if (bestIntent === "cancel") return "cancel";
        if (bestIntent === "help") return "help";
        // Check for common separators for name and email
        if (
          lowerText.includes("@") &&
          (lowerText.includes(",") || lowerText.split(" ").length > 1)
        )
          return "contact";
        return "invalidContact";
      },
    };

    return intentsByState[this.conversationState.step]?.() || "unknown";
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
      return this.getRandomResponse(this.responses.back, {
        name: this.conversationState.data.name,
      });
    }
    return this.getRandomResponse(this.responses.noHistory, {
      name: this.conversationState.data.name,
    });
  }

  processMessage(userText) {
    const intent = this.detectIntent(userText);
    const context = {
      ...this.conversationState.data,
      greeting: this.getGreeting(),
    };
    let botResponse = "";
    let nextStep = this.conversationState.step;

    this.saveHistory(this.conversationState.step, this.conversationState.data);

    if (intent === "back") {
      botResponse = this.goBack();
      nextStep = this.conversationState.step;
    } else if (intent === "cancel") {
      botResponse = this.getRandomResponse(this.responses.cancel, context);
      this.conversationState.data = {
        service: null,
        date: null,
        time: null,
        name: null,
        email: null,
      };
      nextStep = Chatbot.STATES.INITIAL;
      this.conversationState.hasWelcomed = false; // Reinicia a saudação para a próxima vez que o chat for aberto
    } else if (intent === "help") {
      botResponse = this.getRandomResponse(this.responses.help, context);
      nextStep = this.conversationState.step; // Permanece no estado atual
    } else {
      const stateConfig =
        this.stateMachine[this.conversationState.step][intent] ||
        this.stateMachine[this.conversationState.step].default;

      if (stateConfig.saveData) {
        const newData = stateConfig.saveData(userText);
        this.conversationState.data = {
          ...this.conversationState.data,
          ...newData,
        };
        context.service = this.conversationState.data.service;
        context.date = this.conversationState.data.date;
      }

      botResponse = this.getRandomResponse(
        this.responses[stateConfig.response],
        {
          ...context,
          service: this.conversationState.data.service || "um serviço",
          date: this.conversationState.data.date || "seu horário",
          name: this.conversationState.data.name || "",
        }
      );

      if (stateConfig.clearData) {
        stateConfig.clearData.forEach(
          (key) => (this.conversationState.data[key] = null)
        );
      }

      if (stateConfig.resetOnSuccess && intent === "contact") {
        const parts = userText.split(",").map((s) => s.trim());
        let name = parts[0];
        let email = parts[1];

        // Se não houver vírgula, tente analisar nome e e-mail a partir de espaços
        if (!email && parts.length > 1) {
          const lastPart = parts[parts.length - 1];
          if (this.validateEmail(lastPart)) {
            email = lastPart;
            name = parts.slice(0, parts.length - 1).join(" ");
          }
        }

        if (name && email && this.validateEmail(email)) {
          this.conversationState.data.name = name;
          this.conversationState.data.email = email;
          console.log("Lead capturado:", this.conversationState.data);
          botResponse = this.getRandomResponse(this.responses.success, {
            ...this.conversationState.data,
            greeting: this.getGreeting(),
          });
          this.conversationState.data = {
            service: null,
            date: null,
            time: null,
            name: null,
            email: null,
          };
          this.conversationState.hasWelcomed = false; // Reinicia para permitir saudação no próximo ciclo
        } else {
          botResponse = this.getRandomResponse(
            this.responses.invalidContact,
            context
          );
          nextStep = this.conversationState.step; // Permanece no estado atual em caso de contato inválido
        }
      }

      nextStep = stateConfig.nextState || this.conversationState.step;
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

  stateMachine = {
    [Chatbot.STATES.INITIAL]: {
      start: {
        response: "askingService",
        nextState: Chatbot.STATES.ASKING_SERVICE,
      },
      greeting: { response: "greeting", nextState: Chatbot.STATES.INITIAL }, // Mantém o estado inicial para saudações
      help: { response: "help", nextState: Chatbot.STATES.INITIAL },
      back: { response: "noHistory", nextState: Chatbot.STATES.INITIAL }, // "noHistory" já que não há para onde voltar do inicial
      cancel: { response: "cancel", nextState: Chatbot.STATES.INITIAL },
      default: { response: "invalidInput", nextState: Chatbot.STATES.INITIAL },
    },
    [Chatbot.STATES.ASKING_SERVICE]: {
      service: {
        response: "confirmService",
        nextState: Chatbot.STATES.CONFIRM_SERVICE,
        saveData: (text) => ({ service: text }),
      },
      back: {
        response: "back",
        nextState: Chatbot.STATES.INITIAL,
        clearData: ["service"],
      },
      cancel: {
        response: "cancel",
        nextState: Chatbot.STATES.INITIAL,
        clearData: ["service", "date", "time", "name", "email"],
      },
      help: { response: "help", nextState: Chatbot.STATES.ASKING_SERVICE },
      default: {
        response: "invalidInput",
        nextState: Chatbot.STATES.ASKING_SERVICE,
      },
    },
    [Chatbot.STATES.CONFIRM_SERVICE]: {
      confirm: {
        response: "askingTime",
        nextState: Chatbot.STATES.ASKING_TIME,
      },
      reject: {
        response: "askingService",
        nextState: Chatbot.STATES.ASKING_SERVICE,
        clearData: ["service"],
      }, // Permite ao usuário escolher outro serviço
      service: {
        response: "confirmService",
        nextState: Chatbot.STATES.CONFIRM_SERVICE,
        saveData: (text) => ({ service: text }),
      }, // Se o usuário digitar outro serviço diretamente
      back: {
        response: "back",
        nextState: Chatbot.STATES.ASKING_SERVICE,
        clearData: ["service"],
      },
      cancel: {
        response: "cancel",
        nextState: Chatbot.STATES.INITIAL,
        clearData: ["service", "date", "time", "name", "email"],
      },
      help: { response: "help", nextState: Chatbot.STATES.CONFIRM_SERVICE },
      default: {
        response: "invalidInput",
        nextState: Chatbot.STATES.CONFIRM_SERVICE,
      },
    },
    [Chatbot.STATES.ASKING_TIME]: {
      true: {
        response: "askingContact",
        nextState: Chatbot.STATES.ASKING_CONTACT,
      }, // Data/hora válida
      past: { response: "pastDateTime", nextState: Chatbot.STATES.ASKING_TIME },
      invalidTime: {
        response: "invalidTime",
        nextState: Chatbot.STATES.ASKING_TIME,
      },
      invalidDateTime: {
        response: "invalidDateTime",
        nextState: Chatbot.STATES.ASKING_TIME,
      },
      back: {
        response: "back",
        nextState: Chatbot.STATES.CONFIRM_SERVICE,
        clearData: ["date", "time"],
      },
      cancel: {
        response: "cancel",
        nextState: Chatbot.STATES.INITIAL,
        clearData: ["service", "date", "time", "name", "email"],
      },
      help: { response: "help", nextState: Chatbot.STATES.ASKING_TIME },
      default: {
        response: "invalidDateTime",
        nextState: Chatbot.STATES.ASKING_TIME,
      },
    },
    [Chatbot.STATES.ASKING_CONTACT]: {
      contact: {
        response: "success",
        nextState: Chatbot.STATES.INITIAL,
        resetOnSuccess: true,
      },
      invalidContact: {
        response: "invalidContact",
        nextState: Chatbot.STATES.ASKING_CONTACT,
      },
      back: {
        response: "back",
        nextState: Chatbot.STATES.ASKING_TIME,
        clearData: ["name", "email"],
      },
      cancel: {
        response: "cancel",
        nextState: Chatbot.STATES.INITIAL,
        clearData: ["service", "date", "time", "name", "email"],
      },
      help: { response: "help", nextState: Chatbot.STATES.ASKING_CONTACT },
      default: {
        response: "invalidContact",
        nextState: Chatbot.STATES.ASKING_CONTACT,
      },
    },
  };
}
