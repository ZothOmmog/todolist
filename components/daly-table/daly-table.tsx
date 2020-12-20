import { Button, Table } from 'antd';
import { CreateEditModalForm } from './components/create-edit-modal-form';
import { 
    useDalyTableColumns, 
    useDalyTableCreateEditItemData,
    useDalyTableDataSource
} from './hooks';

export const DalyTable: React.FC = () => {
    const dataSource = useDalyTableDataSource();
    const columns = useDalyTableColumns();
    const {
        createButtonProps,
        dalyTableProps,
        createEditModalForm
    } = useDalyTableCreateEditItemData(dataSource);

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
                dataSource={dataSource}
                columns={columns}
                {...dalyTableProps}
            />
            <CreateEditModalForm
                {...createEditModalForm}
            />
        </>
    )
}