import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { CreateEditModalForm } from './components/create-edit-modal-form';
import { useDalyTableColumns } from './use-daly-table-columns';
import { useDalyTableDataSource } from './use-daly-table-data-source';
import { useDalyTableEditItemData } from './use-daly-table-edit-item-data';

export const DalyTable: React.FC = () => {
    const [visibleCreateEditForm, setVisibleCreateEditForm] = useState(false);
    const dataSource = useDalyTableDataSource();
    const columns = useDalyTableColumns();
    const {
        tableProps,
        createEditModalFormProps
    } = useDalyTableEditItemData(setVisibleCreateEditForm);

    return (
        <>
            <Button 
                type='primary' 
                 
                style={{ marginBottom: 16, alignSelf: 'flex-start' }}
            >
                Добавить запись (Ctrl+Shift+a)
            </Button>
            <Table
                rowClassName={() => 'editable-row'}
                className='daly-table'
                bordered
                dataSource={dataSource}
                columns={columns}
                {...tableProps}
            />
            <CreateEditModalForm
                visible={visibleCreateEditForm}
                isEdit
                {...createEditModalFormProps}
            />
        </>
    )
}