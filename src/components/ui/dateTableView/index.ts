import { App } from "vue";
import DateTableView from "./src/DateTableView.vue";

DateTableView.install = (app: App): void => {
  app.component(DateTableView.name, DateTableView);
};

export default DateTableView;
