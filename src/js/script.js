import { Accordion } from "./modules/Faq-accordion.js";
import { ToggleButton } from "./modules/Toggle-button.js";

document.addEventListener("DOMContentLoaded", () => {
  new Accordion(".accordion-item");
});

document.addEventListener("DOMContentLoaded", () => {
  new ToggleButton();
});
