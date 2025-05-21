export class ScrollSuave {
  constructor(linksSelector, offset = 0) {
    this.links = document.querySelectorAll(linksSelector);
    this.offset = offset;
    this.addEventListeners();
  }

  addEventListeners() {
    this.links.forEach((link) => {
      link.addEventListener("click", this.scrollToSection.bind(this));
    });
  }

  scrollToSection(e) {
    const href = this.getHref(e.currentTarget);

    if (!href || href.charAt(0) !== "#") {
      return;
    }

    e.preventDefault();

    const targetElement = document.querySelector(href);

    if (targetElement) {
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - this.offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }

  getHref(element) {
    const href = element.getAttribute("href");
    if (href === "#" || href === null) {
      return null;
    }
    const url = new URL(href, window.location.origin);
    if (url.origin === window.location.origin) {
      return url.hash;
    }
    return href;
  }
}
