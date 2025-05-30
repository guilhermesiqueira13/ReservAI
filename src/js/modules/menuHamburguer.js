export class HamburgerMenu {
  /**
   * Constructor for the HamburgerMenu class.
   * @param {string} hamburgerSelector - CSS selector for the hamburger button.
   * @param {string} navContainerSelector - CSS selector for the navigation container.
   * @param {string} backdropSelector - CSS selector for the backdrop element.
   */
  constructor(hamburgerSelector, navContainerSelector, backdropSelector) {
    this.hamburgerMenu = document.querySelector(hamburgerSelector);
    this.navContainer = document.querySelector(navContainerSelector);
    this.backdrop = document.querySelector(backdropSelector);
    this.isToggling = false; // Flag to prevent rapid toggling

    // Validate elements
    if (!this.hamburgerMenu) {
      console.error(
        `Hamburger menu element not found for selector: ${hamburgerSelector}`
      );
      return;
    }
    if (!this.navContainer) {
      console.error(
        `Navigation container not found for selector: ${navContainerSelector}`
      );
      return;
    }
    if (!this.backdrop) {
      console.error(
        `Backdrop element not found for selector: ${backdropSelector}`
      );
      return;
    }

    this.focusableElements =
      this.navContainer.querySelectorAll("a[href], button");
    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement =
      this.focusableElements[this.focusableElements.length - 1];

    this.addEventListeners();
  }

  /**
   * Debounces a function to prevent rapid execution.
   * @param {Function} func - Function to debounce.
   * @param {number} wait - Debounce wait time in milliseconds.
   * @returns {Function} Debounced function.
   */
  _debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /**
   * Toggles the menu and backdrop visibility with debouncing.
   */
  _toggleMenu = this._debounce(() => {
    if (this.isToggling) return;
    this.isToggling = true;

    const isActive = this.hamburgerMenu.classList.toggle("active");
    this.navContainer.classList.toggle("active");
    this.backdrop.classList.toggle("active");
    this.hamburgerMenu.setAttribute("aria-expanded", isActive);

    // Trap focus when menu is open
    if (isActive && this.firstFocusableElement) {
      this.firstFocusableElement.focus();
    }

    setTimeout(() => {
      this.isToggling = false;
    }, 400); // Match CSS transition duration
  }, 100);

  /**
   * Closes the menu and backdrop.
   */
  _closeMenu() {
    if (this.isToggling) return;
    this.isToggling = true;

    this.hamburgerMenu.classList.remove("active");
    this.navContainer.classList.remove("active");
    this.backdrop.classList.remove("active");
    this.hamburgerMenu.setAttribute("aria-expanded", "false");
    this.hamburgerMenu.focus(); // Return focus to hamburger button

    setTimeout(() => {
      this.isToggling = false;
    }, 400);
  }

  /**
   * Traps focus within the menu for keyboard navigation.
   * @param {KeyboardEvent} e - The keyboard event.
   */
  _trapFocus(e) {
    if (!this.navContainer.classList.contains("active")) return;

    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === this.firstFocusableElement) {
        e.preventDefault();
        this.lastFocusableElement.focus();
      } else if (
        !e.shiftKey &&
        document.activeElement === this.lastFocusableElement
      ) {
        e.preventDefault();
        this.firstFocusableElement.focus();
      }
    }
  }

  /**
   * Adds event listeners for menu interactions.
   */
  addEventListeners() {
    // Prevent multiple initializations
    if (this.hamburgerMenu.dataset.initialized) return;
    this.hamburgerMenu.dataset.initialized = "true";

    // Toggle menu on hamburger click
    this.hamburgerMenu.addEventListener("click", this._toggleMenu);

    // Close menu on nav link or button click using event delegation
    this.navContainer.addEventListener("click", (e) => {
      const link = e.target.closest(
        ".nav-header ul li a, .nav-header a.button"
      );
      if (link) {
        this._closeMenu();
      }
    });

    // Close menu on backdrop click
    this.backdrop.addEventListener("click", () => this._closeMenu());

    // Close menu on Escape key press and handle focus trapping
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.navContainer.classList.contains("active")
      ) {
        this._closeMenu();
      }
      this._trapFocus(e);
    });
  }
}
