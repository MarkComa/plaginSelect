import { Select } from "./select/select";
import "./select/select.scss";

const select = new Select("#select", {
  placeholder: "Выбери элемент",
});
window.s = select;
