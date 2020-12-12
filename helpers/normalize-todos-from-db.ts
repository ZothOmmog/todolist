import { startOfDay } from "date-fns";
import { IDalyTableItemTaskDB } from "../components/daly-table/daly-table-slice";

export const normalizeTodosFromDb = (todos: IDalyTableItemTaskDB[]) => todos.map(item => ({
    ...item,
    date: startOfDay(new Date(item.timeStart)).toUTCString(),
}));