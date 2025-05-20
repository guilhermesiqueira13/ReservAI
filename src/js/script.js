import { Accordion } from "./modules/Faq-accordion.js";
import { ToggleButton } from "./modules/Toggle-button.js";
import { Chatbot } from "./modules/Chatbot-free.js";

document.addEventListener("DOMContentLoaded", () => {
  new Accordion(".accordion-item");
  new ToggleButton(".chatbot-toggle", "#chatbot");
  new Chatbot();
});
