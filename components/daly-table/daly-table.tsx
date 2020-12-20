import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { CreateEditModalForm } from './components/create-edit-modal-form';
import { useDalyTableColumns } from './use-daly-table-columns';
import { useDalyTableDataSource } from './use-daly-table-data-source';
import { useDalyTableEditItemData } from './use-daly-table-edit-item-data';
import { useDalyTableCreateItemData } from './use-daly-table-create-item-data';
import { useDalyTableCreateEditItemData } from './use-daly-table-create-edit-item-data';

export const DalyTable: React.FC = () => {
    const [visibleCreateEditForm, setVisibleCreateEditForm] = useState(false);
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
                visible={visibleCreateEditForm}
                {...createEditModalForm}
            />
        </>
    )
}