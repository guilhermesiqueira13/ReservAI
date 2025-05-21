import { Accordion } from "./modules/FaqAccordion.js";
import { ToggleButton } from "./modules/ToggleButton.js";
import { Chatbot } from "./modules/ChatbotFree.js";
import { ScrollSuave } from "./modules/ScrollSuave.js";

document.addEventListener("DOMContentLoaded", () => {
  new Accordion(".accordion-item");
  new ToggleButton();
  new Chatbot(".chatbot-toggle", "#chatbot");
  new ScrollSuave(".nav-header ul li a");

  const headerButton = document.querySelector(".nav-header .button");
  if (headerButton && headerButton.getAttribute("href") === "#") {
    headerButton.setAttribute("href", "#beneficios");
    new ScrollSuave(".nav-header .button");
  }

  const mainButton = document.querySelector(".section-content-button");
  if (mainButton && mainButton.getAttribute("href") === "#") {
    mainButton.setAttribute("href", "#beneficios");
    new ScrollSuave(".section-content-button");
  }
  const headerHeight = document.querySelector(".container-header").offsetHeight;
  new ScrollSuave(".nav-header ul li a", headerHeight);
});
