import React from 'react';
import { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import { StyledThemeProvider } from '@definitions/styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { Provider } from 'react-redux';
import store from '@redux/store';

import '@core/misc/firebaseService';
import { useUserProfileStateChanged } from '@user/user-profile';

const AppWrapper: React.FC<any> = ({ Component, pageProps }) => {
    useUserProfileStateChanged();
    return <Component {...pageProps} />;
};

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const queryClient = new QueryClient();
    return (
        <StyledThemeProvider>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Provider store={store}>
                        <AppWrapper
                            Component={Component}
                            pageProps={pageProps}
                        />
                    </Provider>
                </Hydrate>
            </QueryClientProvider>
        </StyledThemeProvider>
    );
}

export default MyApp;
