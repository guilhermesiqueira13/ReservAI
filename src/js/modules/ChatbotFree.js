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
        `${context.greeting || "Oi"}, e aí, ${
          context.name || "tudo bem"
        }? Sou o ReservAI, seu parceiro pra agendamentos! 😄 O que você quer fazer hoje?`,
      (context) =>
        `${context.greeting || "Olá"}! Tô pronto pra te ajudar, ${
          context.name || "amigo(a)"
        }. Bora agendar algo ou tirar alguma dúvida?`,
      (context) =>
        `${context.greeting || "E aí"}, ${
          context.name || ""
        }? Aqui é o ReservAI! Me conta, quer marcar um horário ou precisa de outra coisa? 😊`,
      (context) =>
        `${context.greeting || "Oi"}, ${
          context.name || "tudo joia"
        }? Sou o ReservAI, seu assistente de agendamentos. Qual é o plano?`,
    ],
    askingService: [
      (context) =>
        `Beleza, ${
          context.name || ""
        }! Qual serviço você quer agendar hoje? 😊 Por exemplo, consulta médica, corte de cabelo, ou algo assim!`,
      (context) =>
        `${context.greeting || "Opa"}, ${
          context.name || "amigo(a)"
        }! Me fala qual serviço você tá querendo marcar, tipo massagem, exame, ou outro.`,
      (context) =>
        `Show de bola, ${
          context.name || ""
        }! 😄 Qual é o serviço que você quer agendar? Me dá uma luz!`,
      (context) =>
        `Tô pronto pra te ajudar, ${
          context.name || "amigo(a)"
        }! Qual serviço você tá pensando em marcar? Conta aí!`,
    ],
    askingTime: [
      (context) =>
        `Perfeito, ${context.name || ""}! Você quer ${
          context.service || "um serviço"
        }. Quando fica bom pra você? Pode mandar algo como "amanhã às 10h" ou "sexta de tarde". 😊`,
      (context) =>
        `Beleza, ${context.name || "amigo(a)"}! Escolheu ${
          context.service || "o serviço"
        }. Me diz o dia e horário, tipo "quarta às 14h" ou "próxima semana de manhã".`,
      (context) =>
        `Show, ${context.name || ""}! Pra ${
          context.service || "o serviço"
        }, qual dia e horário rola? Exemplo: "hoje às 16h" ou "próximo sábado às 9h".`,
      (context) =>
        `Entendido, ${context.name || "você"}! 😄 Quando quer marcar ${
          context.service || "esse serviço"
        }? Joga aí um dia e horário, tipo "amanhã cedo".`,
    ],
    askingContact: [
      (context) =>
        `Quase na reta final, ${
          context.name || ""
        }! 😊 Pra confirmar o agendamento de ${
          context.service || "seu serviço"
        } em ${
          context.date || "seu horário"
        }, me passa seu nome completo e e-mail, por favor.`,
      (context) =>
        `Falta só um detalhe, ${
          context.name || "amigo(a)"
        }! 😄 Me manda seu nome completo e e-mail pra garantir o agendamento de ${
          context.service || "o serviço"
        } em ${context.date || "seu horário"}.`,
      (context) =>
        `Tô quase confirmando, ${
          context.name || ""
        }! Só preciso do seu nome completo e e-mail pra fechar o agendamento de ${
          context.service || "seu serviço"
        }.`,
      (context) =>
        `Ótimo, ${context.name || "você"}! Pra finalizar o agendamento de ${
          context.service || "o serviço"
        } em ${
          context.date || "seu horário"
        }, é só me passar seu nome e e-mail! 😊`,
    ],
    success: [
      (context) =>
        `Prontinho, ${context.name || "você"}! ✅ Seu agendamento de ${
          context.service
        } para ${context.date} tá confirmado! Fica de olho no ${
          context.email
        } que a confirmação chega rapidinho. 😊`,
      (context) =>
        `Deu tudo certo, ${context.name || "amigo(a)"}! 🎉 O agendamento de ${
          context.service
        } pra ${context.date} tá na mão. Checa o ${
          context.email
        } pra mais detalhes!`,
      (context) =>
        `Show, ${context.name || ""}! Seu ${context.service} tá agendado pra ${
          context.date
        }. 😄 A confirmação já tá indo pro seu e-mail: ${context.email}.`,
      (context) =>
        `Agendamento na conta, ${context.name || "você"}! 🥳 ${
          context.service
        } marcado pra ${context.date}. Dá uma olhada no ${
          context.email
        } pra confirmar!`,
    ],
    invalidInput: [
      (context) =>
        `Ops, não saquei o que você quis dizer, ${
          context.name || ""
        }! 😅 Tente algo como "agendar", "marcar" ou me explica direitinho o que você quer!`,
      (context) =>
        `Eita, não entendi essa, ${
          context.name || "amigo(a)"
        }! 😕 Pode mandar algo como "quero agendar" ou "marcar consulta" pra eu te ajudar?`,
      (context) =>
        `Hmm, fiquei na dúvida, ${
          context.name || ""
        }! 😜 Tenta dizer "agendar" ou explicar com outras palavras que eu te acompanho!`,
      (context) =>
        `Vish, não captei, ${
          context.name || "amigo(a)"
        }! 😄 Me dá uma ajuda e fala algo como "quero marcar" ou "agendamento".`,
    ],
    invalidContact: [
      (context) =>
        `Parece que o nome ou e-mail tá com algum problema, ${
          context.name || ""
        }. 😕 Tenta de novo, tipo: "João Silva, joao.silva@email.com".`,
      (context) =>
        `Ops, algo no contato não bateu, ${
          context.name || "amigo(a)"
        }! 😅 Me passa seu nome completo e e-mail novamente, como "Maria Souza, maria@email.com".`,
      (context) =>
        `Não consegui validar o contato, ${
          context.name || ""
        }. 😊 Por favor, me manda nome e e-mail certinhos, tipo "Ana Lima, ana.lima@email.com".`,
      (context) =>
        `Eita, o contato não tá ok, ${
          context.name || "você"
        }! 😜 Tenta mandar seu nome e e-mail de novo, por exemplo: "Pedro Santos, pedro@email.com".`,
    ],
    invalidDateTime: [
      (context) =>
        `Hmm, essa data ou horário tá meio confuso, ${
          context.name || ""
        }. 🗓️ Tenta dizer algo como "amanhã às 10h" ou "sexta de manhã". Qual é o melhor pra você?`,
      (context) =>
        `Não consegui entender esse horário, ${
          context.name || "amigo(a)"
        }! 😕 Que tal "próxima quarta às 14h" ou "hoje à tarde"? Me dá uma luz!`,
      (context) =>
        `Eita, essa data não rolou, ${
          context.name || ""
        }! 😅 Tenta algo como "25/05 às 15h" ou "próximo sábado de manhã". Qual você prefere?`,
      (context) =>
        `Ops, não captei a data/horário, ${
          context.name || "você"
        }! 😄 Me fala algo como "quinta às 16h" ou "amanhã cedo" pra eu te ajudar!`,
    ],
    pastDateTime: [
      (context) =>
        `Vish, essa data já passou, ${
          context.name || ""
        }! 😅 Me diz uma data de hoje ou do futuro, tipo "hoje às 14h" ou "amanhã de manhã".`,
      (context) =>
        `Não rola agendar no passado, ${
          context.name || "amigo(a)"
        }! 🕰️ Tenta uma data atual, como "quarta às 10h" ou "próxima semana à tarde".`,
      (context) =>
        `Essa data já era, ${
          context.name || ""
        }! 😜 Me fala um dia de hoje pra frente, tipo "sexta às 15h" ou "amanhã às 9h".`,
      (context) =>
        `Eita, não dá pra marcar no passado, ${
          context.name || "você"
        }! 😄 Joga uma data futura, como "hoje às 16h" ou "próxima quinta de manhã".`,
    ],
    invalidTime: [
      (context) =>
        `Ops, esse horário não tá dentro do nosso expediente (8h às 18h), ${
          context.name || ""
        }! 😕 Tenta algo como "amanhã às 14h" ou "sexta às 10h".`,
      (context) =>
        `Vish, fora do horário comercial, ${
          context.name || "amigo(a)"
        }! ⏰ Nosso atendimento é das 8h às 18h. Que tal "quarta às 15h" ou "hoje às 9h"?`,
      (context) =>
        `Eita, esse horário não rola, ${
          context.name || ""
        }! 😅 Funcionamos das 8h às 18h. Tenta "amanhã de manhã" ou "sexta à tarde".`,
      (context) =>
        `Não dá pra marcar nesse horário, ${
          context.name || "você"
        }! 😜 Nosso expediente é das 8h às 18h. Que tal "hoje às 16h" ou "quinta às 12h"?`,
    ],
    confirmService: [
      (context) =>
        `Beleza, ${context.name || ""}! Você quer agendar ${
          context.service || "esse serviço"
        }, tá certo? 😊 Confirme ou me diz outro serviço se eu errei.`,
      (context) =>
        `Tô conferindo: é ${context.service || "esse serviço"} mesmo, ${
          context.name || "amigo(a)"
        }? 😄Confirme para seguir ou corrige se for outro serviço.`,
      (context) =>
        `Ok, ${context.name || ""}! Escolheu ${
          context.service || "um serviço"
        }. Confirma para processeguir ou me fala se é outro serviço!`,
      (context) =>
        `Entendi, ${context.name || "você"}! É ${
          context.service || "esse serviço"
        }? 😊 Se tá ok, é só confirmar. Se não, me conta o serviço certo.`,
    ],
    back: [
      (context) =>
        `Tranquilo, ${
          context.name || ""
        }! 😊 Vamos voltar um passo. O que você quer fazer agora?`,
      (context) =>
        `Sem crise, ${
          context.name || "amigo(a)"
        }! 😄 Voltamos um pouquinho. Me diz como continuo te ajudando!`,
      (context) =>
        `Beleza, ${
          context.name || ""
        }! 😜 Demos um passo atrás. Qual é o próximo movimento?`,
      (context) =>
        `Ok, ${
          context.name || "você"
        }! 😊 Voltamos. Me fala o que você quer agora: agendar, mudar algo ou outra coisa?`,
    ],
    cancel: [
      (context) =>
        `Tudo bem, ${
          context.name || ""
        }! Agendamento cancelado. 😊 Se quiser tentar de novo, é só dizer "agendar" ou "marcar"!`,
      (context) =>
        `Cancelado com sucesso, ${
          context.name || "amigo(a)"
        }! 😄 Quando quiser, é só falar "quero agendar" que a gente recomeça.`,
      (context) =>
        `Ok, ${
          context.name || ""
        }! Cancelei tudo. 😜 Se mudar de ideia, é só dizer "agendar" ou "marcar".`,
      (context) =>
        `Feito, ${
          context.name || "você"
        }! 😊 Processo cancelado. Se quiser voltar, é só falar "agendar" ou "quero marcar".`,
    ],
    noHistory: [
      (context) =>
        `Opa, já tá no começo, ${
          context.name || ""
        }! 😅 Não dá pra voltar mais. Quer "agendar" ou fazer outra coisa?`,
      (context) =>
        `Eita, estamos no ponto zero, ${
          context.name || "amigo(a)"
        }! 😜 Bora começar? Diz "agendar" ou me conta o que você quer.`,
      (context) =>
        `Sem mais pra voltar, ${
          context.name || ""
        }! 😄 Tô pronto pra começar do zero. Fala "agendar" ou outra coisa que você precisa!`,
      (context) =>
        `Já estamos no início, ${
          context.name || "você"
        }! 😊 Quer "marcar" algo ou tem outra ideia? Me conta!`,
    ],
    help: [
      (context) =>
        `Sem problemas, ${
          context.name || ""
        }! 😊 Sou o ReservAI e posso te ajudar com agendamentos, dúvidas ou qualquer coisa. Tenta dizer "agendar", "marcar" ou me explica o que você precisa!`,
      (context) =>
        `Beleza, ${
          context.name || "amigo(a)"
        }! 😄 Tô aqui pra te guiar. Quer agendar algo? É só dizer "quero agendar". Ou me conta o que tá rolando!`,
      (context) =>
        `Tranquilo, ${
          context.name || ""
        }! 😜 Posso te ajudar com agendamentos ou tirar dúvidas. Fala "agendar" ou me diz o que você quer saber.`,
      (context) =>
        `Tô aqui pra te salvar, ${
          context.name || "você"
        }! 😊 Quer marcar um horário? Diz "agendar". Ou me conta o que tá precisando!`,
    ],
    checkAvailability: [
      (context) =>
        `Ok, ${context.name || ""}! 😊 Vou checar a disponibilidade pra ${
          context.service || "o serviço"
        } em ${
          context.date || "seu horário"
        }. Me confirma o serviço e a data/hora, por favor!`,
      (context) =>
        `Beleza, ${
          context.name || "amigo(a)"
        }! 😄 Quer saber se tem horário pra ${
          context.service || "um serviço"
        }? Me diz o dia e hora, tipo "amanhã às 14h".`,
      (context) =>
        `Tô verificando pra você, ${
          context.name || ""
        }! 😊 Qual serviço e quando você tá pensando? Exemplo: "corte de cabelo amanhã às 10h".`,
    ],
    reschedule: [
      (context) =>
        `Sem crise, ${context.name || ""}! 😊 Quer mudar o agendamento de ${
          context.service || "seu serviço"
        }? Me fala a nova data e horário, tipo "quarta às 15h".`,
      (context) =>
        `Ok, ${
          context.name || "amigo(a)"
        }! 😄 Vamos reagendar. Qual o novo dia e horário pra ${
          context.service || "o serviço"
        }? Exemplo: "próxima sexta às 9h".`,
      (context) =>
        `Tranquilo, ${
          context.name || ""
        }! 😜 Me diz a nova data e horário pro agendamento de ${
          context.service || "seu serviço"
        }, como "amanhã às 16h".`,
    ],
    confirmReschedule: [
      (context) =>
        `Feito, ${context.name || "você"}! ✅ O agendamento de ${
          context.service
        } foi alterado pra ${context.date}. Confere o ${
          context.email
        } pra mais detalhes! 😊`,
      (context) =>
        `Reagendamento confirmado, ${context.name || "amigo(a)"}! 🎉 Seu ${
          context.service
        } agora é em ${context.date}. Fica de olho no ${context.email}!`,
      (context) =>
        `Tudo certo, ${context.name || ""}! 😄 O ${
          context.service
        } tá marcado pra ${context.date}. A confirmação vai pro ${
          context.email
        }.`,
    ],
    noAvailability: [
      (context) =>
        `Putz, ${context.name || ""}! 😕 Não temos vaga pra ${
          context.service || "esse serviço"
        } em ${
          context.date || "esse horário"
        }. Tenta outro horário, tipo "amanhã às 15h" ou "sexta de manhã".`,
      (context) =>
        `Ops, ${context.name || "amigo(a)"}! 😅 O horário pra ${
          context.service || "o serviço"
        } em ${
          context.date || "essa data"
        } tá cheio. Que tal outro dia, como "quarta às 10h"?`,
      (context) =>
        `Eita, ${context.name || ""}! 😜 Não tem disponibilidade pra ${
          context.service || "seu serviço"
        } em ${
          context.date || "esse horário"
        }. Me diz outro horário, tipo "próximo sábado às 14h".`,
    ],
    thankYou: [
      (context) =>
        `Por nada, ${
          context.name || "você"
        }! 😊 Fico feliz em ajudar. Qualquer coisa, é só chamar!`,
      (context) =>
        `De boa, ${
          context.name || "amigo(a)"
        }! 😄 Tô aqui pra qualquer dúvida ou agendamento. Bora?`,
      (context) =>
        `Valeu pelo "obrigado", ${
          context.name || ""
        }! 😜 Sempre que precisar, é só me chamar!`,
      (context) =>
        `Imagina, ${
          context.name || "você"
        }! 😊 Foi um prazer te ajudar. Se precisar de mais algo, é só dar um grito!`,
    ],
    // Nova categoria de respostas para explicar o bot
    botExplanation: [
      (context) =>
        `Olá, ${
          context.name || "amigo(a)"
        }! Sou o ReservAI, seu assistente de agendamentos. Minha principal função é facilitar o agendamento e reagendamento automático de serviços para você.`,
      (context) =>
        `E aí, ${
          context.name || "você"
        }! O ReservAI foi criado para otimizar seus agendamentos. Eu cuido do agendamento automático de novos serviços e também do reagendamento automático, caso precise mudar algo.`,
      (context) =>
        `Oi, ${
          context.name || "tudo bem"
        }! Basicamente, eu sou um bot de agendamento e reagendamento automático. Você me diz o que precisa, e eu faço o resto!`,
      (context) =>
        `Sou o ReservAI, seu parceiro para agendamentos! Minha especialidade é o agendamento automático de diversos serviços e também o reagendamento automático, para que você tenha total flexibilidade.`,
    ],
  };

  config = {
    scrollThreshold: 200,
    ctaDelayTime: 4000,
    messageProcessDelay: 600,
    typingIndicatorDelay: 300,
    maxHistorySteps: 5,
    businessHours: { start: 8, end: 18 },
    fallbackIntent: "invalidInput",
    maxRetries: 3,
  };

  trainingData = [
    { text: "agendar", intent: "start" },
    { text: "quero fazer um agendamento", intent: "start" },
    { text: "quero agendar", intent: "start" },
    { text: "quero um agendamento", intent: "start" },
    { text: "quero agendamento", intent: "start" },
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
    { text: "bora agendar", intent: "start" },
    { text: "vamos marcar", intent: "start" },
    { text: "oi", intent: "greeting" },
    { text: "olá", intent: "greeting" },
    { text: "bom dia", intent: "greeting" },
    { text: "boa tarde", intent: "greeting" },
    { text: "boa tarde, tudo bem?", intent: "greeting" },
    { text: "boa tarde, td bem?", intent: "greeting" },
    { text: "boa tarde tudo bem?", intent: "greeting" },
    { text: "boa tarde tdb?", intent: "greeting" },
    { text: "boa tarde td bem?", intent: "greeting" },
    { text: "boa tarde, tudo bem?", intent: "greeting" },
    { text: "boa tarde, td bem", intent: "greeting" },
    { text: "boa tarde tudo bem", intent: "greeting" },
    { text: "boa tarde tdb", intent: "greeting" },
    { text: "boa tarde td bem", intent: "greeting" },
    { text: "boa noite", intent: "greeting" },
    { text: "e aí", intent: "greeting" },
    { text: "tudo bem", intent: "greeting" },
    { text: "salve", intent: "greeting" },
    { text: "eai tudo joia", intent: "greeting" },
    { text: "fala aí", intent: "greeting" },
    { text: "oi tudo de boa", intent: "greeting" },
    { text: "alô", intent: "greeting" },
    { text: "e ae", intent: "greeting" },
    { text: "tudo jóia", intent: "greeting" },
    { text: "oiê", intent: "greeting" },
    { text: "fala tu", intent: "greeting" },
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
    { text: "tá ok", intent: "confirm" },
    { text: "blz", intent: "confirm" },
    { text: "esta certo", intent: "confirm" },
    { text: "esta correto", intent: "confirm" },
    { text: "está certo", intent: "confirm" },
    { text: "está correto", intent: "confirm" },
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
    { text: "nao", intent: "reject" },
    { text: "outro serviço", intent: "reject" },
    { text: "tá errado", intent: "reject" },
    { text: "voltar", intent: "back" },
    { text: "retroceder", intent: "back" },
    { text: "volta", intent: "back" },
    { text: "passo anterior", intent: "back" },
    { text: "volta um pouco", intent: "back" },
    { text: "voltar atrás", intent: "back" },
    { text: "vouta", intent: "back" },
    { text: "quero voltar", intent: "back" },
    { text: "cancelar", intent: "cancel" },
    { text: "desistir", intent: "cancel" },
    { text: "parar", intent: "cancel" },
    { text: "encerrar", intent: "cancel" },
    { text: "cancela", intent: "cancel" },
    { text: "quero parar", intent: "cancel" },
    { text: "deixa pra lá", intent: "cancel" },
    { text: "abandonar", intent: "cancel" },
    { text: "canselar", intent: "cancel" },
    { text: "desisto", intent: "cancel" },
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
    { text: "tô confuso", intent: "help" },
    { text: "explica aí", intent: "help" },
    { text: "tem horário disponível", intent: "checkAvailability" },
    { text: "tem vaga pra amanhã", intent: "checkAvailability" },
    { text: "quais horários livres", intent: "checkAvailability" },
    { text: "tem horário pra consulta", intent: "checkAvailability" },
    { text: "verificar disponibilidade", intent: "checkAvailability" },
    { text: "tem vaga", intent: "checkAvailability" },
    { text: "quais os horários", intent: "checkAvailability" },
    { text: "reagendar", intent: "reschedule" },
    { text: "quero mudar o horário", intent: "reschedule" },
    { text: "mudar agendamento", intent: "reschedule" },
    { text: "trocar horário", intent: "reschedule" },
    { text: "reagendar consulta", intent: "reschedule" },
    { text: "muda o dia", intent: "reschedule" },
    { text: "quero outro horário", intent: "reschedule" },
    { text: "reagendamento", intent: "reschedule" },
    { text: "confirmar reagendamento", intent: "confirmReschedule" },
    { text: "tá ok o novo horário", intent: "confirmReschedule" },
    { text: "pode mudar pra esse dia", intent: "confirmReschedule" },
    { text: "confirmo a troca", intent: "confirmReschedule" },
    { text: "novo horário tá bom", intent: "confirmReschedule" },
    { text: "sem horário", intent: "noAvailability" },
    { text: "não tem vaga", intent: "noAvailability" },
    { text: "obrigado", intent: "thankYou" },
    { text: "muito obrigado", intent: "thankYou" },
    { text: "valeu", intent: "thankYou" },
    { text: "brigado", intent: "thankYou" },
    { text: "obg", intent: "thankYou" },
    { text: "obrigada", intent: "thankYou" },
    { text: "muito obrigada", intent: "thankYou" },
    { text: "vlw", intent: "thankYou" },
    { text: "agradeço", intent: "thankYou" },
    { text: "tks", intent: "thankYou" },
    { text: "obrigadoo", intent: "thankYou" },
    { text: "valeu demais", intent: "thankYou" },
    { text: "brigadão", intent: "thankYou" },
    { text: "obrigado pela ajuda", intent: "thankYou" },
    { text: "valeu pela força", intent: "thankYou" },
    { text: "tchau", intent: "goodbye" },
    { text: "até mais", intent: "goodbye" },
    { text: "valeu e tchau", intent: "goodbye" },
    { text: "flw", intent: "goodbye" },
    { text: "até logo", intent: "goodbye" },
    { text: "tô de saída", intent: "goodbye" },
    { text: "xau", intent: "goodbye" },
    { text: "verificar agendamento", intent: "checkStatus" },
    { text: "como tá meu agendamento", intent: "checkStatus" },
    { text: "status da consulta", intent: "checkStatus" },
  ];

  constructor(toggleSelector, chatbotSelector) {
    this.conversationState = {
      step: Chatbot.STATES.INITIAL,
      data: { service: null, date: null, time: null, name: null, email: null },
      history: [],
      hasWelcomed: false,
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
      greeting: { response: "greeting", nextState: Chatbot.STATES.INITIAL },
      help: { response: "help", nextState: Chatbot.STATES.INITIAL },
      back: { response: "noHistory", nextState: Chatbot.STATES.INITIAL },
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
