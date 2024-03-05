import React from 'react';
import { Footer, Header } from '../components';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;