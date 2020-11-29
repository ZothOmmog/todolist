import { RootState } from "../../../redux";
import { dalyTableAdapter } from "./daly-table-slice";

export const dalyTableSelectors = dalyTableAdapter.getSelectors<RootState>(
    state => state.dalyTable
);