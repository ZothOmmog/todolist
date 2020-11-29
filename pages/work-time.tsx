import { Layout } from 'antd';
import { CommonMock } from '../components';
import { CommonLayout } from '../layouts';
const { Content } = Layout;

export default function Home() {
    return (
        <CommonLayout>
            <Content style={{ padding: 24, margin: 0, flexGrow: 1 }}>
                <CommonMock>
                    Таблица с временем
                </CommonMock>
            </Content>
        </CommonLayout>
    );
}
