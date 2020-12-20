import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux";
import { dalyTableSelectors, dalyTableThunks } from "../daly-table-slice";

export const useDalyTableDataSource = () => {
    const dataSource = useSelector(dalyTableSelectors.selectAll);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(dalyTableThunks.fetchDalyItems());
    }, []);

    return dataSource;
}