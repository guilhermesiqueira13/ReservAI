export class Chatbot {
  static STATES = {
    INTRO: "intro",
    INITIAL: "initial",
    ASKING_SERVICE: "askingService",
    CONFIRM_SERVICE: "confirmService",
    ASKING_TIME: "askingTime",
    ASKING_CONTACT: "askingContact",
  };

  #config = {
    scrollThreshold: 200,
    ctaDelayTime: 4000,
    messageProcessDelay: 500, // Reduced for faster response
    typingIndicatorDelay: 300,
    maxHistorySteps: 5,
    businessHours: { start: 8, end: 18 },
    fallbackIntent: "invalidInput",
    maxRetries: 3,
    debug: true,
    intentConfidenceThreshold: 0.6, // New: Confidence threshold for intent matching
  };

  #responses = {
    intro: [
      ({ greeting, name }) =>
        `${greeting || "Oi"}, ${
          name || ""
        }! Eu sou a Ana, sua assistente do ReservAI. Tô aqui pra te ajudar a marcar um horário rapidinho! 😊 Quer que eu te explique como funciona ou já quer começar?`,
    ],
    botExplanation: [
      ({ name }) =>
        `Beleza, ${
          name || ""
        }! Eu sou a Ana do ReservAI. É super simples: você me diz o que quer agendar, escolhe o melhor dia e horário, e eu organizo tudo pra você. 😄 Pronto pra marcar algo?`,
    ],
    initial: [
      ({ greeting, name }) =>
        `${greeting || "Oi"}, ${
          name || ""
        }! Tudo certinho? 😊 Sou a Ana do ReservAI. O que você quer fazer hoje? Marcar um horário ou tirar alguma dúvida?`,
    ],
    askingService: [
      ({ name }) =>
        `Legal, ${
          name || ""
        }! 😄 Me conta, qual serviço você quer agendar? Pode ser consulta, corte de cabelo, massagem...`,
    ],
    askingContact: [
      ({ name, service, date }) =>
        `Quase pronto, ${
          name || ""
        }! 😊 Só preciso do seu nome completo e e-mail pra confirmar o agendamento de ${
          service || "seu serviço"
        } em ${date || "seu horário"}. Pode mandar!`,
    ],
    success: [
      ({ name, service, date, email }) =>
        `Perfeito, ${
          name || ""
        }! 🎉 Seu agendamento de ${service} pra ${date} tá confirmado. Já mandei os detalhes pro seu e-mail: ${email}. Qualquer coisa, é só me chamar! 😊`,
    ],
    invalidInput: [
      ({ name }) =>
        `Ops, ${
          name || ""
        }, não entendi direito. 😅 Pode mandar algo como "agendar consulta" ou explicar o que você quer que eu te ajudo!`,
    ],
    invalidContact: [
      ({ name }) =>
        `Hmm, ${
          name || ""
        }, parece que o nome ou e-mail tá com algum erro. 😕 Tenta mandar assim: "João Silva, joao.silva@email.com".`,
    ],
    invalidDateTime: [
      ({ name }) =>
        `Desculpa, ${
          name || ""
        }, essa data ou horário não tá claro. 😊 Tenta dizer algo como "amanhã às 10h" ou "sexta de manhã". Qual seria o melhor pra você?`,
    ],
    pastDateTime: [
      ({ name }) =>
        `Nossa, ${
          name || ""
        }, essa data já passou! 😅 Me diz um dia de hoje ou do futuro, tipo "amanhã às 14h". Qual você prefere?`,
    ],
    invalidTime: [
      ({ name }) =>
        `Putz, ${
          name || ""
        }, esse horário tá fora do nosso expediente (8h às 18h). 😕 Que tal algo como "amanhã às 14h"? Me fala o que funciona!`,
    ],
    confirmService: [
      ({ name, service }) =>
        `Entendi, ${name || ""}! Você quer agendar ${
          service || "esse serviço"
        }, né? 😊 Confirma pra mim se tá certo ou me diz se é outro serviço.`,
    ],
    back: [
      ({ name }) =>
        `Sem problema, ${
          name || ""
        }! 😄 Vamos voltar um pouquinho. O que você quer fazer agora?`,
    ],
    cancel: [
      ({ name }) =>
        `Beleza, ${
          name || ""
        }, cancelei tudo direitinho. 😊 Se quiser começar de novo, é só dizer "agendar"!`,
    ],
    noHistory: [
      ({ name }) =>
        `Opa, ${
          name || ""
        }, já estamos no comecinho! 😅 Não dá pra voltar mais. Quer agendar algo ou fazer outra coisa?`,
    ],
    help: [
      ({ name }) =>
        `Tô aqui pra te ajudar, ${
          name || ""
        }! 😊 Quer agendar um horário? É só dizer "agendar" ou me contar o que precisa que eu te guio.`,
    ],
    checkAvailability: [
      ({ name, service, date }) =>
        `Ok, ${name || ""}! 😄 Vou ver se tem vaga pra ${
          service || "o serviço"
        } em ${
          date || "seu horário"
        }. Me confirma o serviço e o dia/horário, por favor!`,
    ],
    reschedule: [
      ({ name, service }) =>
        `Tranquilo, ${name || ""}! 😊 Quer mudar o horário de ${
          service || "seu serviço"
        }? Me diz o novo dia e horário, tipo "quarta às 15h".`,
    ],
    confirmReschedule: [
      ({ name, service, date, email }) =>
        `Prontinho, ${
          name || ""
        }! 😄 Mudei seu agendamento de ${service} pra ${date}. Os detalhes tão no seu e-mail: ${email}.`,
    ],
    noAvailability: [
      ({ name, service, date }) =>
        `Nossa, ${name || ""}, não temos vaga pra ${
          service || "esse serviço"
        } em ${
          date || "esse horário"
        }. 😕 Tenta outro horário, tipo "amanhã às 15h"?`,
    ],
    thankYou: [
      ({ name }) =>
        `De nada, ${name || ""}! 😊 Sempre que precisar, é só me chamar!`,
    ],
    goodbye: [
      ({ name }) =>
        `Até mais, ${
          name || ""
        }! 😄 Qualquer coisa, é só voltar aqui que te ajudo!`,
    ],
    requestDayOfWeek: [
      ({ name }) =>
        `Beleza, ${
          name || ""
        }! Qual dia da semana você prefere? Tipo "segunda", "quarta"...`,
    ],
    requestTimeOfDay: [
      ({ name }) =>
        `E que período do dia funciona melhor pra você, ${
          name || ""
        }? Manhã, tarde ou noite?`,
    ],
    requestSpecificTime: [
      ({ name, dayOfWeek, timeOfDay }) =>
        `Ok! Pra ${dayOfWeek} na ${timeOfDay}, qual horário exato você quer, ${
          name || ""
        }? Tipo "10h" ou "14:30".`,
    ],
    clarifyDateTime: [
      ({ name, dayOfWeek, timeOfDay }) =>
        `Desculpa, ${
          name || ""
        }, ainda não peguei a data certinho. 😅 Tenta dizer algo como "próxima ${dayOfWeek} às 10h" ou "25/06 de tarde"?`,
    ],
  };

  #trainingData = [
    // Start intent: Initiating scheduling
    { text: "agendar", intent: "start" },
    { text: "quero agendar", intent: "start" },
    { text: "marcar", intent: "start" },
    { text: "quero marcar", intent: "start" },
    { text: "fazer agendamento", intent: "start" },
    { text: "reservar horário", intent: "start" },
    { text: "preciso marcar", intent: "start" },
    { text: "pode agendar", intent: "start" },
    { text: "agendar consulta", intent: "start" },
    { text: "marcar corte", intent: "start" },
    { text: "bora agendar", intent: "start" },
    { text: "vamos marcar", intent: "start" },
    { text: "agendarr", intent: "start" },
    { text: "quero um horario", intent: "start" },
    { text: "tem como marcar", intent: "start" },
    { text: "agendamento agora", intent: "start" },
    { text: "quero fazer um agendamento agora", intent: "start" },
    { text: "quero fazer um agendamento", intent: "start" },
    { text: "quero testar", intent: "start" },

    // Greeting intent: User greetings
    { text: "oi", intent: "greeting" },
    { text: "olá", intent: "greeting" },
    { text: "bom dia", intent: "greeting" },
    { text: "boa tarde", intent: "greeting" },
    { text: "boa noite", intent: "greeting" },
    { text: "e aí", intent: "greeting" },
    { text: "tudo bem", intent: "greeting" },
    { text: "salve", intent: "greeting" },
    { text: "fala aí", intent: "greeting" },
    { text: "alô", intent: "greeting" },
    { text: "e ae", intent: "greeting" },
    { text: "tudo joia", intent: "greeting" },
    { text: "oiê", intent: "greeting" },

    // Confirm intent: Confirming service or action
    { text: "sim", intent: "confirm" },
    { text: "ok", intent: "confirm" },
    { text: "tá certo", intent: "confirm" },
    { text: "isso mesmo", intent: "confirm" },
    { text: "beleza", intent: "confirm" },
    { text: "pode ser", intent: "confirm" },
    { text: "tudo certo", intent: "confirm" },
    { text: "perfeito", intent: "confirm" },
    { text: "exato", intent: "confirm" },
    { text: "show", intent: "confirm" },
    { text: "tá ok", intent: "confirm" },
    { text: "blz", intent: "confirm" },
    { text: "está certo", intent: "confirm" },
    { text: "isso mesmo", intent: "confirm" },
    { text: "sim, esse mesmo", intent: "confirm" },
    { text: "sim, isso mesmo", intent: "confirm" },

    // Reject intent: Declining or correcting
    { text: "não", intent: "reject" },
    { text: "n", intent: "reject" },
    { text: "não quero", intent: "reject" },
    { text: "outro", intent: "reject" },
    { text: "errado", intent: "reject" },
    { text: "nao e isso", intent: "reject" },
    { text: "não é isso", intent: "reject" },
    { text: "quero mudar", intent: "reject" },
    { text: "tá errado", intent: "reject" },
    { text: "ta errado", intent: "reject" },
    { text: "outro serviço", intent: "reject" },

    // Back intent: Returning to previous step
    { text: "voltar", intent: "back" },
    { text: "retroceder", intent: "back" },
    { text: "volta", intent: "back" },
    { text: "passo anterior", intent: "back" },
    { text: "voltar atrás", intent: "back" },
    { text: "vouta", intent: "back" },
    { text: "quero que você volte", intent: "back" },
    { text: "quero que vc volte", intent: "back" },
    { text: "quero que voce volte", intent: "back" },
    { text: "sim, quero que você volte", intent: "back" },
    { text: "sim, quero que vc volte", intent: "back" },
    { text: "sim, quero que voce volte", intent: "back" },

    // Cancel intent: Stopping the process
    { text: "cancelar", intent: "cancel" },
    { text: "desistir", intent: "cancel" },
    { text: "parar", intent: "cancel" },
    { text: "encerrar", intent: "cancel" },
    { text: "cancela", intent: "cancel" },
    { text: "deixa pra lá", intent: "cancel" },
    { text: "desisto", intent: "cancel" },
    { text: "quero cancenlar", intent: "cancel" },
    { text: "quero que você cancele", intent: "cancel" },
    { text: "quero que voce cancele", intent: "cancel" },
    { text: "quero que vc cancele", intent: "cancel" },
    { text: "pode sim", intent: "cancel" },
    { text: "pode cancelar", intent: "cancel" },

    // Help intent: Requesting assistance
    { text: "ajuda", intent: "help" },
    { text: "me ajuda", intent: "help" },
    { text: "como faço", intent: "help" },
    { text: "o que posso fazer", intent: "help" },
    { text: "to perdido", intent: "help" },
    { text: "tô confuso", intent: "help" },
    { text: "explica de novo", intent: "help" },
    { text: "pode me ajudar?", intent: "help" },
    { text: "pode me ajudar", intent: "help" },
    { text: "consegue me ajudar?", intent: "help" },
    { text: "consegue me ajudar", intent: "help" },

    // CheckAvailability intent: Checking available slots
    { text: "tem horário disponível", intent: "checkAvailability" },
    { text: "tem vaga pra amanhã", intent: "checkAvailability" },
    { text: "quais horários livres", intent: "checkAvailability" },
    { text: "tem horário pra consulta", intent: "checkAvailability" },
    { text: "verificar disponibilidade", intent: "checkAvailability" },
    { text: "tem vaga", intent: "checkAvailability" },

    // Reschedule intent: Changing appointment
    { text: "reagendar", intent: "reschedule" },
    { text: "mudar horário", intent: "reschedule" },
    { text: "trocar horário", intent: "reschedule" },
    { text: "pode trocar meu horário", intent: "reschedule" },
    { text: "pode mudar meu horário", intent: "reschedule" },
    { text: "pode trocar meu horario", intent: "reschedule" },
    { text: "pode mudar meu horario", intent: "reschedule" },
    { text: "consegue mudar meu horario", intent: "reschedule" },
    { text: "consegue trocar meu horario", intent: "reschedule" },
    { text: "muda o dia", intent: "reschedule" },
    { text: "pode mudar o dia", intent: "reschedule" },
    { text: "consegue mudar o dia", intent: "reschedule" },
    { text: "quero outro horário", intent: "reschedule" },
    { text: "reagendamento", intent: "reschedule" },
    { text: "quero reagendar", intent: "reschedule" },
    { text: "preciso reagendar", intent: "reschedule" },

    // ConfirmReschedule intent: Confirming rescheduling
    { text: "confirmar reagendamento", intent: "confirmReschedule" },
    { text: "tá ok o novo horário", intent: "confirmReschedule" },
    { text: "pode mudar pra esse dia", intent: "confirmReschedule" },
    { text: "novo horário tá bom", intent: "confirmReschedule" },

    // NoAvailability intent: Handling no available slots
    { text: "sem horário", intent: "noAvailability" },
    { text: "não tem vaga", intent: "noAvailability" },

    // ThankYou intent: Expressing gratitude
    { text: "obrigado", intent: "thankYou" },
    { text: "valeu", intent: "thankYou" },
    { text: "brigado", intent: "thankYou" },
    { text: "obg", intent: "thankYou" },
    { text: "obrigada", intent: "thankYou" },
    { text: "vlw", intent: "thankYou" },
    { text: "valeu demais", intent: "thankYou" },

    // Goodbye intent: Ending conversation
    { text: "tchau", intent: "goodbye" },
    { text: "até mais", intent: "goodbye" },
    { text: "flw", intent: "goodbye" },
    { text: "até logo", intent: "goodbye" },
    { text: "xau", intent: "goodbye" },

    // CheckStatus intent: Checking appointment status
    { text: "verificar agendamento", intent: "checkStatus" },
    { text: "como tá meu agendamento", intent: "checkStatus" },
    { text: "status da consulta", intent: "checkStatus" },

    // Explain intent: Requesting explanation in INTRO state
    { text: "sim", intent: "explain" },
    { text: "s", intent: "explain" },
    { text: "quero saber", intent: "explain" },
    { text: "pode explicar", intent: "explain" },
    { text: "explica como funciona", intent: "explain" },
    { text: "como funciona", intent: "explain" },
    { text: "me explica", intent: "explain" },
    { text: "explica aí", intent: "explain" },
    { text: "sim por favor", intent: "explain" },
    { text: "tá, explica", intent: "explain" },
    { text: "quero entender", intent: "explain" },
    { text: "mostra como funciona", intent: "explain" },
    { text: "sim, conta mais", intent: "explain" },
    { text: "explica isso", intent: "explain" },
    { text: "fala mais", intent: "explain" },
    { text: "como é isso", intent: "explain" },
    { text: "sim, pode mandar", intent: "explain" },
    { text: "como você funciona?", intent: "explain" },
    { text: "como você funciona", intent: "explain" },

    // SkipIntro intent: Skipping explanation in INTRO state
    { text: "não", intent: "skipIntro" },
    { text: "n", intent: "skipIntro" },
    { text: "não quero", intent: "skipIntro" },
    { text: "pula isso", intent: "skipIntro" },
    { text: "não precisa", intent: "skipIntro" },
    { text: "pode pular", intent: "skipIntro" },
    { text: "não, vamos agendar", intent: "start" },
    { text: "pula e agenda", intent: "start" },
    { text: "não, quero marcar", intent: "start" },
    { text: "agendar direto", intent: "start" },
    { text: "pular e marcar", intent: "start" },
    { text: "sem explicação", intent: "skipIntro" },
    { text: "não, bora marcar", intent: "start" },
    { text: "pula a explicação", intent: "skipIntro" },
    { text: "não, só agendar", intent: "start" },
    { text: "dispensa a explicação", intent: "skipIntro" },
    { text: "segunda", intent: "dayOfWeek" },
    { text: "terça", intent: "dayOfWeek" },
    { text: "quarta", intent: "dayOfWeek" },
    { text: "quinta", intent: "dayOfWeek" },
    { text: "sexta", intent: "dayOfWeek" },
    { text: "sábado", intent: "dayOfWeek" },
    { text: "domingo", intent: "dayOfWeek" },
    { text: "amanhã", intent: "dayOfWeek" },
    { text: "hoje", intent: "dayOfWeek" },
    { text: "manhã", intent: "timeOfDay" },
    { text: "tarde", intent: "timeOfDay" },
    { text: "noite", intent: "timeOfDay" },
    { text: "10h", intent: "specificTime" },
    { text: "às 14h", intent: "specificTime" },
    { text: "15:30", intent: "specificTime" },
    { text: "qual horário tem", intent: "checkAvailability" },
    { text: "me mostra os horários disponíveis", intent: "checkAvailability" },
  ];

  #stateMachine = {
    [Chatbot.STATES.INTRO]: {
      explain: {
        response: "botExplanation",
        nextState: Chatbot.STATES.INITIAL,
      },
      skipIntro: {
        response: "askingService",
        nextState: Chatbot.STATES.ASKING_SERVICE,
      },
      start: {
        response: "askingService",
        nextState: Chatbot.STATES.ASKING_SERVICE,
      },
      help: { response: "help", nextState: Chatbot.STATES.INTRO },
      cancel: { response: "cancel", nextState: Chatbot.STATES.INTRO },
      greeting: { response: "initial", nextState: Chatbot.STATES.INITIAL },
      default: { response: "invalidInput", nextState: Chatbot.STATES.INTRO },
    },
    [Chatbot.STATES.INITIAL]: {
      start: {
        response: "askingService",
        nextState: Chatbot.STATES.ASKING_SERVICE,
      },
      greeting: { response: "initial", nextState: Chatbot.STATES.INITIAL },
      help: { response: "help", nextState: Chatbot.STATES.INITIAL },
      back: { response: "noHistory", nextState: Chatbot.STATES.INITIAL },
      cancel: { response: "cancel", nextState: Chatbot.STATES.INTRO },
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
        nextState: Chatbot.STATES.INTRO,
        clearData: [
          "service",
          "date",
          "time",
          "name",
          "email",
          "dayOfWeek",
          "timeOfDay",
        ],
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
      },
      service: {
        response: "confirmService",
        nextState: Chatbot.STATES.CONFIRM_SERVICE,
        saveData: (text) => ({ service: text }),
      },
      back: {
        response: "back",
        nextState: Chatbot.STATES.ASKING_SERVICE,
        clearData: ["service"],
      },
      cancel: {
        response: "cancel",
        nextState: Chatbot.STATES.INTRO,
        clearData: [
          "service",
          "date",
          "time",
          "name",
          "email",
          "dayOfWeek",
          "timeOfDay",
        ],
      },
      help: { response: "help", nextState: Chatbot.STATES.CONFIRM_SERVICE },
      default: {
        response: "invalidInput",
        nextState: Chatbot.STATES.CONFIRM_SERVICE,
      },
    },
    [Chatbot.STATES.ASKING_TIME]: {
      dateTimeProvided: {
        response: "askingContact",
        nextState: Chatbot.STATES.ASKING_CONTACT,
      },
      dayOfWeek: {
        response: "requestTimeOfDay",
        nextState: Chatbot.STATES.ASKING_TIME,
        saveData: (text) => ({ dayOfWeek: text }),
      },
      timeOfDay: {
        response: "requestSpecificTime",
        nextState: Chatbot.STATES.ASKING_TIME,
        saveData: (text) => ({ timeOfDay: text }),
      },
      specificTime: {
        response: "askingContact",
        nextState: Chatbot.STATES.ASKING_CONTACT,
      },
      checkAvailability: {
        response: "checkAvailability",
        nextState: Chatbot.STATES.ASKING_TIME,
      },
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
        clearData: ["date", "time", "dayOfWeek", "timeOfDay"],
      },
      cancel: {
        response: "cancel",
        nextState: Chatbot.STATES.INTRO,
        clearData: [
          "service",
          "date",
          "time",
          "name",
          "email",
          "dayOfWeek",
          "timeOfDay",
        ],
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
        nextState: Chatbot.STATES.INTRO,
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
        nextState: Chatbot.STATES.INTRO,
        clearData: [
          "service",
          "date",
          "time",
          "name",
          "email",
          "dayOfWeek",
          "timeOfDay",
        ],
      },
      help: { response: "help", nextState: Chatbot.STATES.ASKING_CONTACT },
      default: {
        response: "invalidContact",
        nextState: Chatbot.STATES.ASKING_CONTACT,
      },
    },
  };

  #conversationState = {
    step: Chatbot.STATES.INTRO,
    data: {
      service: null,
      date: null,
      time: null,
      name: null,
      email: null,
      dayOfWeek: null,
      timeOfDay: null,
    },
    history: [],
    hasWelcomed: false,
    contextTopic: null,
    retries: 0,
  };

  #domElements = {
    chatbotElement: "#chatbot",
    chatbotBody: "#chatbot-body",
    userInput: "#user-input",
    sendButton: "#chatbot .chatbot-input button",
    callToActionElement: ".chatbot-call-to-action",
    toggleButtonElement: ".chatbot-toggle",
    floatingChatbotWrapper: ".floating-chatbot",
    closeButton: "#chatbot .chatbot-close-btn",
  };

  #intentCache = new Map(); // New: Cache for intent detection

  constructor(toggleSelector, chatbotSelector) {
    this.#domElements.toggleButtonElement =
      toggleSelector || this.#domElements.toggleButtonElement;
    this.#domElements.chatbotElement =
      chatbotSelector || this.#domElements.chatbotElement;
    this.init();
  }

  init() {
    this.assignDOMElements();
    if (!this.chatbotElement || !this.chatbotBody || !this.userInput) {
      this.#logError("Essential chatbot elements not found.");
      return;
    }
    this.initEventListeners();
    this.initScrollListener();
    this.initCallToActionDelay();
  }

  assignDOMElements() {
    for (const key in this.#domElements) {
      this[key] = document.querySelector(this.#domElements[key]);
      if (!this[key] && this.#config.debug) {
        console.warn(
          `Element not found for selector: ${this.#domElements[key]}`
        );
      }
    }
  }

  getGreeting() {
    const hour = new Date().getHours();
    return hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  }

  toggleChatbot() {
    if (!this.chatbotElement) {
      this.#logError("Chatbot element missing during toggle.");
      return;
    }
    this.chatbotElement.classList.toggle("active");
    if (this.floatingChatbotWrapper) {
      this.floatingChatbotWrapper.classList.toggle("active");
    }
    const isActive = this.chatbotElement.classList.contains("active");

    if (isActive && !this.#conversationState.hasWelcomed) {
      this.setElementVisibility(this.callToActionElement, false);
      this.setElementVisibility(this.toggleButtonElement, false);
      this.userInput?.focus();
      this.addMessage(
        this.getRandomResponse(this.#responses.intro, {
          greeting: this.getGreeting(),
          name: this.#conversationState.data.name,
        }),
        "bot-message"
      );
      this.#conversationState.hasWelcomed = true;
    } else if (!isActive) {
      this.setElementVisibility(this.toggleButtonElement, true);
      this.setElementVisibility(
        this.callToActionElement,
        window.scrollY > this.#config.scrollThreshold
      );
    }
  }

  addMessage(text, type) {
    if (!text || !this.chatbotBody) {
      this.#logError("Cannot add message: missing text or chatbot body.");
      return;
    }
    const message = document.createElement("div");
    message.className = `chatbot-message ${type}`;
    const messageContent = document.createElement("div");
    messageContent.textContent = text;
    message.appendChild(messageContent);
    if (type === "bot-message") {
      messageContent.style.backgroundColor = "var(--toggle-color, #f0f0f0)";
    } else if (type === "user-message") {
      messageContent.style.backgroundColor = "var(--details-color, #d0e0ff)";
    } else if (type === "bot-message typing") {
      messageContent.style.backgroundColor = "var(--toggle-color, #f0f0f0)";
    }
    this.chatbotBody.appendChild(message);
    message.classList.add("active");
    this.chatbotBody.scrollTop = this.chatbotBody.scrollHeight;
  }

  showTypingIndicator() {
    this.addMessage("Digitando...", "bot-message typing");
    setTimeout(() => {
      const typingMessage = this.chatbotBody?.querySelector(".typing");
      if (typingMessage) typingMessage.remove();
    }, this.#config.messageProcessDelay);
  }

  sendMessage() {
    const userText = this.userInput?.value.trim();
    if (!userText) return;

    this.addMessage(userText, "user-message");
    this.userInput.value = "";
    this.showTypingIndicator();
    setTimeout(
      () => this.processMessage(userText),
      this.#config.messageProcessDelay
    );
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validateDateTime(text) {
    const lowerText = this.normalizeText(text).trim();
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const dateRegex = [
      /^(\d{1,2})\/(\d{1,2})(\/(\d{2,4}))?/,
      /^(\d{1,2})\s*(de)?\s*(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s*(de\s*(\d{4}))?/i,
      /^(hoje|amanhã|depois\s*de\s*amanhã|daqui\s*(a)?\s*(\d+)\s*dias?|pr[óo]xima\s*(semana|segunda|terça|quarta|quinta|sexta|sábado|domingo|mês))/i,
    ];
    const timeRegex = /(?:às\s*)?(\d{1,2})(?::(\d{2})|h(\d{2})?)?\s*(h)?/i;
    const periodRegex = /(de\s*(manhã|tarde|noite))/i;

    let parsedDate,
      hours = 0,
      minutes = 0;
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
    const dayNames = [
      "domingo",
      "segunda",
      "terça",
      "quarta",
      "quinta",
      "sexta",
      "sábado",
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
        if (dateMatch[0].includes("hoje")) parsedDate = new Date(now);
        else if (dateMatch[0].includes("amanhã"))
          parsedDate = new Date(now).setDate(now.getDate() + 1);
        else if (dateMatch[0].includes("depois de amanhã"))
          parsedDate = new Date(now).setDate(now.getDate() + 2);
        else if (dateMatch[0].includes("daqui"))
          parsedDate = new Date(now).setDate(
            now.getDate() + parseInt(dateMatch[3] || dateMatch[2])
          );
        else if (
          dateMatch[0].includes("próxima semana") ||
          dateMatch[0].match(
            /segunda|terça|quarta|quinta|sexta|sábado|domingo/i
          )
        ) {
          parsedDate = new Date(now);
          const targetDayName = dateMatch[0]
            .replace("próxima ", "")
            .replace("-feira", "");
          const targetDay = dayNames.findIndex((day) =>
            targetDayName.startsWith(day)
          );
          if (targetDay >= 0) {
            const currentDay = now.getDay();
            let daysToAdd =
              targetDay -
              currentDay +
              (dateMatch[0].includes("próxima") ||
              dateMatch[0].includes("semana") ||
              targetDay <= currentDay
                ? 7
                : 0);
            parsedDate.setDate(now.getDate() + daysToAdd);
          }
        } else if (dateMatch[1] && dateMatch[2]) {
          parsedDate = parseDate(
            parseInt(dateMatch[1]),
            parseInt(dateMatch[2]),
            dateMatch[4] ? parseInt(dateMatch[4]) : now.getFullYear()
          );
        } else if (dateMatch[1] && dateMatch[3]) {
          parsedDate = parseDate(
            parseInt(dateMatch[1]),
            months[dateMatch[3].toLowerCase()],
            dateMatch[5] ? parseInt(dateMatch[5]) : now.getFullYear()
          );
        }
        break;
      }
    }

    const timeMatch = lowerText.match(timeRegex);
    if (timeMatch) {
      hours = parseInt(timeMatch[1]);
      minutes = parseInt(timeMatch[2] || timeMatch[3] || 0);
    }

    const periodMatch = lowerText.match(periodRegex);
    if (periodMatch) {
      const period = periodMatch[1].toLowerCase();
      if (period.includes("manhã") && hours >= 12) hours -= 12;
      else if (period.includes("tarde") && hours < 12) hours += 12;
      else if (period.includes("noite"))
        hours = hours < 12 ? hours + 12 : Math.max(18, hours);
    } else if (!timeMatch && periodMatch) {
      hours = periodMatch[1].includes("manhã")
        ? 9
        : periodMatch[1].includes("tarde")
        ? 14
        : 18;
      minutes = 0;
    }

    if (!parsedDate && (timeMatch || periodMatch)) parsedDate = new Date(now);

    if (parsedDate && !isNaN(parsedDate.getTime())) {
      parsedDate.setHours(hours, minutes, 0, 0);
      if (new Date(parsedDate).setHours(0, 0, 0, 0) < now) return "past";
      if (
        hours < this.#config.businessHours.start ||
        hours >= this.#config.businessHours.end ||
        (hours === this.#config.businessHours.end && minutes > 0)
      )
        return "invalidTime";

      this.#conversationState.data.date = parsedDate.toLocaleDateString(
        "pt-BR",
        { dateStyle: "short" }
      );
      this.#conversationState.data.time = parsedDate.toLocaleTimeString(
        "pt-BR",
        { hour: "2-digit", minute: "2-digit" }
      );
      this.#conversationState.data.dayOfWeek = dayNames[parsedDate.getDay()];
      this.#conversationState.data.timeOfDay = periodMatch
        ? periodMatch[1]
        : hours < 12
        ? "manhã"
        : hours < 18
        ? "tarde"
        : "noite";
      return true;
    }
    return "invalidDateTime";
  }

  normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/['"]+/g, "") // Remove quotes
      .replace(/[.,!?]/g, ""); // Remove punctuation
  }

  tokenizeAndStem(text) {
    return this.normalizeText(text)
      .split(/\s+/)
      .map((token) =>
        token
          .replace(
            /(ando|endo|indo|ar|er|ir|ado|ido|ção|ções|amento|mento|s)$/g,
            ""
          )
          .replace(/([aeiou])([aeiou])[aeiou]+/g, "$1$2")
      )
      .filter((token) => token.length > 1); // Allow shorter tokens for better matching
  }

  computeSimilarity(tokens1, tokens2) {
    const set1 = new Set(tokens1);
    const set2 = new Set(tokens2);
    const intersection = new Set([...set1].filter((x) => set2.has(x)));
    return intersection.size / Math.max(set1.size, set2.size);
  }

  detectIntent(userText) {
    const cacheKey = `${this.#conversationState.step}:${userText}`;
    if (this.#intentCache.has(cacheKey)) {
      return this.#intentCache.get(cacheKey);
    }

    const lowerText = this.normalizeText(userText);
    const tokens = this.tokenizeAndStem(userText);
    let bestIntent = "unknown";
    let bestConfidence = 0;

    const intentScores = this.#trainingData.map(({ text, intent }) => {
      const trainingTokens = this.tokenizeAndStem(text);
      const confidence = this.computeSimilarity(tokens, trainingTokens);
      return { intent, confidence };
    });

    const topIntent = intentScores.reduce(
      (best, current) => {
        return current.confidence > best.confidence ? current : best;
      },
      { intent: "unknown", confidence: 0 }
    );

    if (topIntent.confidence >= this.#config.intentConfidenceThreshold) {
      bestIntent = topIntent.intent;
      bestConfidence = topIntent.confidence;
    }

    // Regex-based intent detection for specific patterns
    const serviceRegex =
      /corte|consulta|massagem|exame|manicure|pedicure|dentista|unha/i;
    const contactRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    const dateTimeRegex =
      /(\d{1,2}\/\d{1,2}(\/\d{2,4})?)|(\d{1,2}h)|(\d{1,2}:\d{2})|(manhã|tarde|noite)|(segunda|terça|quarta|quinta|sexta|sábado|domingo)/i;

    if (
      this.#conversationState.step === Chatbot.STATES.ASKING_SERVICE &&
      serviceRegex.test(lowerText)
    ) {
      bestIntent = "service";
    } else if (
      this.#conversationState.step === Chatbot.STATES.ASKING_CONTACT &&
      contactRegex.test(lowerText)
    ) {
      bestIntent = "contact";
    } else if (
      this.#conversationState.step === Chatbot.STATES.ASKING_TIME &&
      dateTimeRegex.test(lowerText)
    ) {
      const dateTimeValidation = this.validateDateTime(userText);
      if (dateTimeValidation === true) bestIntent = "dateTimeProvided";
      else if (dateTimeValidation === "past") bestIntent = "past";
      else if (dateTimeValidation === "invalidTime") bestIntent = "invalidTime";
      else bestIntent = "invalidDateTime";
    }

    // Fallback to context-aware intent detection
    const intentsByState = {
      [Chatbot.STATES.INTRO]: () => {
        if (lowerText.includes("explicar") || lowerText === "sim")
          return "explain";
        if (lowerText.includes("não") || lowerText.includes("começar"))
          return "skipIntro";
        if (bestIntent === "start" || lowerText.includes("agendar"))
          return "start";
        if (bestIntent === "help" || lowerText.includes("ajuda")) return "help";
        if (bestIntent === "cancel" || lowerText.includes("cancelar"))
          return "cancel";
        if (bestIntent === "greeting") return "greeting";
        return "unknown";
      },
      [Chatbot.STATES.INITIAL]: () => {
        if (bestIntent === "start" || lowerText.includes("agendar"))
          return "start";
        if (bestIntent === "greeting" && !this.#conversationState.hasWelcomed)
          return "greeting";
        if (bestIntent === "help" || lowerText.includes("ajuda")) return "help";
        if (bestIntent === "back") return "back";
        if (bestIntent === "cancel") return "cancel";
        return "unknown";
      },
      [Chatbot.STATES.ASKING_SERVICE]: () => {
        if (bestIntent === "service" || serviceRegex.test(lowerText))
          return "service";
        if (bestIntent === "back") return "back";
        if (bestIntent === "cancel") return "cancel";
        if (bestIntent === "help") return "help";
        return "unknown";
      },
      [Chatbot.STATES.CONFIRM_SERVICE]: () => {
        if (
          bestIntent === "confirm" ||
          lowerText.includes("sim") ||
          lowerText.includes("tá certo")
        )
          return "confirm";
        if (
          bestIntent === "reject" ||
          lowerText.includes("não") ||
          lowerText.includes("outro")
        )
          return "reject";
        if (bestIntent === "back") return "back";
        if (bestIntent === "cancel") return "cancel";
        if (bestIntent === "help") return "help";
        if (serviceRegex.test(lowerText)) return "service";
        return "unknown";
      },
      [Chatbot.STATES.ASKING_TIME]: () => {
        if (
          bestIntent === "dayOfWeek" ||
          lowerText.match(/segunda|terça|quarta|quinta|sexta|sábado|domingo/i)
        )
          return "dayOfWeek";
        if (bestIntent === "timeOfDay" || lowerText.match(/manhã|tarde|noite/i))
          return "timeOfDay";
        if (
          bestIntent === "specificTime" ||
          lowerText.match(/(\d{1,2}h)|(\d{1,2}:\d{2})/i)
        )
          return "specificTime";
        if (
          bestIntent === "checkAvailability" ||
          lowerText.includes("disponível")
        )
          return "checkAvailability";
        if (bestIntent === "back") return "back";
        if (bestIntent === "cancel") return "cancel";
        if (bestIntent === "help") return "help";
        return bestIntent;
      },
      [Chatbot.STATES.ASKING_CONTACT]: () => {
        if (bestIntent === "back") return "back";
        if (bestIntent === "cancel") return "cancel";
        if (bestIntent === "help") return "help";
        if (contactRegex.test(lowerText) && lowerText.includes(","))
          return "contact";
        return "invalidContact";
      },
    };

    const intent =
      intentsByState[this.#conversationState.step]?.() || "unknown";
    if (bestConfidence > 0) {
      this.#intentCache.set(cacheKey, intent);
      if (this.#intentCache.size > 100)
        this.#intentCache.delete(this.#intentCache.keys().next().value); // Limit cache size
    }
    if (intent === "start")
      this.#conversationState.contextTopic = "agendamento";
    else if (intent === "help") this.#conversationState.contextTopic = "ajuda";
    else if (intent === "cancel") this.#conversationState.contextTopic = null;
    return intent;
  }

  getRandomResponse(responses, context = {}) {
    const response = responses[Math.floor(Math.random() * responses.length)];
    return typeof response === "function" ? response(context) : response;
  }

  saveHistory(step, data) {
    this.#conversationState.history.push({ step, data: { ...data } });
    if (this.#conversationState.history.length > this.#config.maxHistorySteps) {
      this.#conversationState.history.shift();
    }
  }

  goBack() {
    if (this.#conversationState.history.length > 0) {
      const previous = this.#conversationState.history.pop();
      this.#conversationState.step = previous.step;
      this.#conversationState.data = { ...previous.data };
      return this.getRandomResponse(this.#responses.back, {
        name: this.#conversationState.data.name,
      });
    }
    return this.getRandomResponse(this.#responses.noHistory, {
      name: this.#conversationState.data.name,
    });
  }

  processMessage(userText) {
    const intent = this.detectIntent(userText);
    const context = {
      ...this.#conversationState.data,
      greeting: this.getGreeting(),
    };
    let botResponse = "",
      nextStep = this.#conversationState.step;

    this.saveHistory(
      this.#conversationState.step,
      this.#conversationState.data
    );

    if (intent === "back") {
      botResponse = this.goBack();
      nextStep = this.#conversationState.step;
      this.#conversationState.retries = 0;
    } else if (intent === "cancel") {
      botResponse = this.getRandomResponse(this.#responses.cancel, context);
      this.#conversationState.data = {
        service: null,
        date: null,
        time: null,
        name: null,
        email: null,
        dayOfWeek: null,
        timeOfDay: null,
      };
      nextStep = Chatbot.STATES.INTRO;
      this.#conversationState.hasWelcomed = false;
      this.#conversationState.retries = 0;
    } else if (intent === "help") {
      botResponse = this.getRandomResponse(this.#responses.help, context);
      nextStep = this.#conversationState.step;
      this.#conversationState.retries = 0;
    } else {
      const stateConfig =
        this.#stateMachine[this.#conversationState.step][intent] ||
        this.#stateMachine[this.#conversationState.step].default;

      if (stateConfig.saveData) {
        Object.assign(
          this.#conversationState.data,
          stateConfig.saveData(userText, this.#conversationState.data)
        );
      }
      if (stateConfig.clearData) {
        stateConfig.clearData.forEach(
          (key) => (this.#conversationState.data[key] = null)
        );
      }

      if (stateConfig.resetOnSuccess && intent === "contact") {
        const [name, email] = userText.split(",").map((s) => s.trim());
        if (name && email && this.validateEmail(email)) {
          Object.assign(this.#conversationState.data, { name, email });
          console.log("Lead capturado:", this.#conversationState.data);
          botResponse = this.getRandomResponse(
            this.#responses.success,
            context
          );
          this.#conversationState.data = {
            service: null,
            date: null,
            time: null,
            name: null,
            email: null,
            dayOfWeek: null,
            timeOfDay: null,
          };
          this.#conversationState.hasWelcomed = false;
          this.#conversationState.retries = 0;
        } else {
          botResponse = this.getRandomResponse(
            this.#responses.invalidContact,
            context
          );
          nextStep = this.#conversationState.step;
          this.#conversationState.retries++;
        }
      } else if (this.#conversationState.step === Chatbot.STATES.ASKING_TIME) {
        if (intent === "dateTimeProvided") {
          botResponse = this.getRandomResponse(
            this.#responses.askingContact,
            context
          );
          nextStep = Chatbot.STATES.ASKING_CONTACT;
          this.#conversationState.retries = 0;
        } else if (
          intent === "dayOfWeek" ||
          intent === "timeOfDay" ||
          intent === "specificTime"
        ) {
          botResponse = this.getRandomResponse(
            this.#responses[intent],
            context
          );
          nextStep = Chatbot.STATES.ASKING_TIME;
          this.#conversationState.retries = 0;
        } else if (intent === "checkAvailability") {
          botResponse = this.getRandomResponse(
            this.#responses.checkAvailability,
            context
          );
          nextStep = Chatbot.STATES.ASKING_TIME;
          this.#conversationState.retries = 0;
        } else {
          botResponse = this.getRandomResponse(
            this.#responses[stateConfig.response],
            context
          );
          nextStep = stateConfig.nextState;
          this.#conversationState.retries++;
        }
      } else {
        botResponse = this.getRandomResponse(
          this.#responses[stateConfig.response],
          context
        );
        nextStep = stateConfig.nextState || this.#conversationState.step;
        this.#conversationState.retries = 0;
      }

      if (
        this.#conversationState.retries >= this.#config.maxRetries &&
        nextStep !== Chatbot.STATES.INTRO
      ) {
        botResponse = this.getRandomResponse(this.#responses.cancel, context);
        nextStep = Chatbot.STATES.INTRO;
        this.#conversationState.data = {
          service: null,
          date: null,
          time: null,
          name: null,
          email: null,
          dayOfWeek: null,
          timeOfDay: null,
        };
        this.#conversationState.hasWelcomed = false;
        this.#conversationState.retries = 0;
      }
    }

    this.addMessage(botResponse, "bot-message");
    this.#conversationState.step = nextStep;
  }

  initEventListeners() {
    if (this.userInput) {
      this.userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.sendMessage();
      });
    } else {
      this.#logError("User input element missing for event listener.");
    }
    if (this.sendButton) {
      this.sendButton.addEventListener("click", () => this.sendMessage());
    }
    if (this.toggleButtonElement) {
      this.toggleButtonElement.addEventListener("click", () =>
        this.toggleChatbot()
      );
    }
    if (this.closeButton) {
      this.closeButton.addEventListener("click", () => this.toggleChatbot());
    }
  }

  initScrollListener() {
    const handleScroll = () => {
      if (
        window.scrollY > this.#config.scrollThreshold &&
        !this.chatbotElement?.classList.contains("active")
      ) {
        this.setElementVisibility(this.callToActionElement, true);
        this.setElementVisibility(this.toggleButtonElement, true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }

  initCallToActionDelay() {
    setTimeout(() => {
      if (
        !this.chatbotElement?.classList.contains("active") &&
        window.scrollY <= this.#config.scrollThreshold
      ) {
        this.setElementVisibility(this.callToActionElement, true);
        this.setElementVisibility(this.toggleButtonElement, true);
      }
    }, this.#config.ctaDelayTime);
  }

  setElementVisibility(element, isVisible) {
    if (!element) {
      this.#logError("Cannot set visibility: element is missing.");
      return;
    }
    element.classList.toggle("visible", isVisible);
    element.classList.toggle("hidden", !isVisible);
  }

  #logError(message) {
    if (this.#config.debug) {
      console.error(`Chatbot Error: ${message}`);
    }
  }
}
