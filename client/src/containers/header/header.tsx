import React from 'react';
import { Logo } from '../../components';
import { Wrapper } from '../';
import './header.scss';
import { useNavigate } from "react-router-dom";

export interface IHeaderProps {
    children?: JSX.Element;
}

const blockName = 'header';

export function Header({ children = null }: IHeaderProps): JSX.Element {
    const navigate = useNavigate();

    const logout = () => {
        navigate("/");
        sessionStorage.removeItem('userType');
        sessionStorage.removeItem('userId');
    }

    return <header className={blockName}>
        <Wrapper>
            <>
                <section className={`${blockName}__top`}>
                    <Logo/>
                    { children }
                    <button
                        className="search__btn"
                        onClick={logout}>Logout</button>
                </section>
            </>
        </Wrapper>
    </header>;
}