import { Button } from 'antd';
import { useState } from 'react';
import { fetchErrors } from '../../common-types';
import { useAppDispatch } from '../../redux';
import { CreateEditModalForm } from './create-edit-modal-form';
import { dalyTableActions, dalyTableThunks, IDalyItemForFetch } from './daly-table-slice';

interface ICreateButtonProps {
    
}

export const CreateButton: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const dispatch = useAppDispatch();
    const onCreate = (dalyItem: IDalyItemForFetch) => {
        return new Promise<void>((resolve, reject) => {
            return dispatch(dalyTableThunks.fetchDalyItemAdded(dalyItem)).then((value) => {
                console.log(value);
                if (value.payload === fetchErrors.common) reject();
                else resolve();
            });
        })
    };

    const showModal = () => {
        setVisible(true);
    };

    const onCancel = () => {
        setVisible(false);
        dispatch(dalyTableActions.cancelAddItem());
    }

    return (
        <>
            <Button type='primary' onClick={showModal} style={{ marginBottom: 16, alignSelf: 'flex-start' }}>Добавить запись (Ctrl+Shift+a)</Button>
            <CreateEditModalForm
                onCancel={onCancel}
                onCreate={onCreate}
                visible={visible}
            />
        </>
    );
}