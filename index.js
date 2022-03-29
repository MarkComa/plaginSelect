import { Select } from "./select/select";
import "./select/select.scss";

const select = new Select("#select", {
  placeholder: "Выбери элемент",
  selectedId: "2",
  data: [
    { id: "1", value: "react" },
    { id: "2", value: "react native" },
    { id: "3", value: "vue" },
    { id: "4", value: "Angular" },
    { id: "5", value: "next" },
    { id: "6", value: "node" },
  ],
  onSelect(item) {
    console.log("Selected item:" + item);
  },
});
window.s = select;
