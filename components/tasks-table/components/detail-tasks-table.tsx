import { Col, Row, Table } from "antd";
import { useDetailTasksTableColumns } from "../hooks";
import { IDetailTaskInfo } from "../tasks-table-types"

interface IDetailTasksTableProps {
    keyTask: number
}

export const DetailTasksTable = ({ keyTask }: IDetailTasksTableProps) => {
    const columns = useDetailTasksTableColumns();
    const MOCK_DATA: IDetailTaskInfo[] = [
        {
            date: '21.10.2020',
            duration: '4:00:00'
        },
        {
            date: '22.10.2020',
            duration: '3:30:00'
        },
        {
            date: '23.10.2020',
            duration: '2:10:00'
        },
        {
            date: '24.10.2020',
            duration: '6:20:00'
        }
    ];

    return (
        <div>
            <Table
                dataSource={MOCK_DATA}
                columns={columns}
                pagination={false}
                showHeader={false}
            />
        </div>
    )
}