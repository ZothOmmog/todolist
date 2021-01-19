import { Button, Table } from 'antd';
import { useFetch } from '../../helpers/use-fetch';
import { CreateEditModalForm } from './components/create-edit-modal-form';
import { dalyTableSelectors, IDalyTableItemTask } from './daly-table-slice';
import { dalyTableThunks } from './daly-table-slice/daly-table-thunks';
import { 
    useDalyTableColumns, 
    useDalyTableCreateEditItemData,
} from './hooks';

export const DalyTable: React.FC = () => {
    const { data, isLoading } = useFetch<IDalyTableItemTask>(
        async dispatch => dispatch(dalyTableThunks.fetchDalyItems()),
        dalyTableSelectors.selectAll
    )
    const columns = useDalyTableColumns();
    const {
        createButtonProps,
        dalyTableProps,
        createEditModalForm
    } = useDalyTableCreateEditItemData(data);

    return (
        <>
            <Button 
                type='primary' 
                style={{ marginBottom: 16, alignSelf: 'flex-start' }}
                {...createButtonProps}
            >
                Добавить запись (Ctrl+Shift+a)
            </Button>
            <Table
                rowClassName={() => 'editable-row'}
                className='daly-table'
                bordered
                dataSource={data}
                loading={isLoading}
                columns={columns}
                {...dalyTableProps}
            />
            <CreateEditModalForm
                {...createEditModalForm}
            />
        </>
    )
}