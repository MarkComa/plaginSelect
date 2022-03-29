const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? "placeholder по умолчанию";
  const selectItem = data.map((el) => {
    let cls = "";
    if (el.id === selectedId) {
      text = el.value;
      cls = "selected";
    }
    return `<li class="select__item ${cls}" key=${el.id} data-type='item' data-id=${el.id}>
      ${el.value}
    </li>
    `;
  });
  return `<div class='select__backdrop' data-type='backdrop'></div>
            <div class="select__input" data-type='input'>
                <span data-type='value'>${text}</span>
                <span class="select__input__icon">></span>
            </div>
            <div class="select__dropdown">
                <ul class="select__list">
                ${selectItem.join("")}
                </ul>
            </div>
        `;
};

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;
    this.#render();
    this.#setup();
  }

  #render() {
    const { data, placeholder } = this.options;
    this.$el.classList.add("select");
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }
  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
    this.$value = this.$el.querySelector(`[data-type='value']`);
  }
  clickHandler(event) {
    const { type } = event.target.dataset;
    switch (type) {
      case "input":
        this.toggle();
        break;
      case "item":
        const id = event.target.dataset.id;
        this.select(id);
        break;
      case "backdrop":
        this.close();
        break;
      default:
        break;
    }
  }

  get isOpen() {
    return this.$el.classList.contains("open");
  }
  get current() {
    return this.options.data.find((el) => el.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;
    this.$el
      .querySelectorAll(`[data-type='item']`)
      .forEach((el) => el.classList.remove("selected"));
    this.$el.querySelector(`[data-id='${id}']`).classList.add("selected");
    this.close();
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
