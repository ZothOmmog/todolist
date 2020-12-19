import { Button, Form, Modal, Input, TimePicker, Row, Col, notification } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { IDalyItemForFetch } from '../daly-table-slice';
import { InitialValues } from '../daly-table-types';
import { useNormalizeInitValues } from '../use-normalize-init-values';

const REQUIRE_HINT = 'Обязательно для заполнения';

interface ICreateEditModalFormProps {
    visible: boolean;
    initialValues?: InitialValues,
    onCreate: (values: IDalyItemForFetch) => Promise<0 | 1>;
    onCancel: () => void;
    isEdit: boolean;
}

export const CreateEditModalForm: React.FC<ICreateEditModalFormProps> = ({
    visible,
    initialValues,
    onCreate,
    onCancel,
    isEdit
}) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (!visible && loading) {
            setLoading(false);
        }
    }, [visible]);

    useEffect(() => {
        if (visible) form.resetFields();
    }, [visible]);

    const handleCancel = () => {
        // form.resetFields();
        onCancel();
    }

    const handleOk = async () => {
        try{
            setLoading(true);
            const values = await form.validateFields();

            const newDalyItem: IDalyItemForFetch = {
                desctiption: values.desctiption,
                keyTask: values.keyTask,
                timeEnd: values.timeEnd.toDate().toUTCString(),
                timeStart: values.timeStart.toDate().toUTCString()
            }

            const result = await onCreate(newDalyItem);
            
            if (result === 0) {
                notification['success']({
                    message: `${isEdit ? 'Редактирование' : 'Добавление'} записи`,
                    description: (
                        <>
                            {`${isEdit ? 'Редактирование' : 'Добавление'} записи выполнено успешно`}
                            <br/>
                            {moment(new Date()).format('DD.MM.yyyy HH:mm:ss')}
                        </>
                    )
                });
            }
            else if (result === 1) {
                notification['warning']({
                    message: 'Редактирование записи',
                    description: <>Изменений не найдено<br/>{moment(new Date()).format('DD.MM.yyyy HH:mm:ss')}</>
                });
            }
            else {
                notification['error']({
                    message: `${isEdit ? 'Редактирование' : 'Добавление'} записи`,
                    description: (
                        <>
                            Неизвестный результат выполнения
                            <br/>
                            {moment(new Date()).format('DD.MM.yyyy HH:mm:ss')}
                        </>
                    )
                });
            }
        }
        catch(e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    };

    const initValuesNozmalized = useNormalizeInitValues(
        initialValues,
        isEdit,
        form.resetFields,
        visible
    );

    return (
        <Modal
            // forceRender //Чтобы не было ошибки из-за того, что создан экземпляр формы через useForm, но не привязан к форме
            visible={visible}
            onCancel={handleCancel}
            onOk={handleOk}
            title={`${isEdit ? 'Редактировать' : 'Добавить'} запись`}
            footer={[
                <Button key='back' onClick={handleCancel}>Отмена</Button>,
                <Button key='submit' type='primary' loading={loading} onClick={handleOk}>{isEdit ? 'Редактировать' : 'Создать'}</Button>
            ]}
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={{
                    ...initValuesNozmalized,
                    timeStart: initValuesNozmalized.timeStart ? moment(initValuesNozmalized.timeStart) : null,
                    timeEnd: initValuesNozmalized.timeEnd ? moment(initValuesNozmalized.timeEnd) : null
                }}
            >
                <Form.Item
                    name='keyTask'
                    label='Номер таска'
                    rules={[{ required: true, message: REQUIRE_HINT }]}
                >
                    <Input />
                </Form.Item>
                <Row wrap={false} gutter={4}>
                    <Col span={12}>
                        <Form.Item
                            name='timeStart'
                            label='Время начала действия'
                            rules={[{ type: 'date', required: true, message: REQUIRE_HINT }]}
                        >
                            <TimePicker
                                format='HH:mm'
                                placeholder='Время'
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name='timeEnd'
                            label='Время конца действия'
                            rules={[{ type: 'date', required: true, message: REQUIRE_HINT }]}
                        >
                            <TimePicker
                                format='HH:mm'
                                placeholder='Время'
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name='desctiption'
                    label='Описание'
                    rules={[{ type: 'string', required: true, message: REQUIRE_HINT }]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
}