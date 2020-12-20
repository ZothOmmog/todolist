import { format } from 'date-fns';
import { IDalyTableItemTask } from '../daly-table-slice';

export const useDalyTableColumns = () => {
    const renderTimeFromUtc = (dateStrUtc: string) => format(new Date(dateStrUtc), 'HH:mm:ss');
    return [
        {
            title: 'Дата',
            dataIndex: 'date',
            render: (dateStrUtc: string) => format(new Date(dateStrUtc), 'dd.MM.yyyy')
        },
        {
            title: 'Номер таска',
            dataIndex: 'keyTask'
        },
        {
            title: 'Время начала',
            dataIndex: 'timeStart',
            render: renderTimeFromUtc
        },
        {
            title: 'Время конца',
            dataIndex: 'timeEnd',
            render: renderTimeFromUtc
        },
        {
            title: 'Описание',
            dataIndex: 'desctiption'
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            render: (_text: any, record: IDalyTableItemTask) => {
                
                return 'В разработке :)';
            }
        }
    ]
};