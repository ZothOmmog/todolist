import React from 'react';
import { Layout } from 'antd';
import { CommonHeader } from '../components/common-header';

export const CommonLayout: React.FC = ({ children }) => (
    <Layout style={{ height: '100vh' }}>
        <CommonHeader/>
        <Layout style={{ flexGrow: 1, margin: '24px', backgroundColor: 'white', maxWidth: 1000 }}>
            {children}
        </Layout>
    </Layout>
);