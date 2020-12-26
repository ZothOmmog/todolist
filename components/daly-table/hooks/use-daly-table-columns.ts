import { ColumnsType } from 'antd/lib/table';
import { format, differenceInMinutes } from 'date-fns';
import { minutesToString } from '../../../helpers/minutes-to-string';
import { IDalyTableItemTask } from '../daly-table-slice';

export const useDalyTableColumns = () => {
    const renderTimeFromUtc = (dateStrUtc: string) => format(new Date(dateStrUtc), 'HH:mm');
    const columns: ColumnsType<IDalyTableItemTask> = [
        {
            title: 'Дата',
            dataIndex: 'date',
            render: (dateStrUtc: string) => format(new Date(dateStrUtc), 'dd.MM.yyyy'),
            align: 'right'
        },
        {
            title: 'Номер таска',
            dataIndex: 'keyTask',
            align: 'right'
        },
        {
            title: 'Время начала',
            dataIndex: 'timeStart',
            render: renderTimeFromUtc,
            align: 'right'
        },
        {
            title: 'Время конца',
            dataIndex: 'timeEnd',
            render: renderTimeFromUtc,
            align: 'right'
        },
        {
            title: 'Продолжительность',
            render: (_, record) => minutesToString(
                differenceInMinutes(
                    new Date(record.timeEnd),
                    new Date(record.timeStart)
                )
            ),
            align: 'right'
        },
        {
            title: 'Описание',
            dataIndex: 'desctiption'
        }
    ];
    return columns;
};