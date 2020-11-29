import { Button } from 'antd';
import { useState } from 'react';
import { COMMON_FETCH_ERROR } from '../../common-constants';
import { useAppDispatch } from '../../redux';
import { CreateEditModalForm } from './create-edit-modal-form';
import { dalyTableThunks, IDalyItemForFetch } from './daly-table-slice';

interface ICreateButtonProps {
    
}

export const CreateButton: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const dispatch = useAppDispatch();
    const onCreate = (dalyItem: IDalyItemForFetch) => {
        //Эмитация задержки ответа
        return new Promise<void>((resolve, reject) => {
            return dispatch(dalyTableThunks.fetchDalyItemAdded(dalyItem)).then((value) => {
                console.log(value);
                if (value.payload === COMMON_FETCH_ERROR) reject();
                else resolve();
            });
        })
    };

    const showModal = () => {
        setVisible(true);
    };

    const onCancel = () => setVisible(false);

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