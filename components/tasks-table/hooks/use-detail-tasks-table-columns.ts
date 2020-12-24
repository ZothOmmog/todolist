import { ColumnsType } from "antd/lib/table";
import { IDetailTaskInfo } from "../tasks-table-types";

export const useDetailTasksTableColumns = () => {
    const columns: ColumnsType<IDetailTaskInfo> = [
        {
            dataIndex: 'date',
            title: 'Дата',
            align: 'right',
            width: 100
        },
        {
            dataIndex: 'duration',
            title: 'продолжительность',
            align: 'right',
            width: 400
        }
    ];

    return columns;
}