import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from '@/components/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.css';
import { AuthWrapper } from '@/components/context/auth.context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AuthWrapper>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </AuthWrapper>
    </React.StrictMode>,
);
