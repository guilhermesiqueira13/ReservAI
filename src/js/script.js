import { Accordion } from "./modules/FaqAccordion.js";
import { ToggleButton } from "./modules/ToggleButton.js";
import { Chatbot } from "./modules/ChatbotFree.js";
import { ScrollSuave } from "./modules/ScrollSuave.js";
import { TesteGratis } from "./modules/TesteGratis.js";
import { HamburgerMenu } from "./modules/menuHamburguer.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Accordion
  const accordionItems = document.querySelectorAll(".accordion-item");
  if (accordionItems.length) {
    new Accordion(".accordion-item");
  } else {
    console.warn("Accordion items (.accordion-item) not found on this page.");
  }

  // Initialize ToggleButton
  try {
    new ToggleButton();
  } catch (error) {
    console.error("Error initializing ToggleButton:", error);
  }

  // Initialize Chatbot
  try {
    new Chatbot();
  } catch (error) {
    console.error("Error initializing Chatbot:", error);
  }

  // Initialize ScrollSuave for navigation links
  const navLinks = document.querySelectorAll(".nav-header ul li a");
  const headerHeight =
    document.querySelector(".container-header")?.offsetHeight || 0;
  if (navLinks.length) {
    new ScrollSuave(".nav-header ul li a", headerHeight);
  } else {
    console.warn(
      "Navigation links (.nav-header ul li a) not found on this page."
    );
  }

  // Initialize ScrollSuave for header button
  const headerButton = document.querySelector(".nav-header .button");
  if (headerButton) {
    if (headerButton.getAttribute("href") === "#") {
      headerButton.setAttribute("href", "#beneficios");
      new ScrollSuave(".nav-header .button", headerHeight);
    }
  } else {
    console.warn("Header button (.nav-header .button) not found on this page.");
  }

  // Initialize ScrollSuave for main button
  const mainButton = document.querySelector(".section-content-button");
  if (mainButton) {
    if (mainButton.getAttribute("href") === "#") {
      mainButton.setAttribute("href", "#beneficios");
      new ScrollSuave(".section-content-button", headerHeight);
    }
  } else {
    console.warn(
      "Main button (.section-content-button) not found on this page."
    );
  }

  // Initialize TesteGratis
  const freeTrialForm = document.querySelector("#freeTrialForm");
  if (freeTrialForm && document.querySelector("#feedback")) {
    new TesteGratis("#freeTrialForm", "#feedback");
  } else {
    console.warn(
      "Free trial form (#freeTrialForm) or feedback (#feedback) not found on this page."
    );
  }

  // Initialize HamburgerMenu
  const hamburgerButton = document.querySelector(".hamburger-menu");
  const navContainer = document.querySelector(".nav-container");
  const navBackdrop = document.querySelector(".nav-backdrop");
  if (hamburgerButton && navContainer && navBackdrop) {
    new HamburgerMenu(".hamburger-menu", ".nav-container", ".nav-backdrop");
  } else {
    console.error("Hamburger menu initialization failed. Missing elements:", {
      hamburgerButton: !!hamburgerButton,
      navContainer: !!navContainer,
      navBackdrop: !!navBackdrop,
    });
  }
});
