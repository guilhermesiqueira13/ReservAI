export class TesteGratis {
  constructor(formSelector, feedbackSelector) {
    this.form = document.querySelector(formSelector);
    this.feedback = document.querySelector(feedbackSelector);

    if (!this.form || !this.feedback) {
      console.error("Formulário ou feedback não encontrado.");
      return;
    }

    this.attachEvent();
  }

  attachEvent() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  handleSubmit() {
    const name = this.form.querySelector("#name").value.trim();
    const email = this.form.querySelector("#email").value.trim();
    const phone = this.form.querySelector("#phone").value.trim();
    const serviceType = this.form.querySelector("#serviceType").value;
    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse) {
      alert("Por favor, confirme o reCAPTCHA antes de enviar.");
      return;
    }

    if (!name || !email || !phone || !serviceType) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    this.showSuccess();
  }

  showSuccess() {
    this.feedback.textContent =
      "Inscrição recebida! Em breve entraremos em contato. ✅";
    this.feedback.classList.remove("hidden");

    this.form.reset();
    grecaptcha.reset();
  }
}
