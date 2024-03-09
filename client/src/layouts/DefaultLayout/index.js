import React from 'react';
import { Footer, Header } from '../components';

const DefaultLayout = ({ children }) => {
    return (
        <div className="relative">
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
