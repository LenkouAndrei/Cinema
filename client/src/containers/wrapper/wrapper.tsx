import React, { ReactChild } from 'react';
import './wrapper.scss';

interface IWrapperProps {
    children: ReactChild;
}

type TWrapper = (props: IWrapperProps) => JSX.Element;
export const Wrapper: TWrapper = ({ children }: IWrapperProps) => <div className='wrapper'>
    {children}
</div>;