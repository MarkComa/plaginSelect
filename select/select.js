const getTemplate = (placeholder) => {
  const text = placeholder ?? "placeholder по умолчанию";
  return ` <div class="select__input" data-type='input'>
            <span>${text}</span>
            <span class="select__input__icon">></span>
          </div>
          <div class="select__dropdown">
            <ul class="select__list">
              <li class="select__item">1</li>
              <li class="select__item">2</li>
              <li class="select__item">3</li>
              <li class="select__item">1</li>
              <li class="select__item">2</li>
              <li class="select__item">3</li>
            </ul>`;
};

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.#render();
    this.#setup();
  }

  #render() {
    const { placeholder } = this.options;
    this.$el.classList.add("select");
    this.$el.innerHTML = getTemplate(placeholder);
  }
  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
  }
  clickHandler(event) {
    const { type } = event.target.dataset;
    if (type === "input") {
      this.toggle();
    }
  }

  get isOpen() {
    return this.$el.classList.contains("open");
  }

  toggle() {
    !this.isOpen ? this.open() : this.close();
  }

  open() {
    this.$el.classList.add("open");
  }
  close() {
    this.$el.classList.remove("open");
  }
  destroy() {}
}
