import { Layout } from 'antd';
import { CommonMock, TasksTable } from '../components';
import { CommonLayout } from '../layouts';
const { Content } = Layout;


export default function Home() {
    return (
        <CommonLayout>
            <Content style={{
                display: 'flex', 
                flexDirection: 'column',
                padding: 24,
                margin: 0,
                flexGrow: 1
            }}>
                <TasksTable />
            </Content>
        </CommonLayout>
    );
}
