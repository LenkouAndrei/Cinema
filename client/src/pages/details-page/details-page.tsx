import React, { useEffect } from 'react';
import { Footer, Header } from '../../containers';
import { DetailsContainer } from '../../components';


export const DetailsPage = () => {
    return (
        <>
            <Header />
            <DetailsContainer />
            <Footer />
        </>
    )
}