import { Button } from 'antd';
import { useState } from 'react';
import { fetchErrors } from '../../../common-types';
import { useAppDispatch } from '../../../redux';
import { CreateEditModalForm } from './create-edit-modal-form';
import { dalyTableActions, dalyTableThunks, IDalyItemForFetch } from '../daly-table-slice';

interface ICreateButtonProps {
    initialValues: {
        date: string,
        timeStart: string,
        timeEnd: string,
        keyTask: number,
    }
}

export const CreateButton = ({ initialValues }: ICreateButtonProps) => {
    const [visible, setVisible] = useState(false);

    const dispatch = useAppDispatch();
    const onCreate = (dalyItem: IDalyItemForFetch) => {
        return new Promise<0>(async (resolve, reject) => {
            const result = await dispatch(dalyTableThunks.fetchDalyItemAdded(dalyItem));

            if (result.payload === fetchErrors.common) reject();
            else {
                setVisible(false);
                resolve(0);
            }
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
                initialValues={initialValues}
                onCancel={onCancel}
                onCreate={onCreate}
                visible={visible}
                isEdit={false}
            />
        </>
    );
}