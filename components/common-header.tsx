import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
const { Header } = Layout;

export const CommonHeader: React.FC = () => {
    const { pathname } = useRouter();
    return (
        <Header>
            <Menu theme='dark' mode='horizontal' selectedKeys={[pathname]}>
                    <Menu.Item key='/'>
                        <Link href='/'>
                            Ежедневник
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='/tasks-detail'>
                        <Link href='/tasks-detail'>
                            Детально по таскам
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='/work-time'>
                        <Link href='/work-time'>
                            Рабочее время
                        </Link>
                    </Menu.Item>
            </Menu>
        </Header>
    );
};