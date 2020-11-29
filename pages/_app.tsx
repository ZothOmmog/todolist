import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import '../styles/daly-table.css';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import { ErrorModal } from '../components/error-modal';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ConfigProvider locale={ruRU}>
                <Component {...pageProps} />
                <ErrorModal />
            </ConfigProvider>
        </Provider>
    );
}

export default MyApp;
