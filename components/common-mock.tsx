import { Col, Row } from 'antd';
import React from 'react';

export const CommonMock: React.FC = ({ children }) => (
    <Row style={{ height: '100%' }} align='middle'>
        <Col span={24}>
            <h1 style={{ textAlign: 'center', fontSize: '50px' }}>
                {children}
            </h1>
        </Col>
    </Row>
);