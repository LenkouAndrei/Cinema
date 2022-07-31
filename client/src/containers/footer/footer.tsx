import React from 'react';
import { Logo } from '../../components';
import './footer.scss';

type TFooter = () => JSX.Element;

export const Footer: TFooter = () => <footer className='footer'>
    <Logo/>
</footer>;